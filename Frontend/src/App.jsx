import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Menu, Disc3 } from 'lucide-react'
import Sidebar from './components/Sidebar'
import PlayerBar from './components/PlayerBar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Albums from './pages/Albums'
import AlbumDetail from './pages/AlbumDetail'
import Upload from './pages/Upload'
import CreateAlbum from './pages/CreateAlbum'

function AppLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex h-[100dvh] flex-col">
      {/* Mobile-only top bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-surface-border bg-base-soft px-4 py-3 md:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="text-ink-muted hover:text-ink"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <Disc3 className="text-amber" size={20} strokeWidth={1.5} />
        <span className="font-display text-lg font-semibold text-ink">Sangeet</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
      <PlayerBar />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Home />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/albums"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Albums />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/albums/:albumID"
        element={
          <ProtectedRoute>
            <AppLayout>
              <AlbumDetail />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute artistOnly>
            <AppLayout>
              <Upload />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-album"
        element={
          <ProtectedRoute artistOnly>
            <AppLayout>
              <CreateAlbum />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
