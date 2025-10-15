# 💪 FitAI - Personal Trainer Bot

A full-stack AI-powered fitness and nutrition planning application that generates personalized workout and diet plans based on user data and body image classification.

## 🌟 Features

- **JWT Authentication** - Secure user registration and login
- **Body Type Classification** - Uses Hugging Face's ResNet model to classify body types (Skinny, Ordinary, Overweight, Very Muscular)
- **AI-Powered Plan Generation** - Leverages Google Gemini API to create personalized fitness and nutrition plans
- **Chat Interface** - Interactive chatbot for follow-up questions and guidance
- **Plan Management** - Save, view, and manage multiple fitness plans
- **Modern UI** - Beautiful, responsive design built with React and TailwindCSS

## 🏗️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client

### Backend
- **FastAPI** - Python web framework
- **MongoDB** - NoSQL database
- **PyTorch** - Deep learning framework
- **Transformers** - Hugging Face model library
- **Google Gemini API** - AI text generation
- **JWT** - Authentication

## 📁 Project Structure

```
Fit_AI/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # FastAPI backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/   # API endpoints
│   │   ├── core/         # Config & security
│   │   ├── db/           # Database connection
│   │   ├── models/       # Data models
│   │   └── services/     # Business logic
│   ├── main.py           # FastAPI app
│   └── requirements.txt
│
├── app.py                # Original Streamlit app (reference)
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.9+**
- **Node.js 18+**
- **MongoDB** (local or Atlas)
- **Google Gemini API Key**

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Fit_AI
```

### 2. Backend Setup

```bash
cd server

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Copy the example below and fill in your values
```

**server/.env**
```env
MONGODB_URL=mongodb://localhost:27017
MONGODB_DB_NAME=fitness_ai
SECRET_KEY=your-super-secret-jwt-key-change-this
GEMINI_API_KEY=your-google-gemini-api-key
```

**Start the backend server:**
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Create .env file (optional)
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### 4. MongoDB Setup

**Option 1: Local MongoDB**
```bash
# Install MongoDB and start the service
mongod
```

**Option 2: MongoDB Atlas**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `MONGODB_URL` in server/.env

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update user profile

### AI
- `POST /api/ai/classify-image` - Classify body type from image
- `POST /api/ai/generate-plan` - Generate personalized fitness plan
- `POST /api/ai/chat` - Chat with AI assistant

### Plans
- `GET /api/plans/` - Get all user plans
- `POST /api/plans/` - Create new plan
- `GET /api/plans/{id}` - Get specific plan
- `DELETE /api/plans/{id}` - Delete plan

## 🎨 Features Walkthrough

### 1. Sign Up / Login
Create an account or login with existing credentials.

### 2. Dashboard
- Upload a photo for body type classification
- Enter your personal details (age, weight, height, etc.)
- Select your fitness goal
- Generate a personalized 6-week plan

### 3. My Plans
- View all your saved fitness plans
- See detailed workout and nutrition information
- Delete old plans

### 4. Chat
- Ask questions about fitness and nutrition
- Get personalized advice based on your plans
- Interactive AI assistant powered by Gemini

## 🔧 Configuration

### Environment Variables

**Backend (server/.env)**
- `MONGODB_URL` - MongoDB connection string
- `MONGODB_DB_NAME` - Database name
- `SECRET_KEY` - JWT secret key (use a strong random string)
- `GEMINI_API_KEY` - Google Gemini API key

**Frontend (client/.env)**
- `VITE_API_URL` - Backend API URL (default: http://localhost:8000/api)

## 📦 Build for Production

### Backend
```bash
cd server
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend
```bash
cd client
npm run build
# Serve the dist/ folder with your preferred web server
```

## 🧪 Development

### Running Tests
```bash
# Backend
cd server
pytest

# Frontend
cd client
npm test
```

### Code Quality
```bash
# Backend linting
cd server
flake8 app/

# Frontend linting
cd client
npm run lint
```

## 🐛 Troubleshooting

### Model Download Issues
The Hugging Face model (~85MB) downloads on first run. Ensure you have:
- Stable internet connection
- Sufficient disk space
- No firewall blocking huggingface.co

### MongoDB Connection Issues
- Verify MongoDB is running: `mongosh`
- Check connection string format
- For Atlas, whitelist your IP address

### CORS Issues
The backend allows `localhost:3000` and `localhost:5173` by default.
Update `ALLOWED_ORIGINS` in `server/app/core/config.py` if needed.

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Hugging Face** - Body classification model (glazzova/body_complexion)
- **Google Gemini** - AI text generation
- **FastAPI** - Modern Python web framework
- **React** - UI library

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using React, FastAPI, and AI

