# Quick Setup Guide

This guide will help you get the FitAI application running in under 10 minutes.

## Prerequisites Checklist

- [ ] Python 3.9+ installed
- [ ] Node.js 18+ installed
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## Step-by-Step Setup

### 1. MongoDB Setup (Choose one)

**Option A: Local MongoDB**
```bash
# Install MongoDB from https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/atlas
2. Create free cluster
3. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### 2. Backend Setup (5 minutes)

```bash
# Navigate to server directory
cd server

# Create virtual environment
python -m venv venv

# Activate it
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies (this may take 2-3 minutes)
pip install -r requirements.txt

# Create .env file
# Copy server.env.example to .env and fill in your values
```

**Edit server/.env:**
```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=fitness_ai
SECRET_KEY=my-super-secret-jwt-key-12345
GEMINI_API_KEY=your-actual-gemini-api-key
```

**Start the backend:**
```bash
python main.py
```

You should see: `Connected to MongoDB successfully`
API is now running at: http://localhost:8000

### 3. Frontend Setup (3 minutes)

Open a NEW terminal window:

```bash
# Navigate to client directory
cd client

# Install dependencies (this may take 2-3 minutes)
npm install

# (Optional) Create .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start the dev server
npm run dev
```

App is now running at: http://localhost:5173

### 4. Test the Application

1. Open browser to http://localhost:5173
2. Click "Sign up" and create an account
3. Login with your credentials
4. Upload a photo and fill in your details
5. Click "Generate Personalized Plan"
6. View your plan in the "My Plans" section
7. Try chatting with the AI in the "Chat" section

## Troubleshooting

### Backend won't start

**Error: "Could not connect to MongoDB"**
- Make sure MongoDB is running (`mongod` command)
- Check your MONGODB_URL in .env
- For Atlas, check your IP whitelist

**Error: "Module not found"**
- Make sure virtual environment is activated
- Run `pip install -r requirements.txt` again

### Frontend won't start

**Error: "Cannot find module"**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Error: "Port 5173 is already in use"**
- Kill the process using that port
- Or change port in vite.config.js

### Model Download Issues

The Hugging Face model (~85MB) downloads on first image classification.
- Ensure stable internet connection
- Wait 1-2 minutes on first classification
- Model is cached after first download

### API Key Issues

**Gemini API not working**
- Verify your API key at https://makersuite.google.com/app/apikey
- Make sure there are no spaces in the .env file
- Check API quotas/limits

## Default Credentials

There are no default credentials. You must:
1. Sign up with a new account
2. Use any valid email format (e.g., test@example.com)
3. Password must be at least 6 characters

## Verify Installation

### Backend Health Check
Visit: http://localhost:8000/health
Should return: `{"status": "healthy"}`

### API Documentation
Visit: http://localhost:8000/docs
Should show interactive Swagger UI

### Frontend
Visit: http://localhost:5173
Should show login page

## Production Deployment

### Backend
```bash
pip install gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend
```bash
npm run build
# Serve the dist/ folder with nginx, netlify, vercel, etc.
```

## Next Steps

- Read the main [README.md](README.md) for full documentation
- Check out [server/README.md](server/README.md) for backend details
- Check out [client/README.md](client/README.md) for frontend details

## Need Help?

- Check the troubleshooting section above
- Review the error logs in terminal
- Open an issue on GitHub

---

Happy coding! 💪

