import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import ReactMarkdown from 'react-markdown'
import { canMakeRequest, recordRequest } from '../lib/rateLimit'
import AiErrorDisplay, { parseAiError } from './AiErrorDisplay'

export default function ClaudeChat({ topic }) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([]) // { role: 'user'|'assistant', content: string }
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null) // null | { type: 'rate_limited'|'capacity'|'generic', message?: string }
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  async function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    if (!canMakeRequest()) {
      setError({ type: 'rate_limited' })
      return
    }

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setError(null)
    setLoading(true)
    recordRequest()

    const { data, error: fnError } = await supabase.functions.invoke('quick-processor', {
      body: { topic, messages: updatedMessages },
    })

    if (fnError || data?.error) {
      setError(parseAiError(fnError, data))
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }])
    }
    setLoading(false)
  }

  return (
    <div className="mt-10">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors"
      >
        <span className="text-base">✦</span>
        {open ? 'Close Ask Claude' : 'Ask Claude about this topic'}
      </button>

      {open && (
        <div className="mt-4 border border-gray-800 rounded-xl overflow-hidden">
          {/* Message list */}
          <div className="bg-gray-900 px-4 py-4 space-y-4 max-h-96 overflow-y-auto">
            {messages.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-6">
                Ask anything about <span className="text-gray-300">{topic.title}</span> — examples, trade-offs, interview tips...
              </p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <span className="shrink-0 mt-0.5 text-purple-400 text-sm">✦</span>
                )}
                <div className={`max-w-[85%] text-sm leading-relaxed rounded-xl px-4 py-2.5 ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-200 prose prose-invert prose-sm max-w-none'
                }`}>
                  {msg.role === 'user' ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3 justify-start">
                <span className="shrink-0 mt-0.5 text-purple-400 text-sm">✦</span>
                <div className="bg-gray-800 rounded-xl px-4 py-2.5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            {error && (
              <AiErrorDisplay type={error.type} message={error.message} />
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="flex gap-2 bg-gray-950 border-t border-gray-800 p-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
