# Contributing to DeepWork AI

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Development Setup

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/YOUR-USERNAME/deepwork-ai.git
   cd deepwork-ai
   ```
3. **Run setup script:**
   ```bash
   # On Windows
   setup-dev.bat
   
   # On Mac/Linux
   chmod +x setup-dev.sh
   ./setup-dev.sh
   ```

## Code Style

### Java (Backend)
- Follow Java naming conventions
- Use meaningful variable names
- Add comments for complex logic
- Keep methods focused and small
- Use Lombok annotations where appropriate

### JavaScript/React (Frontend)
- Use functional components with hooks
- Follow ESLint rules
- Use meaningful component names
- Keep components small and focused
- Add PropTypes or TypeScript for type safety

### Python (AI Service)
- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings for functions
- Keep functions focused

## Commit Messages

Follow conventional commit format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Example:
```
feat: add file type validation to upload endpoint
fix: resolve CORS issue in production
docs: update README with Docker instructions
```

## Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring

## Pull Request Process

1. Create a new branch from `main`
2. Make your changes
3. Test your changes thoroughly
4. Update documentation if needed
5. Submit a pull request with clear description
6. Wait for review and address feedback

## Testing

Before submitting a PR:
- Test all affected features
- Ensure no console errors
- Verify API endpoints work correctly
- Test with different file sizes and types

## Questions?

Feel free to open an issue for any questions or concerns.

Thank you for contributing! 🎉
