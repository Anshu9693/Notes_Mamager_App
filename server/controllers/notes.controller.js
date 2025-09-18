const NoteModel = require("../models/notes.model");

const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;
    const note = await NoteModel.create({ title, description, user: userId });
    res.status(201).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create note" });
  }
};

const fetchNotes = async (req, res) => {
  try {
    const notes = await NoteModel.find({ user: req.user.id });
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch notes" });
  }
};


const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const updatedNote = await NoteModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true }
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Note updated", success: true, data: updatedNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Failed to update: ${error.message}`, success: false });
  }
};
const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const data = await NoteModel.findByIdAndDelete(id);
      return res
        .status(201)
        .json({ message: "Note deleted", success: true, data });
    }
    res.status(400).json({ message: "Note id is required", success: false });
  } catch (error) {
    res.status(500).json({ message: "Failed to getting Note", success: false });
  }
};

module.exports = {
  createNote,
  fetchNotes,
  updateNote,
  deleteNote,
};
