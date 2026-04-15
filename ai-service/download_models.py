import os
from pathlib import Path
import whisper
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Set cache to project directory
MODELS_DIR = Path(__file__).parent / "models"
MODELS_DIR.mkdir(exist_ok=True)

os.environ['TRANSFORMERS_CACHE'] = str(MODELS_DIR / "transformers")
os.environ['HF_HOME'] = str(MODELS_DIR / "huggingface")
os.environ['WHISPER_CACHE'] = str(MODELS_DIR / "whisper")

print(f"📁 Downloading models to: {MODELS_DIR}")

# Download Whisper model
print("🔄 Downloading Whisper base model...")
whisper_model = whisper.load_model("base")
print("✅ Whisper model downloaded")

# Download Summarization model using direct approach
print("🔄 Downloading summarization model...")

# Using direct model loading (works with all versions)
tokenizer = AutoTokenizer.from_pretrained("sshleifer/distilbart-cnn-12-6")
model = AutoModelForSeq2SeqLM.from_pretrained("sshleifer/distilbart-cnn-12-6")

# Test the model
inputs = tokenizer("This is a test sentence for summarization.", return_tensors="pt", max_length=512, truncation=True)
summary_ids = model.generate(
    inputs["input_ids"],
    max_length=50,
    min_length=10,
    do_sample=False,
    num_beams=4
)
test_summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
print(f"✅ Summarization model downloaded and tested: {test_summary}")

print(f"\n🎉 All models downloaded successfully!")
print(f"📁 Models are cached at: {MODELS_DIR}")