import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import whisper
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import subprocess
import logging

# =========================
# LOGGING SETUP
# =========================
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# =========================
# SETUP
# =========================
MODELS_DIR = Path(__file__).parent / "models"
MODELS_DIR.mkdir(exist_ok=True)

os.environ['TRANSFORMERS_CACHE'] = str(MODELS_DIR / "transformers")
os.environ['HF_HOME'] = str(MODELS_DIR / "huggingface")
os.environ['WHISPER_CACHE'] = str(MODELS_DIR / "whisper")

app = FastAPI(title="DeepWork AI Service", version="1.0.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure this properly in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info(f"📁 Models will be cached at: {MODELS_DIR}")

# =========================
# LOAD MODELS
# =========================
try:
    logger.info("🔄 Loading Whisper model...")
    whisper_model = whisper.load_model("base")
    logger.info("✅ Whisper loaded")
    
    logger.info("🔄 Loading Summarization model...")
    tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
    model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
    logger.info("✅ Summarization model loaded")
except Exception as e:
    logger.error(f"❌ Error loading models: {e}")
    raise

# =========================
# UTIL FUNCTIONS
# =========================
def summarize_text(text, max_length=130, min_length=30):
    """Summarize text using BART model"""
    try:
        if not text or len(text.strip()) < 50:
            return "Text too short to summarize."
        
        inputs = tokenizer(text, return_tensors="pt", max_length=1024, truncation=True)
        summary_ids = model.generate(
            inputs["input_ids"],
            max_length=max_length,
            min_length=min_length,
            num_beams=4,
            early_stopping=True
        )
        return tokenizer.decode(summary_ids[0], skip_special_tokens=True)
    except Exception as e:
        logger.error(f"Summarization error: {e}")
        return "Error generating summary."


def extract_tasks(text):
    """Extract actionable tasks from text"""
    if not text:
        return []
    
    sentences = text.split(".")
    tasks = []
    task_keywords = ["should", "need", "must", "task", "todo", "will", "action", "required"]
    
    for s in sentences:
        if any(word in s.lower() for word in task_keywords):
            clean_task = s.strip()
            if len(clean_task) > 10:  # Filter out too short tasks
                tasks.append(clean_task)
    
    return tasks[:5]  # Limit to 5 tasks


def extract_insights(summary):
    """Extract key insights from summary"""
    if not summary:
        return []
    
    insights = [s.strip() for s in summary.split(".") if s.strip()]
    return insights[:3]  # Return top 3 insights


def convert_to_wav(input_path, output_path):
    """Convert any audio/video to 16kHz mono wav"""
    try:
        subprocess.run([
            "ffmpeg",
            "-y",
            "-i", str(input_path),
            "-ar", "16000",
            "-ac", "1",
            "-f", "wav",
            str(output_path)
        ], check=True, capture_output=True, text=True)
        logger.info(f"✅ Audio converted successfully")
    except subprocess.CalledProcessError as e:
        logger.error(f"❌ FFmpeg Error: {e.stderr}")
        raise HTTPException(status_code=500, detail="Audio conversion failed")
    except FileNotFoundError:
        logger.error("❌ FFmpeg not found. Please install ffmpeg.")
        raise HTTPException(status_code=500, detail="FFmpeg not installed")


# =========================
# FULL ANALYSIS
# =========================
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    """Analyze audio/video file - transcribe, summarize, extract tasks"""
    temp_dir = Path(__file__).parent / "temp"
    temp_dir.mkdir(exist_ok=True)

    file_path = temp_dir / f"temp_{file.filename}"
    audio_path = temp_dir / f"{file_path.stem}_processed.wav"

    MAX_SIZE = 300 * 1024 * 1024  # 300MB

    try:
        logger.info(f"📥 File received: {file.filename}")

        # Validate file type
        allowed_types = ["audio/", "video/"]
        if not any(file.content_type.startswith(t) for t in allowed_types):
            raise HTTPException(status_code=400, detail="Invalid file type. Only audio/video files allowed.")

        # Safe chunk write with size limit
        file_size = 0
        with open(file_path, "wb") as f:
            while True:
                chunk = await file.read(1024 * 1024)  # 1MB chunks
                if not chunk:
                    break
                file_size += len(chunk)
                if file_size > MAX_SIZE:
                    file_path.unlink(missing_ok=True)
                    raise HTTPException(status_code=400, detail="File too large (Max 300MB)")
                f.write(chunk)

        logger.info(f"📦 File size: {file_size / (1024 * 1024):.2f} MB")
        
        # Convert to audio
        logger.info("🎬 Converting to audio...")
        convert_to_wav(file_path, audio_path)

        # Transcribe
        logger.info("🧠 Transcribing...")
        result = whisper_model.transcribe(str(audio_path))
        transcript = result["text"]

        if not transcript or len(transcript.strip()) < 10:
            raise HTTPException(status_code=400, detail="Transcription failed or audio is too short")

        # Summarize (use more text for better summary)
        logger.info("📝 Summarizing...")
        summary = summarize_text(transcript[:2000]) if transcript.strip() else ""

        # Extract tasks and insights
        logger.info("📌 Extracting tasks...")
        tasks = extract_tasks(transcript)
        insights = extract_insights(summary)

        logger.info("✅ Processing complete")

        return JSONResponse(content={
            "transcript": transcript,
            "summary": summary,
            "tasks": tasks,
            "insights": insights
        })

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"❌ Unexpected error: {e}")
        raise HTTPException(status_code=500, detail=f"Processing error: {str(e)}")

    finally:
        # Cleanup
        if file_path.exists():
            file_path.unlink(missing_ok=True)
        if audio_path.exists():
            audio_path.unlink(missing_ok=True)


# =========================
# HEALTH CHECK
# =========================
@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "whisper_loaded": whisper_model is not None,
        "bart_loaded": model is not None
    }


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "DeepWork AI Service",
        "version": "1.0.0",
        "status": "running"
    }