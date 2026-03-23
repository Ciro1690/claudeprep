import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SiJavascript, SiPython, SiOpenjdk, SiCplusplus, SiSharp, SiGo } from 'react-icons/si'

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E' },
  { id: 'python',     label: 'Python',     Icon: SiPython,     color: '#3776AB' },
  { id: 'java',       label: 'Java',       Icon: SiOpenjdk,    color: '#ED8B00' },
  { id: 'cpp',        label: 'C++',        Icon: SiCplusplus,  color: '#00599C' },
  { id: 'csharp',     label: 'C#',         Icon: SiSharp,      color: '#239120' },
  { id: 'go',         label: 'Go',         Icon: SiGo,         color: '#00ACD7' },
]

const LEVELS = [
  { id: 'beginner',     label: 'Beginner',     description: 'Learning fundamentals, < 1 year of experience' },
  { id: 'intermediate', label: 'Intermediate', description: 'Solid foundations, 1–4 years of experience' },
  { id: 'advanced',     label: 'Advanced',     description: 'Optimizing solutions, 5+ years of experience' },
]

export default function SettingsPage() {
  const { profile, updateProfile } = useAuth()
  const [handle, setHandle] = useState(profile?.handle ?? '')
  const [language, setLanguage] = useState(profile?.language ?? null)
  const [experience, setExperience] = useState(profile?.experience ?? null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSaved(false)
    const { error } = await updateProfile({ handle: handle.trim() || null, language, experience })
    if (error) setError(error.message)
    else setSaved(true)
    setSaving(false)
  }

  const changed =
    handle.trim() !== (profile?.handle ?? '') ||
    language !== profile?.language ||
    experience !== profile?.experience

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

        {/* Experience */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Experience level</h2>
          <div className="space-y-3">
            {LEVELS.map(level => (
              <button
                key={level.id}
                onClick={() => setExperience(level.id)}
                className={`w-full text-left px-4 py-4 rounded-lg border transition-colors ${
                  experience === level.id
                    ? 'border-blue-500 bg-blue-950'
                    : 'border-gray-800 bg-gray-900 hover:border-gray-600'
                }`}
              >
                <p className={`font-medium ${experience === level.id ? 'text-white' : 'text-gray-200'}`}>
                  {level.label}
                </p>
                <p className="text-sm text-gray-400 mt-0.5">{level.description}</p>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          onClick={handleSave}
          disabled={!changed || saving || !language || !experience}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : saved ? 'Saved ✓' : 'Save changes'}
        </button>
      </main>
    </div>
  )
}
