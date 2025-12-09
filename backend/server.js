require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db')

const authRoutes = require('./routes/authRoutes')
const resumeRoutes = require('./routes/resumeRoutes')

const app = express();

// Middleware to handle CORS
const allowedOrigins = [
  process.env.CLIENT_URL,
  "http://localhost:3000",
  "http://localhost:5173",
  "https://resume-builder-81ji-gqh4sjmqc-shreya-das-projects-b9e37036.vercel.app"
].filter(Boolean);

app.use(
  cors({
    origin: function(origin, callback) {
      // In development or if no origin specified, allow all
      if (!origin || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      
      // In production, check against allowed origins
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Still allow the request but log it
        console.log('CORS request from origin:', origin);
        callback(null, true);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect Database
connectDB();

// Middleware
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Serve uploads folder
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
    },
  })
);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));