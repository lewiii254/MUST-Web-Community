/**
 * Note Model
 * 
 * This file defines the structure (schema) of a Note document in MongoDB.
 * Think of a schema as a blueprint that tells MongoDB what fields
 * each note should have and what type of data each field can store.
 * 
 * What is a Model?
 * A model is a class that we use to construct documents. Each document
 * will be a note with properties and behaviors as defined in our schema.
 */

// Import mongoose library
const mongoose = require('mongoose');

/**
 * Define the Note Schema
 * 
 * A schema defines the structure of documents within a collection.
 * Each key in the schema defines a property in our documents.
 */
const noteSchema = new mongoose.Schema(
  {
    /**
     * Title field
     * - type: String - This field will store text
     * - required: true - This field must be provided
     * - trim: true - Removes whitespace from beginning and end
     * - maxlength: 100 - Maximum 100 characters allowed
     */
    title: {
      type: String,
      required: [true, 'Please add a title for the note'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },

    /**
     * Content field
     * - type: String - This field will store text
     * - required: true - This field must be provided
     * - maxlength: 5000 - Maximum 5000 characters allowed
     */
    content: {
      type: String,
      required: [true, 'Please add content for the note'],
      maxlength: [5000, 'Content cannot be more than 5000 characters']
    },

    /**
     * Category field
     * - type: String - This field will store text
     * - default: 'General' - If not provided, defaults to 'General'
     * - trim: true - Removes whitespace from beginning and end
     */
    category: {
      type: String,
      default: 'General',
      trim: true
    }
  },
  {
    /**
     * Timestamps option
     * When set to true, Mongoose automatically adds two fields:
     * - createdAt: Timestamp of when document was created
     * - updatedAt: Timestamp of when document was last modified
     */
    timestamps: true
  }
);

/**
 * Create and export the Note model
 * 
 * mongoose.model() creates a model from the schema.
 * The first argument 'Note' is the name of the collection (will be 'notes' in MongoDB)
 * The second argument is the schema we defined above
 * 
 * This model will be imported in our routes to:
 * - Create new notes
 * - Find notes
 * - Update notes
 * - Delete notes
 */
module.exports = mongoose.model('Note', noteSchema);
