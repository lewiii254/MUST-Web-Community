# 📝 Notes App - MERN Stack CRUD Demo

Welcome to the **Notes App** demo project! This is a simple, beginner-friendly application designed to teach you the fundamentals of building a full-stack application using **MongoDB, Express.js, and Node.js**.

---

## 🎯 What You'll Learn

By working through this project, you will learn:

✅ **MongoDB**: How to design schemas and perform database operations  
✅ **Express.js**: How to build RESTful API endpoints  
✅ **Node.js**: How to run JavaScript on the server side  
✅ **CRUD Operations**: Create, Read, Update, Delete data  
✅ **Error Handling**: How to handle errors gracefully  
✅ **Environment Variables**: How to secure sensitive information  
✅ **API Testing**: How to test your endpoints using tools like Postman or Thunder Client

---

## 🚀 Project Overview

This is a **Notes Application** where users can:

- ✏️ **Create** new notes
- 📖 **Read** all notes or a specific note
- ✍️ **Update** existing notes
- 🗑️ **Delete** notes

The app uses:
- **MongoDB** for data storage
- **Express.js** for routing and handling HTTP requests
- **Node.js** as the runtime environment
- **Mongoose** for MongoDB object modeling

---

## 📁 Project Structure

```
DEMO/
├── config/
│   └── database.js       # MongoDB connection configuration
├── models/
│   └── Note.js           # Note schema/model definition
├── routes/
│   └── notes.js          # All CRUD routes for notes
├── .env.example          # Example environment variables
├── .gitignore            # Files to ignore in git
├── server.js             # Main application entry point
├── package.json          # Project dependencies and scripts
└── README.md             # This file (project documentation)
```

---

## 🛠️ Prerequisites

Before you start, make sure you have installed:

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **MongoDB** - Choose one:
   - **Option A**: [MongoDB Community Server](https://www.mongodb.com/try/download/community) (local installation)
   - **Option B**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud database)
