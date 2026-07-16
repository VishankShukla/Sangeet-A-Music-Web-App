import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loader from './Loader'

export default function ProtectedRoute({ children, artistOnly = false }) {
  const { user, loading } = useAuth()

  if (loading) return <Loader />
  if (!user) return <Navigate to="/login" replace />
  if (artistOnly && user.role !== 'artist') return <Navigate to="/" replace />

  return children
}
