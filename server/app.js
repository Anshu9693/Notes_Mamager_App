const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db");

const noteRoutes = require("./Routes/note.route");
const userRoutes = require("./Routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userAuth = require("./middlewares/user.auth.middleware");

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working fine!");
});

app.use("/api/notes", userAuth, noteRoutes);
app.use("/api/auth/user", userRoutes);

module.exports = app;
