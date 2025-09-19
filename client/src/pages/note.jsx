import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NotePage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  // Add or Update a note
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingNote) {
        const response = await axios.put(
          `${import.meta.env.VITE_BASE_URL}/api/notes/${editingNote._id}`,
          { title, description },
          { withCredentials: true }
        );
        setNotes(
          notes.map((note) =>
            note._id === editingNote._id ? response.data.data : note
          )
        );
        setEditingNote(null);
      }  else {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/notes/create`,
          { title, description },
          { withCredentials: true }
        );
        setNotes([...notes, response.data.data]);
      }
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch notes
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/notes/fetch`, { withCredentials: true })
      .then((res) => setNotes(res.data.data))
      .catch((err) => console.error(err));
  }, []);

  // Start editing
  const startEditing = (note) => {
    setEditingNote(note);
    setTitle(note.title);
    setDescription(note.description);
  };

  // Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/notes/${id}`, {
        withCredentials: true,
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Logout
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/user/logout`, {
        withCredentials: true,
      });
      navigate("/user/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8">
      {/* Logout Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleLogout}
          className="bg-red-600 cursor-pointer   text-white py-2 px-4 rounded-lg hover:bg-red-700 transition w-full sm:w-auto"
        >
          Logout
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/20 backdrop-blur-lg shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-lg border border-white/30 mb-10"
      >
        <h1 className="text-2xl sm:text-3xl cursor-pointer font-bold text-center text-white mb-6">
          {editingNote ? "✏️ Edit Note" : "📝 Add a New Note"}
        </h1>

        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          required
        />

        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write your note..."
          rows="4"
          className="border border-gray-300 p-3 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          required
        ></textarea>

        <button
          type="submit"
          className="w-full sm:w-auto bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg shadow hover:bg-indigo-700 transition duration-300"
        >
          {editingNote ? "💾 Update Note" : "➕ Add Note"}
        </button>
      </form>

      {/* Notes */}
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
          📒 Your Notes
        </h2>

        {notes.length === 0 ? (
          <div className="text-center text-white/80">No notes yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((n) => (
              <div
                key={n._id}
                className="bg-white/30 backdrop-blur-lg p-4 sm:p-5 rounded-xl shadow-lg border border-white/20 hover:scale-105 transition-transform duration-300 relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                    {n.title}
                  </h3>
                  <div className="flex gap-2 sm:gap-3">
                    <button
                      onClick={() => startEditing(n)}
                      className="text-blue-700 cursor-pointer hover:text-blue-900 text-base sm:text-lg"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteNote(n._id)}
                      className="text-red-700 hover:text-red-900 cursor-pointer text-base sm:text-lg"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base">
                  {n.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
