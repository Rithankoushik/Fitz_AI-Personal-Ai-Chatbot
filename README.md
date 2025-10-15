# FitAI Frontend (React + Vite)

Modern, responsive frontend for the Personal Trainer Bot application.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment (optional):**

Create a `.env` file in the client directory:
```env
VITE_API_URL=http://localhost:8000/api
```

3. **Run development server:**
```bash
npm run dev

```
#output
The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

Preview production build:
```bash
npm run preview
```

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   └── Layout.jsx       # Main layout with navigation
│   ├── pages/
│   │   ├── Login.jsx        # Login page
│   │   ├── Signup.jsx       # Registration page
│   │   ├── Dashboard.jsx    # Main dashboard (generate plans)
│   │   ├── Plans.jsx        # View saved plans
│   │   └── Chat.jsx         # AI chatbot interface
│   ├── services/
│   │   └── api.js           # API service layer
│   ├── store/
│   │   └── authStore.js     # Zustand state management
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # Entry point
│   └── index.css            # Tailwind styles
├── index.html
├── package.json
├── vite.config.js
└── tailwind.config.js
```

## Key Features

- **React Router** for navigation
- **Zustand** for state management (with persistence)
- **TailwindCSS** for styling
- **Axios** with interceptors for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Responsive Design** - works on mobile, tablet, and desktop

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Styling

The app uses TailwindCSS with custom components:
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input-field` - Input field style
- `.card` - Card container style

Colors are based on the `primary` color palette (blue).

## State Management

Uses Zustand with localStorage persistence for:
- User authentication state
- JWT token storage
- User profile data

## API Integration

All API calls go through `src/services/api.js` which:
- Adds JWT token to requests
- Handles 401 errors (auto-logout)
- Provides typed API functions

## Deployment

### Static Hosting (Netlify, Vercel, etc.)

1. Build the app:
```bash
npm run build
```

2. Deploy the `dist/` folder

3. Configure environment variables in your hosting provider

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://localhost:8000;
    }
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Please follow the existing code style and component patterns.

