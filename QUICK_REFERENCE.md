# Quick Reference Card

## 🚀 Quick Commands

### Start Development

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd server
venv\Scripts\activate      # Windows
source venv/bin/activate   # Mac/Linux
python main.py

# Terminal 3: Start Frontend
cd client
npm run dev
```

### With Docker

```bash
docker-compose up -d       # Start all services
docker-compose logs -f     # View logs
docker-compose down        # Stop all services
```

## 🔗 Important URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main app |
| Backend API | http://localhost:8000 | API server |
| API Docs | http://localhost:8000/docs | Swagger UI |
| MongoDB | localhost:27017 | Database |

## 📂 Key Files to Configure

### Backend Environment
**File**: `server/.env`
```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=fitness_ai
SECRET_KEY=your-secret-key-here
GEMINI_API_KEY=your-gemini-key-here
```

### Frontend Environment (Optional)
**File**: `client/.env`
```env
VITE_API_URL=http://localhost:8000/api
```

## 📋 Project Checklist

Before first run:
- [ ] MongoDB installed and running
- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] Google Gemini API key obtained
- [ ] Backend .env file created
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed

## 🔑 API Endpoints Quick Reference

### Authentication
```
POST /api/auth/signup      # Register new user
POST /api/auth/login       # Login user
```

### Users
```
GET  /api/users/me         # Get user profile
PUT  /api/users/me         # Update profile
```

### AI
```
POST /api/ai/classify-image    # Classify body type
POST /api/ai/generate-plan     # Generate fitness plan
POST /api/ai/chat              # Chat with AI
```

### Plans
```
GET    /api/plans/         # Get all plans
POST   /api/plans/         # Create plan
GET    /api/plans/{id}     # Get specific plan
DELETE /api/plans/{id}     # Delete plan
```

## 🐛 Common Issues & Fixes

### Backend won't start
```bash
# Activate virtual environment
cd server
venv\Scripts\activate

# Reinstall dependencies
pip install -r requirements.txt
```

### Frontend won't start
```bash
# Clear and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### MongoDB connection error
```bash
# Check if MongoDB is running
mongosh

# Or start MongoDB service
mongod
```

### Model download stuck
- Wait 2-3 minutes on first run
- Check internet connection
- Model size: ~85MB

## 📦 Package Management

### Backend
```bash
# Install package
pip install package-name

# Update requirements
pip freeze > requirements.txt
```

### Frontend
```bash
# Install package
npm install package-name

# Update package
npm update package-name
```

## 🧪 Testing

### Backend
```bash
cd server
pytest                     # Run all tests
pytest -v                  # Verbose output
```

### Frontend
```bash
cd client
npm test                   # Run tests
npm run lint              # Check code quality
```

## 🏗️ Build for Production

### Backend
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Frontend
```bash
cd client
npm run build              # Creates dist/ folder
npm run preview            # Preview build
```

## 📊 File Sizes

| Component | Size |
|-----------|------|
| Backend dependencies | ~2GB |
| Frontend dependencies | ~300MB |
| ML Model (cached) | ~85MB |
| Database (empty) | ~10MB |

## 🔐 Security Notes

- Change `SECRET_KEY` in production
- Never commit `.env` files
- Use strong passwords (6+ chars)
- Keep API keys secure

## 📱 Features Overview

✅ User authentication with JWT  
✅ Body type classification (4 types)  
✅ AI-powered plan generation  
✅ Multiple plan storage  
✅ Interactive chatbot  
✅ Responsive design  
✅ MongoDB persistence  

## 🆘 Get Help

1. Check **SETUP.md** for detailed setup
2. Read **README.md** for full documentation
3. Visit **/docs** for API documentation
4. Check terminal logs for errors

## 📞 Support Resources

- FastAPI Docs: https://fastapi.tiangolo.com
- React Docs: https://react.dev
- MongoDB Docs: https://docs.mongodb.com
- Gemini API: https://ai.google.dev

---

**Pro Tip**: Bookmark this file for quick reference! 🔖

