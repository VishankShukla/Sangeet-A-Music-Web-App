import axios from 'axios'

// Change this if your backend runs on a different host/port
export const BASE_URL = 'https://sangeet-ixdy.onrender.com'

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // sends the JWT cookie set by the backend
})

export default api
