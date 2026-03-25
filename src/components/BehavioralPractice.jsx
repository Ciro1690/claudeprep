import { useState } from 'react'
import { supabase } from '../lib/supabase'
import ReactMarkdown from 'react-markdown'
import { canMakeRequest, recordRequest } from '../lib/rateLimit'
import AiErrorDisplay, { parseAiError } from './AiErrorDisplay'

export default function BehavioralPractice({ topic }) {
  const [selected, setSelected] = useState(null)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // null | { type: 'rate_limited'|'capacity'|'generic', message?: string }

  const questions = topic.practiceQuestions

  async function handleSubmit(e) {
    e.preventDefault()
    const text = answer.trim()
    if (!text || loading) return

    if (!canMakeRequest()) {
      setError({ type: 'rate_limited' })
      return
    }

    setLoading(true)
    setFeedback(null)
    setError(null)
    recordRequest()

    const isSystemsDesign = topic.category === 'systems-design'

    const prompt = isSystemsDesign
      ? `I'm practicing for a systems design interview. The question was: "${questions[selected]}"

My design approach:
${text}

Please give me specific, actionable feedback on this systems design answer. Cover:
- What's good about this approach
- Key components, trade-offs, or considerations that are missing
- Any scalability, reliability, or performance concerns
- One concrete suggestion for what to address first`
      : `I'm practicing for a behavioral interview. The question was: "${questions[selected]}"

My answer:
${text}

Please give me specific, actionable coaching on how to strengthen this answer. Cover:
- What I'm doing well
- What's missing or could be stronger (STAR structure, specificity, use of "I" vs "we", quantified results)
- A concrete suggestion for how to improve the weakest part`

    const { data, error: fnError } = await supabase.functions.invoke('quick-processor', {
      body: { topic, messages: [{ role: 'user', content: prompt }] },
    })

    if (fnError || data?.error) {
      setError(parseAiError(fnError, data))
    } else {
      setFeedback(data.content)
    }
    setLoading(false)
  }

  function handleReset() {
    setSelected(null)
    setAnswer('')
    setFeedback(null)
    setError(null)
  }

  const isSystemsDesign = topic.category === 'systems-design'

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-1">Practice Questions</h2>
      <p className="text-sm text-gray-400 mb-5">
        {isSystemsDesign
          ? 'Pick a design prompt, walk through your approach, and get feedback from Claude.'
          : 'Pick a question, write your answer, and get coaching from Claude.'}
      </p>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        {/* Question picker */}
        {selected === null ? (
          <div className="space-y-3">
            {questions.map((q, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white text-sm leading-relaxed transition-colors"
              >
                <span className="font-mono text-xs text-gray-600 mr-3">{i + 1}.</span>
                {q}
              </button>
            ))}
          </div>
        ) : !feedback ? (
          /* Answer form */
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <p className="text-white font-medium leading-relaxed">"{questions[selected]}"</p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="shrink-0 text-xs text-gray-500 hover:text-gray-300 transition-colors mt-0.5"
                >
                  ← Change
                </button>
              </div>
              <textarea
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                placeholder={isSystemsDesign ? 'Walk through your design approach...' : 'Write your answer here...'}
                rows={6}
                disabled={loading}
                className="w-full bg-gray-950 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-4 py-3 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50 resize-none"
              />
            </div>
            {error && <div className="mb-3"><AiErrorDisplay type={error.type} message={error.message} /></div>}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!answer.trim() || loading}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
              >
                {loading ? (
                  <>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                    Getting feedback…
                  </>
                ) : (
                  <><span className="text-sm">✦</span> Get feedback</>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Feedback view */
          <div>
            <p className="text-xs text-gray-500 mb-3 font-medium">"{questions[selected]}"</p>
            <div className="mb-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
              <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">Your answer</p>
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{answer}</p>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-purple-400 text-sm">✦</span>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Claude's feedback</p>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-200">
              <ReactMarkdown>{feedback}</ReactMarkdown>
            </div>
            <div className="mt-5 flex gap-3 justify-end">
              <button
                onClick={() => { setFeedback(null); setAnswer('') }}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Retry this question
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Try a different question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
