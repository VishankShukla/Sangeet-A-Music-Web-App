import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Disc3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await login({ identifier, password })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Disc3 className="text-amber" size={36} strokeWidth={1.5} />
          <h1 className="font-display text-2xl font-semibold text-ink">Welcome back</h1>
          <p className="text-sm text-ink-muted">Log in to keep listening</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">Username or email</label>
            <input
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 rounded-lg bg-amber py-2.5 text-sm font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          New here?{' '}
          <Link to="/register" className="font-medium text-teal hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}
