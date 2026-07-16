import { NavLink, useNavigate } from 'react-router-dom'
import { Disc3, Home, Library, UploadCloud, ListMusic, LogOut, User, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

function NavItem({ to, icon: Icon, label, end, onNavigate }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-surface-hover text-ink'
            : 'text-ink-muted hover:bg-surface hover:text-ink'
        }`
      }
    >
      <Icon size={18} strokeWidth={1.75} />
      {label}
    </NavLink>
  )
}

export default function Sidebar({ mobileOpen = false, onClose = () => {} }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    onClose()
    navigate('/login')
  }

  return (
    <>
      {/* Backdrop, mobile only */}
      {mobileOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col justify-between border-r border-surface-border bg-base-soft px-3 py-5 transition-transform duration-200 ease-out
        md:static md:z-auto md:w-60 md:translate-x-0
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div>
          <div className="mb-8 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Disc3 className="text-amber" size={26} strokeWidth={1.5} />
              <span className="font-display text-xl font-semibold tracking-tight text-ink">Sangeet</span>
            </div>
            <button onClick={onClose} className="text-ink-muted hover:text-ink md:hidden" aria-label="Close menu">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            <NavItem to="/" icon={Home} label="Home" end onNavigate={onClose} />
            <NavItem to="/albums" icon={Library} label="Albums" onNavigate={onClose} />
            {user?.role === 'artist' && (
              <>
                <div className="my-3 h-px bg-surface-border" />
                <NavItem to="/upload" icon={UploadCloud} label="Upload track" onNavigate={onClose} />
                <NavItem to="/create-album" icon={ListMusic} label="Create album" onNavigate={onClose} />
              </>
            )}
          </nav>
        </div>

        {user && (
          <div className="rounded-lg border border-surface-border bg-surface p-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber/15 text-amber">
                <User size={16} />
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{user.username}</p>
                <p className="truncate text-xs capitalize text-ink-muted">{user.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-surface-border py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-amber/40 hover:text-amber"
            >
              <LogOut size={14} />
              Log out
            </button>
          </div>
        )}
      </aside>
    </>
  )
}

