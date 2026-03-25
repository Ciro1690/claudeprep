import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SiPython, SiSharp, SiTypescript } from 'react-icons/si'

const LANGUAGES = [
  { id: 'csharp',     label: 'C#',         Icon: SiSharp,      color: '#239120' },
  { id: 'python',     label: 'Python',     Icon: SiPython,     color: '#3776AB' },
  { id: 'typescript', label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
]

export default function SettingsPage() {
  const { profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [handle, setHandle] = useState(profile?.handle ?? '')
  const [language, setLanguage] = useState(profile?.language ?? null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSaved(false)
    const { error } = await updateProfile({ handle: handle.trim() || null, language })
    if (error) setError(error.message)
    else setSaved(true)
    setSaving(false)
  }

  const changed =
    handle.trim() !== (profile?.handle ?? '') ||
    language !== profile?.language

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-6 py-4 flex items-center gap-4">
        <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
          ← Dashboard
        </Link>
        <span className="text-gray-600">|</span>
        <span className="text-sm font-medium">Settings</span>
      </header>

      <main className="max-w-lg mx-auto px-6 py-10 space-y-10">

        {/* Display name */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Display name</h2>
          <input
            type="text"
            value={handle}
            onChange={e => setHandle(e.target.value)}
            maxLength={30}
            placeholder="Your name"
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Language */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Primary language</h2>
          <div className="grid grid-cols-3 gap-3">
            {LANGUAGES.map(({ id, label, Icon, color }) => (
              <button
                key={id}
                onClick={() => setLanguage(id)}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-lg border transition-colors ${
                  language === id
                    ? 'border-blue-500 bg-blue-950 text-white'
                    : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-600'
                }`}
              >
                <Icon size={28} color={color} />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={!changed || saving || !language}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
        </button>

        {saved && (
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-2.5 rounded-lg transition-colors"
          >
            Go to dashboard →
          </button>
        )}
      </main>
    </div>
  )
}
