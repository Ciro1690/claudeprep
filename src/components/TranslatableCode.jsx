import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { canMakeRequest, recordRequest } from '../lib/rateLimit'
import { parseAiError } from './AiErrorDisplay'

const LANG_LABELS = { pseudocode: 'Pseudocode', csharp: 'C#', python: 'Python', typescript: 'TypeScript' }
const SUPPORTED = ['csharp', 'python', 'typescript']

export default function TranslatableCode({ section, topic }) {
  const { profile } = useAuth()
  const userLang = profile?.language

  const [translated, setTranslated] = useState(null)   // translated snippet string
  const [showTranslated, setShowTranslated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const canTranslate = SUPPORTED.includes(userLang)
  const displaySnippet = showTranslated && translated ? translated : section.snippet
  const displayLang = showTranslated && translated ? LANG_LABELS[userLang] : LANG_LABELS[section.language] ?? section.language

  async function handleTranslate() {
    if (translated) {
      setShowTranslated(true)
      return
    }

    if (!canMakeRequest()) {
      setError('Rate limit reached. Try again in an hour.')
      return
    }

    setLoading(true)
    setError(null)
    recordRequest()

    const { data, error: fnError } = await supabase.functions.invoke('quick-processor', {
      body: {
        topic,
        messages: [{
          role: 'user',
          content: `Translate this pseudocode to ${LANG_LABELS[userLang]}. Return only the translated code, no explanation, no markdown fences.\n\n${section.snippet}`,
        }],
      },
    })

    if (fnError || data?.error) {
      const { type } = parseAiError(fnError, data)
      setError(type === 'capacity' ? 'At capacity — try again later.' : type === 'rate_limited' ? 'Hourly limit reached.' : 'Translation failed.')
    } else {
      setTranslated(data.content.trim())
      setShowTranslated(true)
    }
    setLoading(false)
  }

  return (
    <div className="rounded-lg overflow-hidden border border-gray-800">
      <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
        <span className="text-xs text-gray-500 font-mono">{displayLang}</span>
        {canTranslate && (
          <div className="flex items-center gap-3">
            {error && <span className="text-xs text-red-400">{error}</span>}
            {translated && (
              <button
                onClick={() => setShowTranslated(v => !v)}
                className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showTranslated ? 'Show C#' : `Show ${LANG_LABELS[userLang]}`}
              </button>
            )}
            {!translated && (
              <button
                onClick={handleTranslate}
                disabled={loading}
                className="text-xs text-blue-400 hover:text-blue-300 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Translating…' : `Show in ${LANG_LABELS[userLang]}`}
              </button>
            )}
          </div>
        )}
      </div>
      <pre className="bg-gray-950 px-4 py-4 overflow-x-auto text-sm font-mono text-gray-200 leading-relaxed">
        <code>{displaySnippet}</code>
      </pre>
      {section.note && (
        <div className="bg-gray-900 px-4 py-3 border-t border-gray-800">
          <p className="text-xs text-gray-400 leading-relaxed">💡 {section.note}</p>
        </div>
      )}
    </div>
  )
}
