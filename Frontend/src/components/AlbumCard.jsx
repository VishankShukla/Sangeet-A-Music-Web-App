import { Link } from 'react-router-dom'
import { Disc3 } from 'lucide-react'

export default function AlbumCard({ album }) {
  return (
    <Link
      to={`/albums/${album._id}`}
      className="group rounded-xl border border-surface-border bg-surface p-4 transition-colors hover:border-amber/30 hover:bg-surface-hover"
    >
      <div className="mb-3 flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br from-surface-hover to-base-soft text-ink-faint">
        <Disc3 size={40} strokeWidth={1} className="transition-transform group-hover:rotate-45" />
      </div>
      <p className="truncate font-display text-base font-medium text-ink">{album.title}</p>
      <p className="truncate text-xs text-ink-muted">{album.artist?.username || 'Unknown artist'}</p>
    </Link>
  )
}
