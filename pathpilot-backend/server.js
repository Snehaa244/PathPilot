const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000', // frontend
  credentials: true,
}));


const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

