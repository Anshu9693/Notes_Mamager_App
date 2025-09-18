const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");
const noteRoutes = require("./Routes/note.route");
const bodyParser = require("body-parser");
const UserRouter = require("./Routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userAuth = require("./middlewares/user.auth.middleware");

// Configure CORS to allow frontend origin (set FRONTEND_URL in Vercel or .env)

const allowedOrigins = [
  "http://localhost:5173",
  "https://notes-mamager-app-nde9.vercel.app"
];
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello server is working");
});

app.use("/api/notes", userAuth, noteRoutes);
app.use("/api/auth/user", UserRouter);

module.exports = app;