3. **Code Editor** - [VS Code](https://code.visualstudio.com/) recommended
4. **API Testing Tool** - [Postman](https://www.postman.com/downloads/) or [Thunder Client](https://www.thunderclient.com/) VS Code extension

---

## 📦 Installation & Setup

### **Step 1: Navigate to the DEMO folder**

```bash
cd DEMO
```

### **Step 2: Install dependencies**

```bash
npm install
```

This will install all required packages:
- `express` - Web framework for Node.js
- `mongoose` - MongoDB object modeling tool
- `dotenv` - Environment variable management
- `nodemon` - Auto-restart server during development (dev dependency)

### **Step 3: Set up your environment variables**

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and configure your MongoDB connection:

   **For local MongoDB:**
   ```
   MONGODB_URI=mongodb://localhost:27017/notes-app
   PORT=5000
   ```

   **For MongoDB Atlas:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/notes-app
   PORT=5000
   ```

   ⚠️ Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials.

### **Step 4: Start MongoDB (if using local installation)**

If you're using MongoDB locally, make sure MongoDB is running:

```bash
# On macOS/Linux
mongod

# On Windows (usually runs as a service automatically)
# Or run: "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### **Step 5: Start the server**

**For development (auto-restart on changes):**
```bash
npm run dev
```

**For production:**
```bash
npm start
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server is running on http://localhost:5000
```

---

## 🧪 Testing the API

You can test the API using **Postman**, **Thunder Client**, or **curl**.

### **Base URL**
```
http://localhost:5000
```

### **API Endpoints**

#### 1️⃣ **Create a New Note** (POST)

**Endpoint:** `POST /api/notes`

**Request Body (JSON):**
```json
{
  "title": "My First Note",
  "content": "This is the content of my note.",
  "category": "Personal"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My First Note",
    "content": "This is the content of my note.",
    "category": "Personal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 2️⃣ **Get All Notes** (GET)

**Endpoint:** `GET /api/notes`

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "My First Note",
      "content": "This is the content of my note.",
      "category": "Personal",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "title": "Shopping List",
      "content": "Milk, Eggs, Bread",
      "category": "Work",
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

---

#### 3️⃣ **Get a Single Note by ID** (GET)

**Endpoint:** `GET /api/notes/:id`

**Example:** `GET /api/notes/65a1b2c3d4e5f6g7h8i9j0k1`

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My First Note",
    "content": "This is the content of my note.",
    "category": "Personal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 4️⃣ **Update a Note** (PUT)

**Endpoint:** `PUT /api/notes/:id`

**Example:** `PUT /api/notes/65a1b2c3d4e5f6g7h8i9j0k1`

**Request Body (JSON):**
```json
{
  "title": "My Updated Note",
  "content": "This is the updated content."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My Updated Note",
    "content": "This is the updated content.",
    "category": "Personal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T12:00:00.000Z"
  }
}
```

---

#### 5️⃣ **Delete a Note** (DELETE)

**Endpoint:** `DELETE /api/notes/:id`

**Example:** `DELETE /api/notes/65a1b2c3d4e5f6g7h8i9j0k1`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

---

## 🔍 Understanding the Code

### **1. server.js** - The Main Entry Point

This file:
- Sets up the Express application
- Connects to MongoDB
- Defines middleware (JSON parsing, CORS)
- Mounts routes
- Starts the server
- Handles errors

### **2. config/database.js** - Database Connection

This file:
- Exports a function to connect to MongoDB
- Uses Mongoose to establish connection
- Handles connection errors
- Shows connection success message

### **3. models/Note.js** - Data Model

This file:
- Defines the structure of a Note document
- Specifies data types and validation rules
- Adds timestamps (createdAt, updatedAt)
- Exports the Note model

### **4. routes/notes.js** - API Routes

This file:
- Defines all CRUD endpoints
- Handles HTTP requests (GET, POST, PUT, DELETE)
- Validates incoming data
- Interacts with the database through the Note model
- Returns JSON responses

---

## 📚 Key Concepts Explained

### **What is CRUD?**

CRUD stands for the four basic operations you can perform on data:

- **C**reate - Add new data (POST request)
- **R**ead - Retrieve existing data (GET request)
- **U**pdate - Modify existing data (PUT/PATCH request)
- **D**elete - Remove data (DELETE request)

### **What is REST API?**

REST (Representational State Transfer) is an architectural style for designing networked applications. A RESTful API uses HTTP requests to perform CRUD operations.

**Key principles:**
- Uses standard HTTP methods (GET, POST, PUT, DELETE)
- Stateless (each request is independent)
- Uses JSON for data exchange
- Has predictable URL structure

### **What is Mongoose?**

Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides:
- Schema definitions
- Data validation
- Query building
- Middleware hooks

### **What are Environment Variables?**

Environment variables are used to store sensitive configuration data (like database URLs, API keys) outside your code. This keeps your secrets safe and allows different configurations for development, testing, and production.

---

## 🎓 Learning Exercises

Try these exercises to deepen your understanding:

### **Beginner Level:**
1. ✏️ Add a new field `tags` (array of strings) to the Note model
2. 📝 Create a note with multiple tags
3. 🔍 Test all CRUD operations using Postman
4. 🎨 Change the port number to 3000

### **Intermediate Level:**
1. 🔎 Add a search endpoint: `GET /api/notes/search?query=keyword`
2. 🏷️ Add filtering by category: `GET /api/notes?category=Personal`
3. 📊 Add a statistics endpoint: `GET /api/notes/stats` (returns count by category)
4. ✅ Add input validation (title required, min/max length)

### **Advanced Level:**
1. 👤 Add user authentication (register, login)
2. 🔐 Protect routes with authentication middleware
3. 🔗 Add note sharing (share a note with another user)
4. 📄 Add pagination (limit results per page)

---

## ❓ Troubleshooting

### **Server won't start**

❌ **Error:** `Cannot find module 'express'`  
✅ **Solution:** Run `npm install` to install dependencies

❌ **Error:** `EADDRINUSE: Port 5000 is already in use`  
✅ **Solution:** Change the PORT in `.env` or stop the process using port 5000

### **Cannot connect to MongoDB**

❌ **Error:** `MongooseServerSelectionError`  
✅ **Solutions:**
- Check if MongoDB is running (`mongod` command)
- Verify your `MONGODB_URI` in `.env` is correct
- If using Atlas, check your IP is whitelisted and credentials are correct

### **"Note not found" error**

❌ **Error:** 404 when getting/updating/deleting a note  
✅ **Solution:** Make sure you're using a valid note ID from your database

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files to Git (use `.gitignore`)
2. ✅ Use environment variables for sensitive data
3. ✅ Validate all user input
4. ✅ Handle errors gracefully
5. ✅ Use HTTPS in production
6. ✅ Add rate limiting to prevent abuse
7. ✅ Sanitize user input to prevent injection attacks

---

## 🚀 Next Steps

Once you're comfortable with this project:

1. **Add a Frontend**: Build a React UI to interact with this API
2. **Add Authentication**: Implement JWT-based authentication
3. **Deploy**: Deploy your app to platforms like:
   - Backend: [Heroku](https://www.heroku.com/), [Railway](https://railway.app/), [Render](https://render.com/)
   - Database: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
4. **Add More Features**: File uploads, email notifications, etc.

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [REST API Design Best Practices](https://restfulapi.net/)

---

## 🤝 Need Help?

- Ask questions in the MUST Web Community
- Check the documentation above
- Review the commented code in each file
- Try the learning exercises step by step

---

## 📝 Summary

This project demonstrates:
- ✅ Setting up a Node.js/Express server
- ✅ Connecting to MongoDB using Mongoose
- ✅ Creating a data model with validation
- ✅ Building RESTful API endpoints
- ✅ Implementing full CRUD operations
- ✅ Error handling and status codes
- ✅ Using environment variables
- ✅ Organizing code with MVC pattern

**Happy Learning! 🎉**
