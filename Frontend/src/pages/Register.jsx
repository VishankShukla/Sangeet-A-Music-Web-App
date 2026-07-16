import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Disc3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', email: '', password: '', role: 'user' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      await register(form)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2">
          <Disc3 className="text-amber" size={36} strokeWidth={1.5} />
          <h1 className="font-display text-2xl font-semibold text-ink">Join Groove</h1>
          <p className="text-sm text-ink-muted">Listen freely, or share your own tracks</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">Username</label>
            <input
              value={form.username}
              onChange={(e) => update('username', e.target.value)}
              required
              className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
              placeholder="yourname"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              required
              className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
              placeholder="you@example.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update('password', e.target.value)}
              required
              className="rounded-lg border border-surface-border bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-amber/50"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted">I am a</label>
            <div className="grid grid-cols-2 gap-2">
              {['user', 'artist'].map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => update('role', role)}
                  className={`rounded-lg border py-2 text-sm font-medium capitalize transition-colors ${
                    form.role === role
                      ? 'border-amber/50 bg-amber/10 text-amber'
                      : 'border-surface-border text-ink-muted hover:text-ink'
                  }`}
                >
                  {role === 'user' ? 'Listener' : 'Artist'}
                </button>
              ))}
            </div>
          </div>

          {error && <p className="text-xs text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="mt-2 rounded-lg bg-amber py-2.5 text-sm font-semibold text-base transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-teal hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
