import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const storageKey = topicId => `claudeprep_quiz_${topicId}`

function loadSaved(topicId) {
  try {
    const raw = localStorage.getItem(storageKey(topicId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function Quiz({ topic }) {
  const { user } = useAuth()
  const questions = topic.quiz

  const [saved] = useState(() => loadSaved(topic.id))
  const [started, setStarted] = useState(false)
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [confirmed, setConfirmed] = useState(false)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState(null) // { score, total } when finished
  const [saving, setSaving] = useState(false)

  const q = questions[current]
  const isCorrect = selected === q?.answer

  function handleSelect(idx) {
    if (confirmed) return
    setSelected(idx)
  }

  function handleConfirm() {
    if (selected === null) return
    if (selected === q.answer) setScore(s => s + 1)
    setConfirmed(true)
  }

  async function handleNext() {
    const isLast = current + 1 >= questions.length
    if (!isLast) {
      setCurrent(c => c + 1)
      setSelected(null)
      setConfirmed(false)
      return
    }

    // score state is already updated by handleConfirm before this fires
    const finalScore = score
    const finalResult = { score: finalScore, total: questions.length }
    setResult(finalResult)
    localStorage.setItem(storageKey(topic.id), JSON.stringify(finalResult))

    if (user) {
      setSaving(true)
      await supabase.from('quiz_attempts').insert({
        user_id: user.id,
        topic_id: topic.id,
        quiz_type: 'multiple-choice',
        score: finalScore,
        total: questions.length,
      })
      setSaving(false)
    }
  }

  function handleRetake() {
    localStorage.removeItem(storageKey(topic.id))
    setResult(null)
    setCurrent(0)
    setSelected(null)
    setConfirmed(false)
    setScore(0)
    setStarted(true)
  }

  // Show results screen if just finished or has a saved result
  const displayResult = result ?? saved
  if (!started && displayResult) {
    const pct = Math.round((displayResult.score / displayResult.total) * 100)
    const passed = pct >= 80
    return (
      <div className="mt-12 pt-8 border-t border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Knowledge Check</h2>
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 text-center">
          <div className={`text-5xl font-bold mb-2 ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
            {pct}%
          </div>
          <p className="text-gray-300 mb-1">
            {displayResult.score} / {displayResult.total} correct
          </p>
          <p className={`text-sm mb-6 ${passed ? 'text-green-400' : 'text-yellow-400'}`}>
            {passed ? 'Great work!' : 'Keep studying and try again.'}
          </p>
          {saving && <p className="text-xs text-gray-500 mb-4">Saving result…</p>}
          <button
            onClick={handleRetake}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  // Pre-start
  if (!started) {
    return (
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Knowledge Check</h2>
            <p className="text-sm text-gray-400 mt-1">{questions.length} multiple choice questions</p>
          </div>
          <button
            onClick={() => setStarted(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  // In-progress
  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">Knowledge Check</h2>
        <span className="text-xs text-gray-500">{current + 1} / {questions.length}</span>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <p className="text-white font-medium mb-5 leading-relaxed">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            let style = 'border-gray-700 hover:border-gray-500 text-gray-300'
            if (confirmed) {
              if (idx === q.answer) style = 'border-green-600 bg-green-950 text-green-300'
              else if (idx === selected) style = 'border-red-600 bg-red-950 text-red-300'
              else style = 'border-gray-800 text-gray-600'
            } else if (idx === selected) {
              style = 'border-blue-500 bg-blue-950 text-blue-200'
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-colors ${style} ${
                  confirmed ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className="font-mono text-xs mr-3 opacity-60">
                  {String.fromCharCode(65 + idx)}.
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {confirmed && (
          <div className="mt-4 p-3 rounded-lg bg-gray-800 border border-gray-700">
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className={`font-semibold mr-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                {isCorrect ? '✓ Correct.' : '✗ Incorrect.'}
              </span>
              {q.explanation}
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={selected === null}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
