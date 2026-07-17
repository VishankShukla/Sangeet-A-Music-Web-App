const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { role = "user" } = req.body;
    const password = req.body.password?.trim();
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if (role !== "user" && role !== "artist") {
      return res.status(400).json({
        message: "Select Correct Role",
      });
    }

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User Already Exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role,
    });

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User Created Successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function loginUser(req, res) {
  try {
    const password = req.body.password?.trim();
    const username = req.body.username?.trim();
    const email = req.body.email?.trim().toLowerCase();

    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Username/Email and password are required",
      });
    }

    const user = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid Login Credentials",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid Login Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Login Successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({
    message: "User Logout Successfully",
  });
}

async function getCurrentUser(req, res) {
  if (!req.user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const user = await userModel
      .findById(req.user.id)
      .select("username email role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Current user fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
