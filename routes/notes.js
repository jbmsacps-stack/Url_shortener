const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes — fetch all notes
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // Newest first
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notes' });
  }
});

// POST /api/notes — create a new note
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;

    // Create a new note document and save it to MongoDB
    const newNote = new Note({ title, content });
    const savedNote = await newNote.save();

    res.status(201).json(savedNote);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create note' });
  }
});

// DELETE /api/notes/:id — delete a note by its ID
router.delete('/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete note' });
  }
});

module.exports = router;