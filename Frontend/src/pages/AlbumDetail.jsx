import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Disc3, Play } from 'lucide-react'
import api from '../api/axios'
import MusicRow from '../components/MusicRow'
import Loader from '../components/Loader'
import { usePlayer } from '../context/PlayerContext'

export default function AlbumDetail() {
  const { albumID } = useParams()
  const { playTrack } = usePlayer()
  const [album, setAlbum] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get(`/api/music/albums/${albumID}`)
      .then((res) => setAlbum(res.data.album))
      .catch(() => setError('Could not load this album.'))
      .finally(() => setLoading(false))
  }, [albumID])

  if (loading) return <Loader />
  if (error) return <p className="px-4 py-10 text-sm text-red-400">{error}</p>
  if (!album) return null

  const tracks = album.musics || []

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      <Link to="/albums" className="mb-6 inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink">
        <ArrowLeft size={14} /> Back to albums
      </Link>

      <div className="mb-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:gap-6 sm:text-left">
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-surface-hover to-base-soft text-ink-faint sm:h-36 sm:w-36">
          <Disc3 size={48} strokeWidth={1} className="sm:h-14 sm:w-14" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-muted">Album</p>
          <h1 className="font-display text-2xl font-semibold text-ink sm:text-4xl">{album.title}</h1>
          <p className="mt-1 text-sm text-ink-muted">
            {album.artist?.username || 'Unknown artist'} · {tracks.length} track{tracks.length !== 1 ? 's' : ''}
          </p>
          {tracks.length > 0 && (
            <button
              onClick={() => playTrack(tracks[0], tracks)}
              className="mt-4 flex items-center gap-1.5 rounded-full bg-amber px-4 py-2 text-xs font-semibold text-base transition-opacity hover:opacity-90"
            >
              <Play size={12} fill="currentColor" />
              Play album
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-0.5">
        {tracks.map((track, i) => (
          <MusicRow key={track._id} track={track} index={i} list={tracks} />
        ))}
        {tracks.length === 0 && <p className="text-sm text-ink-faint">This album has no tracks yet.</p>}
      </div>
    </div>
  )
}
