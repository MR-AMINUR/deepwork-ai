@echo off
echo ========================================
echo DeepWork AI - Development Setup
echo ========================================
echo.

REM Check Java
echo Checking Java installation...
java -version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Java is not installed. Please install Java 21 or higher.
    pause
    exit /b 1
)
echo [OK] Java is installed

REM Check Node.js
echo Checking Node.js installation...
node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python is not installed. Please install Python 3.10 or higher.
    pause
    exit /b 1
)
echo [OK] Python is installed

REM Check FFmpeg
echo Checking FFmpeg installation...
ffmpeg -version >nul 2>&1
if errorlevel 1 (
    echo [WARNING] FFmpeg is not installed. AI service will not work properly.
    echo Please install FFmpeg from: https://ffmpeg.org/download.html
    pause
)
echo [OK] FFmpeg is installed

echo.
echo ========================================
echo Setting up Frontend...
echo ========================================
cd deepwork-ui
if not exist .env.development (
    copy .env.example .env.development
    echo [OK] Created .env.development
)
call npm install
echo [OK] Frontend setup complete

echo.
echo ========================================
echo Setting up AI Service...
echo ========================================
cd ..\ai-service
if not exist venv (
    python -m venv venv
    echo [OK] Created virtual environment
)
call venv\Scripts\activate
pip install -r requirement.txt
echo [OK] AI Service setup complete

echo.
echo ========================================
echo Setting up Backend...
echo ========================================
cd ..\backend\deepwork-ai
if not exist .env (
    copy .env.example .env
    echo [OK] Created .env file
)
call mvn clean install -DskipTests
echo [OK] Backend setup complete

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo 1. Start AI Service: cd ai-service ^&^& venv\Scripts\activate ^&^& uvicorn main:app --reload
echo 2. Start Backend: cd backend\deepwork-ai ^&^& mvn spring-boot:run
echo 3. Start Frontend: cd deepwork-ui ^&^& npm run dev
echo.
echo Or use Docker Compose: docker-compose up --build
echo.
pause
