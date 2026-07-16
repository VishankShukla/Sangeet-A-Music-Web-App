import { useEffect, useState } from 'react'
import api from '../api/axios'
import MusicRow from '../components/MusicRow'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'
import { usePlayer } from '../context/PlayerContext'
import { Play } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
  const { playTrack } = usePlayer()
  const [musics, setMusics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/api/music')
      .then((res) => setMusics(res.data.musics))
      .catch(() => setError('Could not load tracks. Is the backend running?'))
      .finally(() => setLoading(false))
  }, [])

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  if (loading) return <Loader />

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      <p className="text-sm text-ink-muted">{greeting}{user ? `, ${user.username}` : ''}</p>
      <h1 className="mt-1 font-display text-2xl font-semibold text-balance text-ink sm:text-4xl">
        What are we spinning today?
      </h1>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!error && musics.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-surface-border p-10 text-center">
          <p className="text-ink-muted">No tracks uploaded yet.</p>
          {user?.role === 'artist' && (
            <p className="mt-1 text-sm text-ink-faint">Head to "Upload track" to add the first one.</p>
          )}
        </div>
      )}

      {musics.length > 0 && (
        <div className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-lg font-medium text-ink">All tracks</h2>
            <button
              onClick={() => playTrack(musics[0], musics)}
              className="flex items-center gap-1.5 rounded-full bg-amber px-3.5 py-1.5 text-xs font-semibold text-base transition-opacity hover:opacity-90"
            >
              <Play size={12} fill="currentColor" />
              Play all
            </button>
          </div>
          <div className="flex flex-col gap-0.5">
            {musics.map((track, i) => (
              <MusicRow key={track._id} track={track} index={i} list={musics} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
