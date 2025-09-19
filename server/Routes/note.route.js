const express = require("express");
const router = express.Router();
const { createNote, fetchNotes, updateNote, deleteNote } = require("../controllers/notes.controller");
// const userAuth = require("../middlewares/user.auth.middleware");

router.post("/create",  createNote);
router.get("/fetch", fetchNotes);
router.put("/:id",  updateNote);
router.delete("/:id", deleteNote);

module.exports = router;
