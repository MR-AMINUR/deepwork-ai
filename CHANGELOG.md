# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-03-07

### Added
- Initial project structure with microservices architecture
- React frontend with Tailwind CSS
- Spring Boot backend with REST APIs
- FastAPI AI service with Whisper and BART models
- Audio/video file upload and processing
- Meeting transcription feature
- AI-powered summarization
- Automatic task extraction
- Meeting history tracking
- Docker support with docker-compose
- Environment configuration files (.env)
- Global exception handling
- CORS configuration
- Health check endpoints
- Comprehensive README documentation
- Setup scripts for Windows
- Contributing guidelines

### Changed
- Improved error handling across all services
- Centralized API configuration in frontend
- Refactored AI service with better logging
- Enhanced security configuration
- Updated gitignore for better file management

### Fixed
- Removed unused User entity and repository
- Fixed task creation bug in MeetingController
- Cleaned up unused code and commented sections
- Fixed CORS issues in development and production
- Improved file cleanup in AI service
- Better exception messages throughout the application

### Security
- Moved database credentials to environment variables
- Added validation for file uploads
- Implemented proper error responses without exposing internals
- Added CORS restrictions

## [0.1.0] - Initial Development

### Added
- Basic project setup
- Core features implementation
- Initial UI design
- Database schema design
