const KEY = 'claudeprep_requests'
const WINDOW_MS = 60 * 60 * 1000 // 1 hour
const LIMIT = 20

function getTimestamps() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

function getRecent() {
  const now = Date.now()
  return getTimestamps().filter(ts => now - ts < WINDOW_MS)
}

export function canMakeRequest() {
  return getRecent().length < LIMIT
}

export function recordRequest() {
  const recent = getRecent()
  recent.push(Date.now())
  localStorage.setItem(KEY, JSON.stringify(recent))
}
