import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

function toLocalDateString(date) {
  return new Date(date).toLocaleDateString('en-CA') // YYYY-MM-DD in local time
}

function calculateStreak(rows) {
  if (!rows.length) return 0

  const dates = [...new Set(rows.map(r => toLocalDateString(r.completed_at)))]
    .sort()
    .reverse()

  const today = toLocalDateString(new Date())
  const yesterday = toLocalDateString(new Date(Date.now() - 86400000))

  if (dates[0] !== today && dates[0] !== yesterday) return 0

  let streak = 1
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1])
    const curr = new Date(dates[i])
    const diff = Math.round((prev - curr) / 86400000)
    if (diff === 1) streak++
    else break
  }
  return streak
}

export function useProgress() {
  const { user } = useAuth()
  const [progress, setProgress] = useState([]) // array of { topic_id, completed_at }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) { setProgress([]); setLoading(false); return }

    supabase
      .from('user_progress')
      .select('topic_id, completed_at')
      .eq('user_id', user.id)
      .then(({ data }) => {
        setProgress(data ?? [])
        setLoading(false)
      })
  }, [user])

  const isCompleted = useCallback(
    topicId => progress.some(p => p.topic_id === topicId),
    [progress]
  )

  const markComplete = useCallback(async topicId => {
    const { data, error } = await supabase
      .from('user_progress')
      .insert({ user_id: user.id, topic_id: topicId })
      .select('topic_id, completed_at')
      .single()
    if (!error) setProgress(prev => [...prev, data])
    return { error }
  }, [user])

  const markIncomplete = useCallback(async topicId => {
    const { error } = await supabase
      .from('user_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('topic_id', topicId)
    if (!error) setProgress(prev => prev.filter(p => p.topic_id !== topicId))
    return { error }
  }, [user])

  const streak = calculateStreak(progress)
  const completedIds = new Set(progress.map(p => p.topic_id))

  return { progress, loading, isCompleted, markComplete, markIncomplete, streak, completedIds }
}
