import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { LogOut, Home, FileText, MessageCircle, Utensils } from 'lucide-react'

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/dashboard" className="text-xl font-bold text-primary-600">
                💪 FitAI
              </Link>
              
              <div className="hidden md:flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/dashboard')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                
                <Link
                  to="/plans"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/plans')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  My Plans
                </Link>
                
                <Link
                  to="/chat"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/chat')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Link>
                
                <Link
                  to="/food-tracker"
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive('/food-tracker')
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Utensils className="w-4 h-4 mr-2" />
                  Food Tracker
                </Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                {user?.name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  )
}

