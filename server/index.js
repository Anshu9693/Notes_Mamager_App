const express = require("express");
const app = express();
const userAuth = require("./middlewares/user.auth.middleware");
require("dotenv").config();
require("./config/db");
const noteRoutes = require("./Routes/note.route");
const bodyParser = require("body-parser");
const UserRouter = require("./Routes/user.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cookieParser());
app.use(cors({ origin: 'https://notes-mamager-app-nde9.vercel.app', credentials: true }));

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello server is  working");
});

app.use(express.json());
app.use("/api/notes", userAuth, noteRoutes);
app.use("/api/auth/user", UserRouter);




app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
