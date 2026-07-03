# 🚀 Quick Start Guide

Get DeepWork AI running in minutes!

---

## ⚡ Option 1: Docker Compose (Recommended)

**Prerequisites:** Docker & Docker Compose installed

```bash
# Clone and navigate
git clone https://github.com/MR-AMINUR/deepwork-ai.git
cd deepwork-ai

# Start everything
docker-compose up --build
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8081
- AI Service: http://localhost:8000

---

## 💻 Option 2: Manual Setup (Windows)

### Prerequisites:
- ✅ Java 21+
- ✅ Node.js 18+
- ✅ Python 3.10+
- ✅ FFmpeg
- ✅ Maven

### Quick Setup:

```bash
# Clone repository
git clone https://github.com/MR-AMINUR/deepwork-ai.git
cd deepwork-ai

# Run automated setup
setup-dev.bat

# Start all services
start-dev.bat
```

---

## 🎯 Option 3: Manual Start (Step by Step)

### Terminal 1 - AI Service:
```bash
cd ai-service
python -m venv venv
venv\Scripts\activate
pip install -r requirement.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Terminal 2 - Backend:
```bash
cd backend/deepwork-ai
mvn spring-boot:run
```

### Terminal 3 - Frontend:
```bash
cd deepwork-ui
npm install
npm run dev
```

---

## 🎬 First Use

1. Open http://localhost:5173
2. Click "Upload Meeting" or drag & drop a file
3. Enter a meeting title
4. Click "Analyze Meeting"
5. Wait 1-2 minutes for processing
6. View transcript, summary, and tasks!

---

## 🔧 Common Issues

### Backend won't start?
```bash
# Check Java version
java -version  # Should be 21+

# Clean and rebuild
cd backend/deepwork-ai
mvn clean install
```

### AI Service error?
```bash
# Check FFmpeg
ffmpeg -version

# Reinstall dependencies
cd ai-service
pip install --upgrade -r requirement.txt
```

### Frontend not loading?
```bash
# Clear cache and reinstall
cd deepwork-ui
rm -rf node_modules
npm install
```

---

## 📚 More Help

- Full documentation: See [README.md](README.md)
- API docs: http://localhost:8081/swagger-ui.html (coming soon)
- Issues: https://github.com/MR-AMINUR/deepwork-ai/issues

---

**Happy coding! 🎉**
