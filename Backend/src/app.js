const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const musicRoutes = require("./routes/music.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing");
}

// Allow the Vite dev server (frontend) to send cookies cross-origin
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    process.env.FRONTEND_URL || "https://sangeet-a-music-web.onrender.com",
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);

module.exports = app;
