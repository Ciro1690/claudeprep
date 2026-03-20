import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (profile && (!profile.language || !profile.experience)) {
      navigate('/onboarding', { replace: true })
    }
  }, [profile, navigate])

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

        {profile && (
          <div className="flex gap-3 mb-8">
            <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full capitalize">
              {profile.language}
            </span>
            <span className="bg-gray-800 text-gray-300 text-sm px-3 py-1 rounded-full capitalize">
              {profile.experience}
            </span>
          </div>
        )}

        <p className="text-gray-500 text-sm">Dashboard coming in Phase 3.</p>
      </main>
    </div>
  )
}
