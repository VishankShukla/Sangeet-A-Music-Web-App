# Spotify Clone — Frontend Setup

## Kya banaya
`Frontend/` folder mein ek pura React (Vite) + Tailwind app hai jo tumhare Express backend se seedha baat karta hai:

- **Auth**: Login / Register (role: listener ya artist), cookie-based session, refresh pe bhi login bana rehta hai (`/api/auth/me`).
- **Home**: saare tracks ki list, click karke play/pause, "Play all".
- **Albums**: album grid → album detail page (uske tracks ke saath).
- **Upload track** (sirf artist ke liye): title + audio file → ImageKit ke through upload.
- **Create album** (sirf artist ke liye): title + checklist se tracks select karke album banao.
- **Persistent bottom player bar**: vinyl-spin animation, seek bar, next/prev.
- Design: warm dark "vinyl lounge" theme — Fraunces (headings) + Inter (body), amber/teal accents — Tailwind se fully custom, koi default Spotify-green copy nahi kiya.

## Backend mein maine 2 chhote fix/add kiye
1. **CORS middleware** (`Backend/src/app.js`) — bina iske frontend (port 5173) se cookie wali request backend (port 3000) tak nahi pahochti.
2. **`GET /api/auth/me`** route + controller — taaki page refresh pe user login se logout na ho jaye.
3. Ek chhota bug fix bhi kiya: `registerUser` mein "User Already Exists" case ke baad `return` missing tha (isse header-already-sent error aata).

Baaki tumhara pura backend logic bilkul waisa hi hai jaisa tumne likha tha.

## Chalane ka tarika

**1. Backend** (port 3000):
```bash
cd Backend
npm install
npm run dev   # ya: node server.js
```
Apna `.env` check kar lena — `MONGO_URI`, `JWT_SECRET`, `IMAGEKIT_PRIVATE_KEY` already the.

**2. Frontend** (port 5173):
```bash
cd Frontend
npm install
npm run dev
```
Browser mein `http://localhost:5173` khol lena.

Agar backend kisi aur port/URL pe chalao, to `Frontend/src/api/axios.js` mein `BASE_URL` badal dena.

## Test karne ka flow
1. Register karo role = **Artist**.
2. Sidebar se "Upload track" — koi bhi mp3/audio file + title daal ke upload karo.
3. "Create album" se us track ko album mein daal do.
4. "Home" ya "Albums" pe jaake play karo — bottom player bar mein vinyl ghoomega 🎵.
