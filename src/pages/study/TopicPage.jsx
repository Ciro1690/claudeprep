import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../../hooks/useProgress'
import { topics } from '../../data/curriculum/topics'
import { categories } from '../../data/curriculum/categories'

export default function TopicPage() {
  const { categoryId, topicId } = useParams()
  const navigate = useNavigate()
  const { isCompleted, markComplete, markIncomplete } = useProgress()
  const [saving, setSaving] = useState(false)

  const topic = topics.find(t => t.id === topicId && t.category === categoryId)
  const category = categories.find(c => c.id === categoryId)

  if (!topic) {
    navigate(`/study/${categoryId}`, { replace: true })
    return null
  }

  const done = isCompleted(topic.id)

  async function handleToggle() {
    setSaving(true)
    if (done) await markIncomplete(topic.id)
    else await markComplete(topic.id)
    setSaving(false)
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
          ← Dashboard
        </Link>
        <span className="text-gray-600">|</span>
        <Link to={`/study/${categoryId}`} className="text-gray-400 hover:text-white transition-colors text-sm">
          {category?.title}
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-gray-500 capitalize">{topic.level}</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-500">{topic.estimatedMinutes} min read</span>
          </div>
          <h1 className="text-3xl font-bold mb-3">{topic.title}</h1>
          <p className="text-gray-400 text-base leading-relaxed">{topic.summary}</p>
        </div>

        <div className="space-y-8">
          {topic.sections.map((section, i) => (
            <Section key={i} section={section} />
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex items-center justify-between">
          <Link
            to={`/study/${categoryId}`}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to {category?.title}
          </Link>

          <button
            onClick={handleToggle}
            disabled={saving}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${
              done
                ? 'bg-green-900 border border-green-700 text-green-300 hover:bg-green-800'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {done ? (
              <>
                <span>✓</span>
                <span>Completed</span>
              </>
            ) : (
              <span>Mark as complete</span>
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

function Section({ section }) {
  return (
    <div>
      {section.heading && (
        <h2 className="text-lg font-semibold text-white mb-3">{section.heading}</h2>
      )}
      {section.type === 'paragraph' && (
        <p className="text-gray-300 leading-relaxed">{section.body}</p>
      )}
      {section.type === 'bullets' && (
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-300">
              <span className="text-blue-500 mt-1.5 shrink-0">▸</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.type === 'code' && (
        <div className="rounded-lg overflow-hidden border border-gray-800">
          <div className="bg-gray-900 px-4 py-2 flex items-center border-b border-gray-800">
            <span className="text-xs text-gray-500 font-mono">{section.language}</span>
          </div>
          <pre className="bg-gray-950 px-4 py-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed">
            <code>{section.snippet}</code>
          </pre>
          {section.note && (
            <div className="bg-gray-900 px-4 py-3 border-t border-gray-800">
              <p className="text-xs text-gray-400 leading-relaxed">💡 {section.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
