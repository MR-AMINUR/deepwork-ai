import os
from pathlib import Path
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import whisper
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import subprocess

# =========================
# SETUP
# =========================
MODELS_DIR = Path(__file__).parent / "models"
MODELS_DIR.mkdir(exist_ok=True)

os.environ['TRANSFORMERS_CACHE'] = str(MODELS_DIR / "transformers")
os.environ['HF_HOME'] = str(MODELS_DIR / "huggingface")
os.environ['WHISPER_CACHE'] = str(MODELS_DIR / "whisper")

app = FastAPI()

print(f"📁 Models will be cached at: {MODELS_DIR}")

# =========================
# LOAD MODELS
# =========================
print("🔄 Loading Whisper model...")
whisper_model = whisper.load_model("base")  # ⚠ keep base for speed
print("✅ Whisper loaded")

print("🔄 Loading Summarization model...")
tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")
print("✅ Summarization model loaded")

# =========================
# UTIL FUNCTIONS
# =========================
def summarize_text(text, max_length=130, min_length=30):
    try:
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
        print("Summarization error:", e)
        return ""


def extract_tasks(text):
    sentences = text.split(".")
    tasks = []
    for s in sentences:
        if any(w in s.lower() for w in ["should", "need", "must", "task", "todo"]):
            tasks.append(s.strip())
    return tasks[:5]


def extract_insights(summary):
    if not summary:
        return []
    return [s.strip() for s in summary.split(".") if s.strip()][:3]


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
    except subprocess.CalledProcessError as e:
        print("❌ FFmpeg Error:", e.stderr)
        raise e


# =========================
# FULL ANALYSIS
# =========================
@app.post("/analyze")
async def analyze(file: UploadFile = File(...)):
    temp_dir = Path(__file__).parent / "temp"
    temp_dir.mkdir(exist_ok=True)

    file_path = temp_dir / f"temp_{file.filename}"
    audio_path = temp_dir / f"{file_path.stem}_processed.wav"

    MAX_SIZE = 300 * 1024 * 1024  # 300MB

    try:
        print("📥 File received")

        # ✅ SAFE CHUNK WRITE + SIZE LIMIT
        file_size = 0
        with open(file_path, "wb") as f:
            while True:
                chunk = await file.read(1024 * 1024)  # 1MB chunks
                if not chunk:
                    break
                file_size += len(chunk)
                if file_size > MAX_SIZE:
                    return JSONResponse(
                        status_code=400,
                        content={"error": "File too large (Max 300MB)"}
                    )
                f.write(chunk)

        print("🎬 Converting to audio...")
        convert_to_wav(file_path, audio_path)

        print("🧠 Transcribing...")
        result = whisper_model.transcribe(str(audio_path))
        transcript = result["text"]

        print("📝 Summarizing...")
        summary = summarize_text(transcript[:1000]) if transcript.strip() else ""

        print("📌 Extracting tasks...")
        tasks = extract_tasks(transcript)
        insights = extract_insights(summary)

        print("✅ Done")

        return JSONResponse(content={
            "transcript": transcript,
            "summary": summary,
            "tasks": tasks,
            "insights": insights
        })

    except Exception as e:
        print("❌ Error:", e)
        return JSONResponse(status_code=500, content={"error": str(e)})

    finally:
        if file_path.exists():
            file_path.unlink()
        if audio_path.exists():
            audio_path.unlink()


# =========================
# HEALTH CHECK
# =========================
@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.get("/")
async def root():
    return {"message": "AI service running"}