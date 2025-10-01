/**
 * Database Configuration File
 * 
 * This file contains the logic to connect our application to MongoDB.
 * We use Mongoose, which is an ODM (Object Data Modeling) library for MongoDB.
 * 
 * What does this file do?
 * 1. Imports the mongoose library
 * 2. Exports a function that establishes connection to MongoDB
 * 3. Handles connection errors
 * 4. Logs success message when connected
 */

// Import mongoose library
const mongoose = require('mongoose');

/**
 * Connect to MongoDB Database
 * 
 * This is an asynchronous function that connects to MongoDB.
 * We use async/await to handle the asynchronous operation.
 * 
 * @returns {Promise} - Returns a promise that resolves when connected
 */
const connectDB = async () => {
  try {
    // Mongoose connection options
    const options = {
      // These options help with deprecation warnings
      // and improve connection stability
    };

    // Connect to MongoDB using the connection string from environment variables
    // process.env.MONGODB_URI contains our database URL from .env file
    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    // If connection is successful, log the host we're connected to
    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    
  } catch (error) {
    // If connection fails, log the error
    console.error('❌ MongoDB Connection Error:', error.message);
    
    // Exit the process with failure code
    // In production, you might want to handle this differently
    process.exit(1);
  }
};

// Export the connectDB function so we can use it in server.js
module.exports = connectDB;
