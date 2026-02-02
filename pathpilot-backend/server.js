const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();

/* =====================
   MIDDLEWARES
===================== */

// parse JSON body
app.use(express.json());

// cookies
app.use(cookieParser());

// CORS (for refresh token cookie)
app.use(cors({
  origin: true,
  credentials: true,
}));

/* =====================
   ROUTES
===================== */

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// app.use('/api/user', require('./routes/userRoutes'));

// test route
app.get("/", (req, res) => {
  res.send("PathPilot Backend Running");
});
app.post("/api/auth/test", (req, res) => {
  res.json({ message: "Auth test route works" });
});


/* =====================
   SERVER START
===================== */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
