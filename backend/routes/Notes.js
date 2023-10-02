const express = require("express");
const router = express.Router();
const userFetch = require("../middleware/userFetch");
const Note = require("../models/Notes");
const { query, body, validationResult } = require("express-validator");

// Get User Notes
router.get("/fetchNotes", userFetch, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// create notes
router.post(
  "/addNote",
  userFetch,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter something").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: "Please enter the correct details" });
      }
      const note = new Note({
        title,
        description,
        user: req.user.id,
      });
      const saveNote = await note.save();

      res.json(saveNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//update notes
router.put(
  "/editNote/:id",
  userFetch,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter something").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }

      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(400).send("Not found");
      }

      if (note.user.toString() !== req.user.id)
        return res.status(401).send("Unauthorized");

      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
      console.log("note updated");
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//delete a note
router.delete(
  "/deleteNote/:id",
  userFetch,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter something").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description } = req.body;

      //find the note an delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(400).send("Not found");
      }

      //allow deletion if user owns the note
      if (note.user.toString() !== req.user.id)
        return res.status(401).send("Unauthorized");

      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ success: "note has been deleted" });
      console.log("note deleted");
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;