import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">claudeprep</h1>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Sign out
        </button>
      </header>
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm mb-8">{user?.email}</p>

        {!profile?.language && (
          <div className="bg-blue-950 border border-blue-800 rounded-lg px-5 py-4 mb-8">
            <p className="text-blue-200 text-sm font-medium">Complete your profile</p>
            <p className="text-blue-400 text-sm mt-0.5">
              Choose your language and experience level to get personalized content.
            </p>
            <button
              onClick={() => navigate('/onboarding')}
              className="mt-3 text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition-colors"
            >
              Get started →
            </button>
          </div>
        )}

        <p className="text-gray-500 text-sm">Dashboard coming in Phase 3.</p>
      </main>
    </div>
  )
}
