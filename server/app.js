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
const FRONTEND = process.env.FRONTEND_URL || "http://localhost:5173";
app.use(cookieParser());
app.use(cors({ origin: FRONTEND, credentials: true }));

app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello server is working");
});

app.use("/api/notes", userAuth, noteRoutes);
app.use("/api/auth/user", UserRouter);

module.exports = app;
