const jwt = require("jsonwebtoken");
const User = require("../models/User");

// secrets (best practice: .env me rakho)
const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

/* ======================
   TOKEN GENERATORS
====================== */
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

/* ======================
   SIGNUP
====================== */
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    await User.create({ email, password });

    res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    console.error("SIGNUP ERROR 👉", err);

    // 🔥 DUPLICATE KEY ERROR HANDLE
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    res.status(500).json({
      message: "Signup failed",
      error: err.message,
    });
  }
};


/* ======================
   LOGIN
====================== */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

   const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // refresh token DB me save
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
};

/* ======================
   REFRESH TOKEN
====================== */
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ message: "Refresh token required" });

  try {
    const payload = jwt.verify(refreshToken, REFRESH_SECRET);

    const user = await User.findById(payload.id);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(user._id);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};
