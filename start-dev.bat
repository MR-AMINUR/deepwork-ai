@echo off
echo ========================================
echo Starting DeepWork AI (Development Mode)
echo ========================================
echo.

REM Start AI Service
echo Starting AI Service...
start cmd /k "cd ai-service && venv\Scripts\activate && uvicorn main:app --reload --host 0.0.0.0 --port 8000"
timeout /t 5 /nobreak >nul

REM Start Backend
echo Starting Backend...
start cmd /k "cd backend\deepwork-ai && mvn spring-boot:run"
timeout /t 10 /nobreak >nul

REM Start Frontend
echo Starting Frontend...
start cmd /k "cd deepwork-ui && npm run dev"

echo.
echo ========================================
echo All services are starting...
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8081
echo AI Service: http://localhost:8000
echo.
echo Press any key to stop all services...
pause >nul

echo Stopping services...
taskkill /FI "WindowTitle eq *ai-service*" /F >nul 2>&1
taskkill /FI "WindowTitle eq *deepwork-ai*" /F >nul 2>&1
taskkill /FI "WindowTitle eq *deepwork-ui*" /F >nul 2>&1
echo Services stopped.
