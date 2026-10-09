const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Temporary storage for notes
const notes = [];

// Check whether the server is running
app.get("/", (req, res) => {
  res.send("Smart Notes with AI backend is running!");
});

// Get all notes
app.get("/notes", (req, res) => {
  res.json(notes);
});

// Save a note
app.post("/notes", (req, res) => {
  const { title, content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      error: "Note content is required."
    });
  }

  const note = {
    id: Date.now(),
    title: title || "Untitled Note",
    content
  };

  notes.push(note);

  res.status(201).json(note);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});