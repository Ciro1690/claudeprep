import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { categories } from '../../data/curriculum/categories'
import { topics } from '../../data/curriculum/topics'

const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced']

const CATEGORY_STYLES = {
  'coding-problems':       { bg: 'bg-blue-950',   border: 'border-blue-800',   text: 'text-blue-400',   dot: 'bg-blue-500' },
  'language-fundamentals': { bg: 'bg-purple-950', border: 'border-purple-800', text: 'text-purple-400', dot: 'bg-purple-500' },
  'behavioral':            { bg: 'bg-green-950',  border: 'border-green-800',  text: 'text-green-400',  dot: 'bg-green-500' },
  'systems-design':        { bg: 'bg-orange-950', border: 'border-orange-800', text: 'text-orange-400', dot: 'bg-orange-500' },
}

function getAvailableTopics(categoryId, profile) {
  const userLevelIndex = LEVEL_ORDER.indexOf(profile?.experience ?? 'beginner')
  return topics.filter(t => {
    if (t.category !== categoryId) return false
    if (t.languages && !t.languages.includes(profile?.language)) return false
    return LEVEL_ORDER.indexOf(t.level) <= userLevelIndex
  })
}

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

  const displayName = profile?.handle || user?.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">claudeprep</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">{profile?.language && `${profile.language} · ${profile.experience}`}</span>
          <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-white transition-colors">
            Sign out
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-2xl font-bold">Hey, {displayName} 👋</h2>
          <p className="text-gray-400 mt-1 text-sm">Pick a category to start studying.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => {
            const style = CATEGORY_STYLES[cat.id]
            const available = getAvailableTopics(cat.id, profile)
            return (
              <Link
                key={cat.id}
                to={`/study/${cat.id}`}
                className={`block rounded-xl border ${style.border} ${style.bg} p-5 hover:brightness-110 transition-all`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${style.text}`}>
                    {cat.title}
                  </span>
                  <span className="text-xs text-gray-500">{available.length} topics</span>
                </div>
                <p className="text-gray-300 text-sm">{cat.description}</p>
                {cat.languageSpecific && available.length === 0 && (
                  <p className="text-xs text-gray-600 mt-3 italic">
                    No topics yet for {profile?.language}
                  </p>
                )}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
