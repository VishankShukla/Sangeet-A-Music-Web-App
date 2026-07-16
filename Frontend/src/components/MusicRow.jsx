import { Play, Pause } from 'lucide-react'
import { usePlayer } from '../context/PlayerContext'

export default function MusicRow({ track, index, list }) {
  const { current, isPlaying, playTrack, toggle } = usePlayer()
  const isCurrent = current?._id === track._id

  function handleClick() {
    if (isCurrent) {
      toggle()
    } else {
      playTrack(track, list)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`group flex w-full items-center gap-4 rounded-lg px-3 py-2.5 text-left transition-colors ${
        isCurrent ? 'bg-surface-hover' : 'hover:bg-surface'
      }`}
    >
      <div className="flex w-6 shrink-0 items-center justify-center text-sm text-ink-faint">
        {isCurrent && isPlaying ? (
          <div className="flex items-end gap-0.5 h-3">
            <span className="w-0.5 animate-pulse bg-amber" style={{ height: '60%' }} />
            <span className="w-0.5 animate-pulse bg-amber" style={{ height: '100%', animationDelay: '150ms' }} />
            <span className="w-0.5 animate-pulse bg-amber" style={{ height: '40%', animationDelay: '300ms' }} />
          </div>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <Play size={14} className="hidden group-hover:block" fill="currentColor" />
          </>
        )}
      </div>

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-surface-hover to-surface text-ink-faint">
        {isCurrent && isPlaying ? <Pause size={16} className="text-amber" /> : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${isCurrent ? 'text-amber' : 'text-ink'}`}>
          {track.title}
        </p>
        <p className="truncate text-xs text-ink-muted">{track.artist?.username || 'Unknown artist'}</p>
      </div>
    </button>
  )
}
