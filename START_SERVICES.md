# 🚀 How to Start DeepWork AI Services

## ✅ Current Status (All Running!)

- ✅ **Backend (Spring Boot)**: http://localhost:8081
- ✅ **AI Service (FastAPI)**: http://localhost:8000
- ✅ **Frontend (React)**: Already running on http://localhost:5173

---

## 📝 For Future Runs

### Option 1: Run Backend (Spring Boot)

**Open Terminal 1:**
```bash
cd d:\deepwork-ai\backend\deepwork-ai
java -jar target\deepwork-ai-0.0.1-SNAPSHOT.jar
```

### Option 2: Run AI Service (FastAPI)

**Open Terminal 2:**
```bash
cd d:\deepwork-ai\ai-service
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Run Frontend (React)

**Open Terminal 3:**
```bash
cd d:\deepwork-ai\deepwork-ui
npm run dev
```

---

## 🔍 Verify Services Are Running

### Check Backend:
```bash
curl http://localhost:8081/actuator/health
```

### Check AI Service:
```bash
curl http://localhost:8000/health
```

### Check Frontend:
Open your browser: http://localhost:5173

---

## 🐛 Troubleshooting

### Backend Not Starting?
```bash
# Rebuild the JAR
cd d:\deepwork-ai\backend\deepwork-ai
mvnw.cmd clean package -DskipTests
java -jar target\deepwork-ai-0.0.1-SNAPSHOT.jar
```

### AI Service Errors?
```bash
# Check Python packages
python -m pip install -r requirement.txt --upgrade

# Start service
cd d:\deepwork-ai\ai-service
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Frontend Connection Errors?
1. Make sure backend is running (port 8081)
2. Check `.env.development` file:
   ```
   VITE_API_BASE_URL=http://localhost:8081/api
   ```
3. Restart frontend:
   ```bash
   npm run dev
   ```

---

## ⚡ Quick Test

Once all services are running, you can test the full flow:

1. Open http://localhost:5173
2. Upload a small audio/video file
3. Enter a meeting title
4. Click "Analyze Meeting"
5. Wait for processing
6. View transcript, summary, and tasks!

---

## 🛑 Stop Services

Press `Ctrl+C` in each terminal window where the services are running.

---

**Note:** The Maven wrapper (`mvnw.cmd`) has some issues with PowerShell 7. Use the pre-built JAR instead with the command above.
