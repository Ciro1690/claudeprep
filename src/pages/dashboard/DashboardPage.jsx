import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProgress } from '../../hooks/useProgress'
import { categories } from '../../data/curriculum/categories'
import { topics } from '../../data/curriculum/topics'

const CATEGORY_STYLES = {
  'coding-problems':       { bg: 'bg-blue-950',   border: 'border-blue-800',   text: 'text-blue-400',   bar: 'bg-blue-500' },
  'language-fundamentals': { bg: 'bg-purple-950', border: 'border-purple-800', text: 'text-purple-400', bar: 'bg-purple-500' },
  'behavioral':            { bg: 'bg-green-950',  border: 'border-green-800',  text: 'text-green-400',  bar: 'bg-green-500' },
  'systems-design':        { bg: 'bg-orange-950', border: 'border-orange-800', text: 'text-orange-400', bar: 'bg-orange-500' },
}

function getAvailableTopics(categoryId, profile) {
  return topics.filter(t => {
    if (t.category !== categoryId) return false
    if (t.languages && !t.languages.includes(profile?.language)) return false
    return true
  })
}

export default function DashboardPage() {
  const { user, profile, signOut } = useAuth()
  const { streak, completedIds, loading: progressLoading } = useProgress()
  const navigate = useNavigate()

  useEffect(() => {
    if (profile && !profile.language) {
      navigate('/onboarding', { replace: true })
    }
  }, [profile, navigate])

  async function handleSignOut() {
    await signOut()
    navigate('/login')
  }

  const displayName = profile?.handle || user?.email?.split('@')[0] || 'there'

  const nextTopic = (() => {
    if (!profile || progressLoading) return null
    const visited = JSON.parse(localStorage.getItem('claudeprep_visited') ?? '[]')
    for (const { topicId } of visited) {
      if (!completedIds.has(topicId)) {
        return topics.find(t => t.id === topicId) ?? null
      }
    }
    return null
  })()

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-semibold tracking-tight">claudeprep</span>
        {profile?.language && (
          <span className="text-xs text-gray-400 bg-gray-900 border border-gray-700 px-2.5 py-1 rounded-full capitalize">{profile.language}</span>
        )}
        <div className="flex items-center gap-4">
          <Link to="/settings" className="text-sm text-gray-400 hover:text-white transition-colors">
            Settings
          </Link>
          {!user?.is_anonymous && (
            <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-white transition-colors">
              Sign out
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        {user?.is_anonymous && (
          <div className="mb-6 flex items-center justify-between bg-gray-900 border border-gray-700 rounded-lg px-4 py-3">
            <p className="text-sm text-gray-400">You're browsing as a guest — progress won't be saved.</p>
            <Link to="/signup" className="text-sm text-blue-400 hover:text-blue-300 shrink-0 ml-4">
              Create account →
            </Link>
          </div>
        )}

        <div className="flex items-start justify-between mb-10">
          <div>
            <h2 className="text-2xl font-bold">Hey, {displayName} 👋</h2>
            <p className="text-gray-400 mt-1 text-sm">Pick a category to start studying.</p>
          </div>
          {!progressLoading && !user?.is_anonymous && (
            <div className="flex items-center gap-2 bg-gray-900 border border-gray-800 rounded-xl px-4 py-3">
              <span className="text-2xl">🔥</span>
              <div>
                <p className="text-xl font-bold leading-none">{streak}</p>
                <p className="text-xs text-gray-500 mt-0.5">day streak</p>
              </div>
            </div>
          )}
        </div>

        {nextTopic && !user?.is_anonymous && (
          <Link
            to={`/study/${nextTopic.category}/${nextTopic.id}`}
            className="flex items-center justify-between mb-6 bg-gray-900 border border-gray-800 hover:border-gray-600 rounded-xl px-5 py-4 transition-colors group"
          >
            <div>
              <p className="text-xs text-gray-500 mb-1">Continue studying</p>
              <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                {nextTopic.title}
              </p>
            </div>
            <span className="text-gray-500 group-hover:text-white transition-colors">→</span>
          </Link>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map(cat => {
            const style = CATEGORY_STYLES[cat.id]
            const available = getAvailableTopics(cat.id, profile)
            const completed = available.filter(t => completedIds.has(t.id)).length
            const pct = available.length ? Math.round((completed / available.length) * 100) : 0

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
                  <div className="flex items-center gap-2">
                    {cat.languageSpecific && profile?.language && (
                      <span className="text-xs text-gray-600 capitalize">{profile.language}</span>
                    )}
                    <span className="text-xs text-gray-500">{completed}/{available.length}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4">{cat.description}</p>
                {available.length > 0 ? (
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${style.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                ) : cat.languageSpecific ? (
                  <p className="text-xs text-gray-600 italic">
                    {profile?.language ? `No topics yet for ${profile.language}` : 'Set your language in Settings'}
                  </p>
                ) : (
                  <div className="h-1 bg-gray-800 rounded-full overflow-hidden" />
                )}
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
