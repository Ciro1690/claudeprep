function isCapacityError(msg) {
  if (!msg) return false
  if (msg === 'capacity_exceeded') return true
  const lower = msg.toLowerCase()
  return (
    lower.includes('credit') ||
    lower.includes('balance') ||
    lower.includes('billing') ||
    lower.includes('quota') ||
    lower.includes('overloaded')
  )
}

// Call after a failed supabase.functions.invoke() to get a typed error object
export function parseAiError(fnError, data) {
  const msg = fnError?.message ?? data?.error ?? ''
  if (msg === 'rate_limited') return { type: 'rate_limited' }
  if (isCapacityError(msg)) return { type: 'capacity' }
  return { type: 'generic', message: msg || 'Something went wrong.' }
}

export default function AiErrorDisplay({ type, message }) {
  if (type === 'rate_limited') {
    return (
      <div className="rounded-xl border border-yellow-800 bg-yellow-950/40 p-5 text-center">
        <p className="text-2xl mb-2">⏳</p>
        <p className="text-sm font-medium text-yellow-300 mb-1">Hourly limit reached</p>
        <p className="text-xs text-yellow-600">
          To keep ClaudePrep available for everyone, AI requests are limited to 20 per hour.
          Come back soon!
        </p>
      </div>
    )
  }

  if (type === 'capacity') {
    return (
      <div className="rounded-xl border border-purple-800 bg-purple-950/40 p-5 text-center">
        <p className="text-2xl mb-2">✦</p>
        <p className="text-sm font-medium text-purple-300 mb-1">ClaudePrep is at capacity</p>
        <p className="text-xs text-purple-600">
          We've hit our AI usage limit for now. Check back later — this is a free demo and capacity
          is limited.
        </p>
      </div>
    )
  }

  return (
    <p className="text-xs text-red-400 text-center">{message ?? 'Something went wrong.'}</p>
  )
}
