import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useProgress } from '../../hooks/useProgress'
import { categories } from '../../data/curriculum/categories'
import { topics } from '../../data/curriculum/topics'

const LEVEL_ORDER = ['beginner', 'intermediate', 'advanced']

const LEVEL_COLORS = {
  beginner:     'text-green-400 bg-green-950 border-green-800',
  intermediate: 'text-yellow-400 bg-yellow-950 border-yellow-800',
  advanced:     'text-red-400 bg-red-950 border-red-800',
}

export default function TopicsPage() {
  const { categoryId } = useParams()
  const { profile } = useAuth()
  const { isCompleted } = useProgress()
  const navigate = useNavigate()

  const category = categories.find(c => c.id === categoryId)
  if (!category) {
    navigate('/dashboard', { replace: true })
    return null
  }

  const userLevelIndex = LEVEL_ORDER.indexOf(profile?.experience ?? 'beginner')
  const available = topics.filter(t => {
    if (t.category !== categoryId) return false
    if (t.languages && !t.languages.includes(profile?.language)) return false
    return LEVEL_ORDER.indexOf(t.level) <= userLevelIndex
  })

  const byLevel = LEVEL_ORDER.reduce((acc, level) => {
    const levelTopics = available.filter(t => t.level === level)
    if (levelTopics.length) acc[level] = levelTopics
    return acc
  }, {})

  const completedCount = available.filter(t => isCompleted(t.id)).length

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
          ← Dashboard
        </Link>
        <span className="text-gray-600">|</span>
        <span className="text-sm font-medium">{category.title}</span>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">{category.title}</h1>
            <p className="text-gray-400 text-sm mt-1">{category.description}</p>
          </div>
          {available.length > 0 && (
            <span className="text-sm text-gray-400 shrink-0 mt-1">
              {completedCount}/{available.length} done
            </span>
          )}
        </div>

        {available.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-1">No topics available yet</p>
            <p className="text-sm">
              {category.languageSpecific
                ? `We're working on ${profile?.language} content.`
                : 'Check back soon.'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(byLevel).map(([level, levelTopics]) => (
              <div key={level}>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3 capitalize">
                  {level}
                </h2>
                <div className="space-y-2">
                  {levelTopics.map(topic => {
                    const done = isCompleted(topic.id)
                    return (
                      <Link
                        key={topic.id}
                        to={`/study/${categoryId}/${topic.id}`}
                        className={`flex items-center justify-between border rounded-lg px-4 py-3.5 transition-colors group ${
                          done
                            ? 'bg-gray-900/50 border-gray-800 opacity-70'
                            : 'bg-gray-900 border-gray-800 hover:bg-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                            done
                              ? 'border-green-600 bg-green-900 text-green-400'
                              : 'border-gray-700 text-transparent'
                          }`}>
                            ✓
                          </span>
                          <div>
                            <p className={`text-sm font-medium transition-colors ${
                              done ? 'text-gray-400' : 'text-white group-hover:text-blue-300'
                            }`}>
                              {topic.title}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{topic.summary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 ml-4 shrink-0">
                          <span className="text-xs text-gray-600">{topic.estimatedMinutes} min</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${LEVEL_COLORS[topic.level]}`}>
                            {topic.level}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
