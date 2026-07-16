import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UploadCloud, Music2 } from 'lucide-react'
import api from '../api/axios'

export default function Upload() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!file) {
      setError('Choose an audio file first.')
      return
    }
    setError('')
    setSuccess('')
    setBusy(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('music', file)

      await api.post('/api/music/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setSuccess(`"${title}" uploaded successfully.`)
      setTitle('')
      setFile(null)
      e.target.reset()
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-6 sm:px-8 sm:py-10">
      <h1 className="font-display text-2xl font-semibold text-ink sm:text-3xl">Upload a track</h1>
      <p className="mt-1 text-sm text-ink-muted">Share a new song with everyone on Groove.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">Track title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
            placeholder="e.g. Midnight Drive"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-ink-muted">Audio file</label>
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border border-dashed border-surface-border bg-surface px-4 py-8 text-center transition-colors hover:border-amber/40">
            {file ? (
              <>
                <Music2 className="text-amber" size={24} />
                <span className="text-sm text-ink">{file.name}</span>
              </>
            ) : (
              <>
                <UploadCloud className="text-ink-faint" size={24} />
                <span className="text-sm text-ink-muted">Click to choose an audio file</span>
              </>
            )}
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}
        {success && <p className="text-xs text-teal">{success}</p>}

        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-amber py-2.5 text-sm font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {busy ? 'Uploading...' : 'Upload track'}
        </button>
      </form>
    </div>
  )
}
