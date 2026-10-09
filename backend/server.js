const express = require("express");
const cors = require("cors");
const summarizeNote = require("./summarizer");

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

  if (typeof content !== "string" || !content.trim()) {
    return res.status(400).json({
      error: "Note content is required."
    });
  }

  const note = {
    id: Date.now(),
    title: typeof title === "string" && title.trim()
      ? title.trim()
      : "Untitled Note",
    content: content.trim()
  };

  notes.push(note);

  res.status(201).json(note);
});

// Summarize a saved note
app.post("/notes/:id/summarize", (req, res) => {
  const noteId = Number(req.params.id);

  const note = notes.find((item) => item.id === noteId);

  if (!note) {
    return res.status(404).json({
      error: "Note not found."
    });
  }

  const summary = summarizeNote(note.content);

  res.json({ summary });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});