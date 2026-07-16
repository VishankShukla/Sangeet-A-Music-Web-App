import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Try to restore session on load (cookie is httpOnly-less but still sent automatically)
    api
      .get('/api/auth/me')
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  async function register({ username, email, password, role }) {
    const res = await api.post('/api/auth/register', { username, email, password, role })
    setUser(res.data.user)
    return res.data.user
  }

  async function login({ identifier, password }) {
    // identifier can be username or email — backend accepts either field
    const isEmail = identifier.includes('@')
    const payload = isEmail
      ? { email: identifier, password }
      : { username: identifier, password }
    const res = await api.post('/api/auth/login', payload)
    setUser(res.data.user)
    return res.data.user
  }

  async function logout() {
    await api.post('/api/auth/logout')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
