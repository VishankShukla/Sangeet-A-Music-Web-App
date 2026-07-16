import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { usePlayer } from '../context/PlayerContext'

function formatTime(sec) {
  if (!sec || Number.isNaN(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function PlayerBar() {
  const { current, isPlaying, progress, duration, toggle, next, prev, seek } = usePlayer()

  if (!current) {
    return (
      <div className="flex h-16 shrink-0 items-center justify-center border-t border-surface-border bg-base-soft px-4 text-center text-xs text-ink-faint md:h-20">
        Pick a track to start listening
      </div>
    )
  }

  return (
    <div className="flex h-16 shrink-0 items-center gap-3 border-t border-surface-border bg-base-soft px-3 sm:gap-4 sm:px-5 md:h-20">
      <div
        className={`h-9 w-9 shrink-0 rounded-full border-2 border-surface bg-gradient-to-br from-amber to-amber-dim sm:h-12 sm:w-12 sm:border-4 ${
          isPlaying ? 'animate-vinyl' : ''
        }`}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div className="h-1.5 w-1.5 rounded-full bg-base sm:h-2 sm:w-2" />
        </div>
      </div>

      <div className="w-20 min-w-0 shrink sm:w-40">
        <p className="truncate text-sm font-medium text-ink">{current.title}</p>
        <p className="truncate text-xs text-ink-muted">
          {current.artist?.username || 'Unknown artist'}
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center gap-1.5">
        <div className="flex items-center gap-3 sm:gap-4">
          <button onClick={prev} className="text-ink-muted transition-colors hover:text-ink">
            <SkipBack size={16} fill="currentColor" className="sm:h-[18px] sm:w-[18px]" />
          </button>
          <button
            onClick={toggle}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber text-base transition-transform hover:scale-105 sm:h-9 sm:w-9"
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" className="sm:h-[18px] sm:w-[18px]" />
            ) : (
              <Play size={16} fill="currentColor" className="ml-0.5 sm:h-[18px] sm:w-[18px]" />
            )}
          </button>
          <button onClick={next} className="text-ink-muted transition-colors hover:text-ink">
            <SkipForward size={16} fill="currentColor" className="sm:h-[18px] sm:w-[18px]" />
          </button>
        </div>
        <div className="hidden w-full max-w-md items-center gap-2 font-mono text-[11px] text-ink-faint sm:flex">
          <span>{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={(e) => seek(Number(e.target.value))}
            className="flex-1"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="hidden w-40 md:block" />
    </div>
  )
}
