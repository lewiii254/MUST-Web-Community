/**
 * Server.js - Main Application Entry Point
 * 
 * This is the heart of our application. It does the following:
 * 1. Loads environment variables
 * 2. Creates an Express application
 * 3. Connects to MongoDB database
 * 4. Sets up middleware
 * 5. Defines routes
 * 6. Handles errors
 * 7. Starts the server
 * 
 * Think of this file as the conductor of an orchestra - it brings
 * all the different parts together to create a working application.
 */

// ============================================
// 1. IMPORT REQUIRED PACKAGES
// ============================================

/**
 * dotenv - Loads environment variables from .env file
 * This allows us to keep sensitive information (like database URLs)
 * separate from our code
 */
require('dotenv').config();

/**
 * express - Web framework for Node.js
 * Makes it easy to build web applications and APIs
 */
const express = require('express');

/**
 * cors - Cross-Origin Resource Sharing
 * Allows our API to be accessed from different domains
 * (Important when your frontend is on a different URL than your backend)
 */
const cors = require('cors');

/**
 * Import database connection function
 */
const connectDB = require('./config/database');

/**
 * Import our routes
 */
const notesRoutes = require('./routes/notes');

// ============================================
// 2. INITIALIZE EXPRESS APP
// ============================================

/**
 * Create an Express application
 * This 'app' object has methods for routing, middleware, and more
 */
const app = express();

// ============================================
// 3. CONNECT TO DATABASE
// ============================================

/**
 * Call the connectDB function to establish connection to MongoDB
 * This is an async operation, so it runs in the background
 */
connectDB();

// ============================================
// 4. MIDDLEWARE SETUP
// ============================================

/**
 * What is Middleware?
 * Middleware functions are functions that have access to the request (req),
 * response (res), and the next middleware function in the application's
 * request-response cycle.
 * 
 * They can:
 * - Execute any code
 * - Make changes to the request and response objects
 * - End the request-response cycle
 * - Call the next middleware function
 */

/**
 * CORS Middleware
 * Enables Cross-Origin Resource Sharing
 * This allows your frontend (React app) to communicate with your backend
 */
app.use(cors());

/**
 * JSON Body Parser Middleware
 * This middleware parses incoming requests with JSON payloads
 * Without this, we wouldn't be able to read req.body in our routes
 */
app.use(express.json());

/**
 * URL Encoded Middleware
 * Parses incoming requests with URL-encoded payloads
 * (form data)
 */
app.use(express.urlencoded({ extended: true }));

/**
 * Custom Logger Middleware (for learning/debugging)
 * This logs every request that comes to our server
 * Helpful for debugging and understanding the request flow
 */
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next(); // Pass control to the next middleware
});

// ============================================
// 5. ROUTES
// ============================================

/**
 * Root Route
 * When someone visits http://localhost:5000/
 * they'll see this welcome message
 */
app.get('/', (req, res) => {
  res.json({
    message: '📝 Welcome to Notes API',
    version: '1.0.0',
    endpoints: {
      getAllNotes: 'GET /api/notes',
      getNote: 'GET /api/notes/:id',
      createNote: 'POST /api/notes',
      updateNote: 'PUT /api/notes/:id',
      deleteNote: 'DELETE /api/notes/:id'
    },
    documentation: 'See README.md for detailed documentation'
  });
});

/**
 * Mount Notes Routes
 * All routes defined in routes/notes.js will be prefixed with /api/notes
 * 
 * For example:
 * - GET /api/notes (handled by notesRoutes)
 * - POST /api/notes (handled by notesRoutes)
 * - etc.
 */
app.use('/api/notes', notesRoutes);

/**
 * Health Check Route
 * Useful for monitoring if the server is running
 * Often used by deployment platforms and monitoring services
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// ============================================
// 6. ERROR HANDLING
// ============================================

/**
 * 404 Handler - Route Not Found
 * This middleware runs when no other route matches
 * It should be placed after all other routes
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.path} not found`
  });
});

/**
 * Global Error Handler
 * This catches any errors that occur in our routes
 * It's a "safety net" for unhandled errors
 * 
 * Note: Error handling middleware must have 4 parameters (err, req, res, next)
 */
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.stack);
  
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error',
    // Only show stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// ============================================
// 7. START SERVER
// ============================================

/**
 * Define the port number
 * Use the PORT from environment variables, or default to 5000
 */
const PORT = process.env.PORT || 5000;

/**
 * Start the server
 * app.listen() starts a server and listens for connections on the specified port
 */
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation: http://localhost:${PORT}/`);
  console.log(`💚 Health Check: http://localhost:${PORT}/health`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('='.repeat(50));
});

/**
 * Handle Unhandled Promise Rejections
 * This catches any promise rejections that we didn't handle
 */
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  // In production, you might want to exit the process
  // process.exit(1);
});

/**
 * Handle Uncaught Exceptions
 * This catches any synchronous errors we didn't handle
 */
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  // Exit the process as the application is in an undefined state
  process.exit(1);
});
