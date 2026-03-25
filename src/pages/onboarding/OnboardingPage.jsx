import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { SiPython, SiSharp, SiTypescript } from 'react-icons/si'

const LANGUAGES = [
  { id: 'csharp',     label: 'C#',         Icon: SiSharp,      color: '#239120' },
  { id: 'python',     label: 'Python',     Icon: SiPython,     color: '#3776AB' },
  { id: 'typescript', label: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
]

export default function OnboardingPage() {
  const { user, profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const isGuest = user?.is_anonymous
  const [step, setStep] = useState(isGuest ? 2 : 1)
  const [handle, setHandle] = useState('')
  const [language, setLanguage] = useState(null)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (profile?.language) {
      navigate('/dashboard', { replace: true })
    }
  }, [profile, navigate])

  async function handleFinish() {
    setError(null)
    setSaving(true)
    const { error } = await updateProfile({ handle: handle.trim() || null, language })
    if (error) {
      setError(error.message)
      setSaving(false)
    } else {
      navigate('/dashboard', { replace: true })
    }
  }

  const steps = isGuest ? [2] : [1, 2]

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map(n => (
            <div
              key={n}
              className={`h-1 flex-1 rounded-full transition-colors ${
                n <= step ? 'bg-blue-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <StepHandle
            handle={handle}
            setHandle={setHandle}
            email={user?.email}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <StepLanguage
            selected={language}
            setSelected={setLanguage}
            isGuest={isGuest}
            error={error}
            saving={saving}
            onBack={isGuest ? null : () => setStep(1)}
            onFinish={handleFinish}
            stepLabel={isGuest ? null : 'Step 2 of 2'}
          />
        )}
      </div>
    </div>
  )
}

function StepHandle({ handle, setHandle, email, onNext }) {
  return (
    <div>
      <p className="text-sm text-blue-400 font-medium mb-2">Step 1 of 2</p>
      <h2 className="text-2xl font-bold text-white mb-1">What should we call you?</h2>
      <p className="text-gray-400 text-sm mb-8">
        Choose a display name, or we'll use your email.
      </p>
      <input
        type="text"
        value={handle}
        onChange={e => setHandle(e.target.value)}
        placeholder={email?.split('@')[0] ?? 'Your name'}
        maxLength={30}
        className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-6"
      />
      <button
        onClick={onNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors"
      >
        Continue →
      </button>
    </div>
  )
}

function StepLanguage({ selected, setSelected, isGuest, error, saving, onBack, onFinish, stepLabel }) {
  return (
    <div>
      {stepLabel && <p className="text-sm text-blue-400 font-medium mb-2">{stepLabel}</p>}
      <h2 className="text-2xl font-bold text-white mb-1">Primary language</h2>
      <p className="text-gray-400 text-sm mb-8">
        Which language will you use for coding problems?
      </p>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {LANGUAGES.map(({ id, label, Icon, color }) => (
          <button
            key={id}
            onClick={() => setSelected(id)}
            className={`flex flex-col items-center gap-2 py-4 px-3 rounded-lg border transition-colors ${
              selected === id
                ? 'border-blue-500 bg-blue-950 text-white'
                : 'border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-600'
            }`}
          >
            <Icon size={28} color={color} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>
      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 px-4 py-3 rounded-lg text-sm mb-4">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        {onBack && (
          <button
            onClick={onBack}
            className="flex-1 border border-gray-700 hover:border-gray-500 text-gray-300 font-medium py-2.5 rounded-lg transition-colors"
          >
            ← Back
          </button>
        )}
        <button
          onClick={onFinish}
          disabled={!selected || saving}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {saving ? 'Saving…' : 'Start prepping →'}
        </button>
      </div>
    </div>
  )
}
