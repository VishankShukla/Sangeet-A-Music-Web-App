# 🎵 Sangeet — Spotify Clone

A full-stack music streaming app built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS. Users can sign up as a **listener** or an **artist** — artists can upload tracks and organize them into albums, and everyone can browse and play music.

---

## ✨ Features

- **Authentication** — Register/login with role selection (`user` or `artist`), JWT stored in an HTTP cookie, session persists across page refresh
- **Browse & play** — View all uploaded tracks, play/pause, skip next/previous, seek — powered by a persistent bottom player bar
- **Albums** — Browse albums, view album details with their tracks
- **Artist tools** — Upload audio tracks (stored via ImageKit) and group tracks into albums
- **Responsive UI** — Custom dark "vinyl lounge" theme (Fraunces + Inter fonts, amber/teal accents), works on both desktop and mobile with a slide-in navigation drawer

---

## 🛠️ Tech Stack

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication, `cookie-parser` for session cookies
- Multer (in-memory storage) + ImageKit for audio file uploads
- bcrypt for password hashing

**Frontend**
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- lucide-react icons

---

## 📁 Project Structure

```
.
├── Backend/
│   ├── server.js                # Entry point
│   ├── src/
│   │   ├── app.js               # Express app, middleware, CORS
│   │   ├── db/db.js             # MongoDB connection
│   │   ├── models/              # user, music, album schemas
│   │   ├── controllers/         # auth & music logic
│   │   ├── routes/              # auth & music routes
│   │   ├── middlewares/         # auth guards (user / artist)
│   │   └── services/            # ImageKit upload service
│   └── .env
│
└── Frontend/
    ├── src/
    │   ├── api/axios.js         # Axios instance (backend base URL)
    │   ├── context/             # AuthContext, PlayerContext
    │   ├── components/          # Sidebar, PlayerBar, MusicRow, AlbumCard...
    │   ├── pages/                # Login, Register, Home, Albums, Upload, CreateAlbum
    │   └── App.jsx
    ├── tailwind.config.js
    └── index.html
```

---

## 🔌 API Reference

Base URL: `http://localhost:3000` (or your deployed backend URL)

### Auth — `/api/auth`

| Method | Route        | Auth required | Description                          |
|--------|--------------|---------------|---------------------------------------|
| POST   | `/register`  | No            | Create account (`username`, `email`, `password`, `role`) |
| POST   | `/login`     | No            | Login with `username` **or** `email` + `password` |
| POST   | `/logout`    | Yes           | Clear the session cookie              |
| GET    | `/me`        | Yes           | Get the currently logged-in user      |

### Music — `/api/music`

| Method | Route              | Auth required       | Description                              |
|--------|--------------------|----------------------|-------------------------------------------|
| GET    | `/`                | Any logged-in user   | List all tracks                          |
| GET    | `/albums`          | Any logged-in user   | List all albums                          |
| GET    | `/albums/:albumID` | Any logged-in user   | Get one album with its populated tracks  |
| POST   | `/upload`          | Artist only          | Upload a track — `multipart/form-data` with `title` and `music` (file) |
| POST   | `/album`           | Artist only          | Create an album — `{ title, musics: [trackId, ...] }` |

### Data Models

- **User**: `username`, `email`, `password` (hashed), `role` (`user` | `artist`)
- **Music**: `uri` (ImageKit URL), `title`, `artist` (ref → User)
- **Album**: `title`, `musics` (ref[] → Music), `artist` (ref → User)

---

## 🚀 Local Setup

### Prerequisites
- Node.js (v18+)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- An [ImageKit](https://imagekit.io/) account (for audio file storage)

### 1. Clone the repo
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Backend
```bash
cd Backend
npm install
```

Create a `.env` file in `Backend/`:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

Run it:
```bash
node server.js
```
You should see `Server Running On Port 3000` and `Database Connected Successfully`.

### 3. Frontend
```bash
cd Frontend
npm install
npm run dev
```
Open `http://localhost:5173`.

> If your backend runs on a different URL, update `BASE_URL` in `Frontend/src/api/axios.js`.

### 4. Try it out
1. Register a new account with role **Artist**
2. Go to **Upload track** in the sidebar → add an audio file + title
3. Go to **Create album** → select the uploaded track(s) → create the album
4. Go to **Home** or **Albums** and play your track

---

## 📄 License

Personal / educational project — feel free to fork and build on it.
