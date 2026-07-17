const jwt = require("jsonwebtoken");

function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.role !== "artist") {
      return res.status(403).json({ message: "You Don't Have Access" });
    }

    req.user = decode;

    next();
  } catch (err) {
    return res.status(401).json({ message: "You Don't Have Access" });
  }
}

function authBothUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (decode.role !== "user" && decode.role !== "artist") {
      return res.status(403).json({ message: "You Don't Have Access" });
    }

    req.user = decode;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { authArtist, authBothUser };
