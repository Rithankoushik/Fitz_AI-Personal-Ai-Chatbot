import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Plans from './pages/Plans'
import Chat from './pages/Chat'
import Layout from './components/Layout'

function App() {
  const { isAuthenticated } = useAuthStore()

  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/dashboard" />} />
        
        <Route element={<Layout />}>
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/plans" element={isAuthenticated ? <Plans /> : <Navigate to="/login" />} />
          <Route path="/chat" element={isAuthenticated ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

