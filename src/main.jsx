import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/layout/ProtectedRoute'
import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import OnboardingPage from './pages/onboarding/OnboardingPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import TopicsPage from './pages/study/TopicsPage'
import TopicPage from './pages/study/TopicPage'

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  {
    path: '/onboarding',
    element: <ProtectedRoute><OnboardingPage /></ProtectedRoute>,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: '/study/:categoryId',
    element: <ProtectedRoute><TopicsPage /></ProtectedRoute>,
  },
  {
    path: '/study/:categoryId/:topicId',
    element: <ProtectedRoute><TopicPage /></ProtectedRoute>,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)
