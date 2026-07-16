import { useEffect, useState } from 'react'
import api from '../api/axios'
import AlbumCard from '../components/AlbumCard'
import Loader from '../components/Loader'
import { useAuth } from '../context/AuthContext'

export default function Albums() {
  const { user } = useAuth()
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .get('/api/music/albums')
      .then((res) => setAlbums(res.data.albums))
      .catch(() => setError('Could not load albums.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Albums</h1>

      {error && <p className="mt-6 text-sm text-red-400">{error}</p>}

      {!error && albums.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-surface-border p-10 text-center">
          <p className="text-ink-muted">No albums yet.</p>
          {user?.role === 'artist' && (
            <p className="mt-1 text-sm text-ink-faint">Create one from "Create album" in the sidebar.</p>
          )}
        </div>
      )}

      {albums.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {albums.map((album) => (
            <AlbumCard key={album._id} album={album} />
          ))}
        </div>
      )}
    </div>
  )
}
