# 🚀 DeepWork AI — Meeting Productivity Copilot


***Aminur Rahaman Mallick***

---

## 📌 Overview

DeepWork AI is an AI-powered productivity system designed to automate meeting analysis.
It processes audio/video recordings to generate:

* 🧠 Accurate transcripts
* ✨ Concise summaries
* ✅ Actionable tasks

This project demonstrates a **distributed architecture combining frontend, backend, and AI microservices**.

---

## ✨ Features

* 🎙️ Upload **audio & video files**
* 🧠 AI-based transcription using Whisper
* ✨ Automatic summarization using BART
* ✅ Smart task extraction from conversations
* 📊 Interactive dashboard UI
* 📁 Meeting history tracking

---

## 🛠 Tech Stack

### 🔵 Frontend

* React.js
* Tailwind CSS

### 🟢 Backend

* Spring Boot (Java)
* REST APIs

### 🟣 AI Service

* FastAPI (Python)
* Whisper (Speech-to-Text)
* HuggingFace Transformers (BART)

---

## 🧩 System Architecture

```text
Frontend (React)
        ↓
Spring Boot Backend (Java)
        ↓
FastAPI AI Service (Python)
        ↓
AI Processing (Whisper + BART)
        ↓
Response → UI Dashboard
```

---

## ⚙️ Workflow

1. User uploads audio/video file
2. Backend stores and forwards file
3. AI service:

    * Converts video → audio (FFmpeg)
    * Generates transcript (Whisper)
    * Summarizes text (BART)
    * Extracts tasks
4. Results are displayed in dashboard

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

```bash
git clone https://github.com/MR-AMINUR/deepwork-ai.git
cd deepwork-ai
```

---

### 2️⃣ Run AI Service

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3️⃣ Run Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

---

### 4️⃣ Run Frontend

```bash
cd deepwork-ui
npm install
npm run dev
```

---

## 📸 Screenshots

> Add your UI screenshots here
> (Dashboard, Upload, Summary, Tasks)

---

## ⚠️ Limitations

* Large video files may take time to process
* AI models are resource-intensive
* Requires local AI service for full functionality

---

## 🔮 Future Enhancements

* 🔐 User authentication system
* ☁️ Full cloud deployment
* 🎥 Real-time meeting recording
* 👥 Team collaboration features
* 📊 Advanced analytics dashboard

---

## 📦 Deployment Notes

* Frontend can be deployed on Vercel
* Backend on Render / Railway
* AI service may require high-resource environment

---

## 🧠 Key Learning

This project demonstrates:

* Microservices architecture
* AI + Web integration
* Real-world system design
* Handling large file processing

---

## 📄 License

This project is developed for **academic and educational purposes**.

---

## 🙌 Acknowledgement

Special thanks to our professors and mentors for guidance and support.
