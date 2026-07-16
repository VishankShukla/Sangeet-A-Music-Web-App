import { createContext, useContext, useEffect, useRef, useState } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio())
  const [queue, setQueue] = useState([])
  const [index, setIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  const current = queue[index] || null

  useEffect(() => {
    const audio = audioRef.current
    const onTime = () => setProgress(audio.currentTime)
    const onLoaded = () => setDuration(audio.duration || 0)
    const onEnd = () => next()
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('ended', onEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, index])

  useEffect(() => {
    const audio = audioRef.current
    if (!current) return
    if (audio.src !== current.uri) {
      audio.src = current.uri
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }
  }, [current])

  function playTrack(track, trackList = null) {
    const list = trackList || [track]
    const i = list.findIndex((t) => t._id === track._id)
    setQueue(list)
    setIndex(i === -1 ? 0 : i)
    setIsPlaying(true)
  }

  function toggle() {
    const audio = audioRef.current
    if (!current) return
    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  function next() {
    if (queue.length === 0) return
    setIndex((i) => (i + 1) % queue.length)
  }

  function prev() {
    if (queue.length === 0) return
    setIndex((i) => (i - 1 + queue.length) % queue.length)
  }

  function seek(time) {
    audioRef.current.currentTime = time
    setProgress(time)
  }

  return (
    <PlayerContext.Provider
      value={{ current, isPlaying, progress, duration, playTrack, toggle, next, prev, seek, queue }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
