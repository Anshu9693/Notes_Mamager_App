const express = require("express");
const router = express.Router();
const { createNote, fetchNotes, updateNote, deleteNote } = require("../controllers/notes.controller");
const userAuth = require("../middlewares/user.auth.middleware");

router.post("/create", userAuth, createNote);
router.get("/fetch", userAuth, fetchNotes);
router.put("/:id", userAuth, updateNote);
router.delete("/:id", userAuth, deleteNote);

module.exports = router;
