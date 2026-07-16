import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, ListMusic } from 'lucide-react'
import api from '../api/axios'
import Loader from '../components/Loader'

export default function CreateAlbum() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [musics, setMusics] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/api/music')
      .then((res) => setMusics(res.data.musics))
      .catch(() => setError('Could not load tracks.'))
      .finally(() => setLoading(false))
  }, [])

  function toggleTrack(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const res = await api.post('/api/music/album', { title, musics: selected })
      navigate(`/albums/${res.data.album.id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create album.')
    } finally {
      setBusy(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-8 sm:py-10">
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Create an album</h1>
      <p className="mt-1 text-sm text-ink-muted">Group your tracks into a collection.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">Album title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
            placeholder="e.g. Late Night Sessions"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">Tracks ({selected.length} selected)</label>
          {musics.length === 0 && (
            <p className="rounded-lg border border-dashed border-surface-border px-3 py-6 text-center text-sm text-ink-faint">
              No tracks available. Upload one first.
            </p>
          )}
          <div className="flex max-h-72 flex-col gap-1 overflow-y-auto rounded-lg border border-surface-border p-1.5">
            {musics.map((track) => {
              const isSelected = selected.includes(track._id)
              return (
                <button
                  type="button"
                  key={track._id}
                  onClick={() => toggleTrack(track._id)}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    isSelected ? 'bg-amber/10 text-amber' : 'text-ink hover:bg-surface'
                  }`}
                >
                  <div
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      isSelected ? 'border-amber bg-amber text-base' : 'border-surface-border'
                    }`}
                  >
                    {isSelected && <Check size={11} strokeWidth={3} />}
                  </div>
                  <ListMusic size={14} className="shrink-0 text-ink-faint" />
                  <span className="truncate">{track.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={busy || !title}
          className="rounded-lg bg-amber py-2.5 text-sm font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? 'Creating...' : 'Create album'}
        </button>
      </form>
    </div>
  )
}
