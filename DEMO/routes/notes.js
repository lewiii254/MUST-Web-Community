/**
 * Notes Routes
 * 
 * This file contains all the route handlers for our Notes API.
 * Routes define the endpoints (URLs) that clients can access
 * and specify what happens when those endpoints are accessed.
 * 
 * We implement all CRUD operations here:
 * - CREATE: POST /api/notes
 * - READ: GET /api/notes (all notes) and GET /api/notes/:id (single note)
 * - UPDATE: PUT /api/notes/:id
 * - DELETE: DELETE /api/notes/:id
 */

// Import Express and create a router
const express = require('express');
const router = express.Router();

// Import the Note model to interact with the database
const Note = require('../models/Note');

/**
 * @route   GET /api/notes
 * @desc    Get all notes from the database
 * @access  Public
 * 
 * This route retrieves all notes from the database.
 * We use async/await because database operations are asynchronous.
 */
router.get('/', async (req, res) => {
  try {
    // Find all notes in the database
    // sort({ createdAt: -1 }) means sort by creation date, newest first
    const notes = await Note.find().sort({ createdAt: -1 });

    // Send successful response with the notes
    // 200 is the HTTP status code for "OK"
    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });

  } catch (error) {
    // If something goes wrong, send error response
    // 500 is the HTTP status code for "Internal Server Error"
    console.error('Error fetching notes:', error);
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not fetch notes'
    });
  }
});

/**
 * @route   GET /api/notes/:id
 * @desc    Get a single note by ID
 * @access  Public
 * 
 * This route retrieves one specific note using its unique ID.
 * The :id in the route is a parameter that we can access via req.params.id
 */
router.get('/:id', async (req, res) => {
  try {
    // req.params.id contains the note ID from the URL
    const note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      // 404 is the HTTP status code for "Not Found"
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Send successful response with the note
    res.status(200).json({
      success: true,
      data: note
    });

  } catch (error) {
    // Handle different types of errors
    console.error('Error fetching note:', error);

    // If the ID format is invalid
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid note ID format'
      });
    }

    // General server error
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not fetch note'
    });
  }
});

/**
 * @route   POST /api/notes
 * @desc    Create a new note
 * @access  Public
 * 
 * This route creates a new note in the database.
 * The note data comes from req.body (the request body).
 * Express middleware (express.json()) parses the JSON for us.
 */
router.post('/', async (req, res) => {
  try {
    // Validate request body
    const { title, content, category } = req.body;

    // Check if required fields are provided
    if (!title || !content) {
      // 400 is the HTTP status code for "Bad Request"
      return res.status(400).json({
        success: false,
        error: 'Please provide both title and content'
      });
    }

    // Create a new note using the Note model
    // This doesn't save to database yet, just creates an instance
    const note = await Note.create({
      title,
      content,
      category: category || 'General' // Use provided category or default to 'General'
    });

    // Send successful response with the created note
    // 201 is the HTTP status code for "Created"
    res.status(201).json({
      success: true,
      data: note
    });

  } catch (error) {
    console.error('Error creating note:', error);

    // If validation fails (e.g., title too long)
    if (error.name === 'ValidationError') {
      // Extract error messages from Mongoose validation error
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    // General server error
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not create note'
    });
  }
});

/**
 * @route   PUT /api/notes/:id
 * @desc    Update a note
 * @access  Public
 * 
 * This route updates an existing note.
 * We find the note by ID and update it with new data from req.body
 */
router.put('/:id', async (req, res) => {
  try {
    // Extract data from request body
    const { title, content, category } = req.body;

    // Check if at least one field is provided for update
    if (!title && !content && !category) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least one field to update'
      });
    }

    // Build update object with only provided fields
    const updateData = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (category) updateData.category = category;

    // Find note by ID and update it
    // { new: true } returns the updated document instead of the old one
    // { runValidators: true } runs schema validation on the update
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Send successful response with updated note
    res.status(200).json({
      success: true,
      data: note
    });

  } catch (error) {
    console.error('Error updating note:', error);

    // If the ID format is invalid
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid note ID format'
      });
    }

    // If validation fails
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    // General server error
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not update note'
    });
  }
});

/**
 * @route   DELETE /api/notes/:id
 * @desc    Delete a note
 * @access  Public
 * 
 * This route removes a note from the database permanently.
 */
router.delete('/:id', async (req, res) => {
  try {
    // Find note by ID and delete it
    const note = await Note.findByIdAndDelete(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Send successful response
    res.status(200).json({
      success: true,
      message: 'Note deleted successfully',
      data: {} // Empty object as the note is deleted
    });

  } catch (error) {
    console.error('Error deleting note:', error);

    // If the ID format is invalid
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid note ID format'
      });
    }

    // General server error
    res.status(500).json({
      success: false,
      error: 'Server Error: Could not delete note'
    });
  }
});

/**
 * Export the router
 * This router will be imported in server.js and mounted at /api/notes
 */
module.exports = router;
