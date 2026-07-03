# 🚀 DeepWork AI — Meeting Productivity Copilot

***Aminur Rahaman Mallick***

---

## 📌 Overview

DeepWork AI is an AI-powered productivity system designed to automate meeting analysis. It processes audio/video recordings to generate:

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
* React.js 19
* Tailwind CSS
* Vite
* Axios

### 🟢 Backend
* Spring Boot 3.2.5 (Java 21)
* Spring Data JPA
* PostgreSQL / H2 (development)
* REST APIs

### 🟣 AI Service
* FastAPI (Python)
* Whisper (Speech-to-Text)
* HuggingFace Transformers (BART)
* FFmpeg

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

### Prerequisites

* **Java 21** or higher
* **Node.js 18** or higher
* **Python 3.10** or higher
* **FFmpeg** installed
* **Maven** (for backend)
* **PostgreSQL** (optional, H2 used by default in dev)

---

### 🐳 Quick Start with Docker Compose (Recommended)

```bash
# Clone repository
git clone https://github.com/MR-AMINUR/deepwork-ai.git
cd deepwork-ai

# Start all services
docker-compose up --build
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8081
- AI Service: http://localhost:8000

---

### 🔧 Manual Setup

#### 1️⃣ Setup AI Service

```bash
cd ai-service

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirement.txt

# Run the service
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**AI Service will be available at:** http://localhost:8000

---

#### 2️⃣ Setup Backend (Spring Boot)

```bash
cd backend/deepwork-ai

# Copy environment example
cp .env.example .env

# Edit .env with your configuration (if needed)

# Build and run
mvn clean install
mvn spring-boot:run
```

**Backend will be available at:** http://localhost:8081

**Default profile:** `dev` (uses H2 in-memory database)

To use PostgreSQL, update `application.properties`:
```properties
spring.profiles.active=prod
```

---

#### 3️⃣ Setup Frontend

```bash
cd deepwork-ui

# Install dependencies
npm install

# Copy environment file
cp .env.example .env.development

# Run development server
npm run dev
```

**Frontend will be available at:** http://localhost:5173

---

## 📁 Project Structure

```
deepwork-ai/
├── ai-service/              # Python FastAPI service
│   ├── main.py              # AI processing logic
│   ├── requirement.txt      # Python dependencies
│   ├── Dockerfile           # Docker configuration
│   ├── models/              # Cached AI models
│   └── temp/                # Temporary file storage
│
├── backend/deepwork-ai/     # Spring Boot backend
│   ├── src/main/java/       # Java source code
│   │   └── com/deepwork/ai/
│   │       ├── controller/  # REST controllers
│   │       ├── service/     # Business logic
│   │       ├── entity/      # JPA entities
│   │       ├── repository/  # Data repositories
│   │       └── exception/   # Exception handling
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   ├── application-dev.properties
│   │   └── application-prod.properties
│   ├── pom.xml              # Maven dependencies
│   └── Dockerfile           # Docker configuration
│
├── deepwork-ui/             # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   ├── config/          # API configuration
│   │   └── App.jsx          # Main app component
│   ├── package.json         # NPM dependencies
│   ├── .env.development     # Dev environment
│   └── .env.production      # Prod environment
│
├── docker-compose.yml       # Docker Compose configuration
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🔧 Configuration

### Environment Variables

#### Backend (.env or environment variables)
```properties
DATABASE_URL=jdbc:postgresql://localhost:5432/deepwork_ai
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your_password
AI_SERVICE_URL=http://localhost:8000/analyze
ALLOWED_ORIGINS=http://localhost:5173
PORT=8081
```

#### Frontend (.env.development)
```properties
VITE_API_BASE_URL=http://localhost:8081/api
```

---

## 🧪 API Endpoints

### Meetings
- `GET /api/meetings` - Get all meetings
- `GET /api/meetings/{id}` - Get meeting by ID
- `POST /api/meetings/upload` - Upload and analyze meeting file
- `POST /api/meetings` - Create meeting manually
- `DELETE /api/meetings/{id}` - Delete meeting

### Tasks
- `GET /api/tasks` - Get all tasks

### Summaries
- `GET /api/summaries/{id}` - Get summary by ID

### AI Service
- `POST /analyze` - Analyze audio/video file
- `GET /health` - Health check
- `GET /` - Service info

---

## 🎯 Usage

1. **Open the application** at http://localhost:5173
2. **Click "Upload Meeting"** or drag & drop a file
3. **Enter meeting title**
4. **Wait for processing** (may take 1-2 minutes for large files)
5. **View results:**
   - Transcript in left panel
   - AI Summary in middle panel
   - Action Items in right panel
6. **Access past meetings** from "Recent Meetings" section

---

## ⚠️ Limitations

* Large video files (>300MB) are not supported
* AI models require significant memory (2-4GB RAM)
* Processing time depends on file size (1-5 minutes)
* Best results with clear audio quality

---

## 🔮 Future Enhancements

* 🔐 User authentication & authorization
* ☁️ Cloud storage integration (S3, Azure Blob)
* 🎥 Real-time meeting recording
* 👥 Team collaboration features
* 📊 Advanced analytics dashboard
* 🌍 Multi-language support
* 📱 Mobile app
* 🔔 Task notifications & reminders

---

## 🧠 Technologies Learned

This project demonstrates:

* Microservices architecture
* AI/ML integration in web applications
* RESTful API design
* File upload handling
* Real-world system design
* Frontend-Backend communication
* Docker containerization
* Database design with JPA

---

## 📦 Deployment

### Frontend Deployment (Vercel)
```bash
cd deepwork-ui
npm run build
# Deploy dist/ folder to Vercel
```

### Backend Deployment (Render/Railway)
- Set environment variables in platform
- Deploy from GitHub
- Use Dockerfile for deployment

### AI Service Deployment (HuggingFace Spaces)
- Upload to HuggingFace Spaces
- Configure as Docker Space
- Set appropriate hardware (GPU recommended)

---

## 🐛 Troubleshooting

### AI Service Not Starting
- Ensure FFmpeg is installed: `ffmpeg -version`
- Check Python version: `python --version` (should be 3.10+)
- Install dependencies: `pip install -r requirement.txt`

### Backend Connection Error
- Verify database connection
- Check if PORT 8081 is available
- Review application logs

### Frontend API Errors
- Verify `VITE_API_BASE_URL` in `.env.development`
- Check if backend is running
- Check browser console for CORS errors

---

## 📄 License

This project is developed for **academic and educational purposes**.

---

## 🙌 Acknowledgement

Special thanks to our professors and mentors for guidance and support.

---

## 👨‍💻 Author

**Aminur Rahaman Mallick**

---

**⭐ If you find this project useful, please give it a star!**