# 🧪 API Testing Guide

This guide will walk you through testing all the API endpoints step by step.

---

## 📦 Import Postman Collection

We've included a Postman collection file (`Notes-API.postman_collection.json`) with all the API requests pre-configured.

### **To Import:**
1. Open Postman
2. Click "Import" button (top left)
3. Drag and drop `Notes-API.postman_collection.json`
4. Collection appears in your sidebar!

---

## 🎯 Testing Step-by-Step

### **Step 1: Check if Server is Running**

**Request:** GET `http://localhost:5000/`

**Expected Response:**
```json
{
  "message": "📝 Welcome to Notes API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

✅ **Success!** Your server is running.

---

### **Step 2: Create Your First Note**

**Request:** POST `http://localhost:5000/api/notes`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "title": "My First Note",
  "content": "This is my first note using the API!",
  "category": "Personal"
}
```

**Expected Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My First Note",
    "content": "This is my first note using the API!",
    "category": "Personal",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

📝 **Important:** Copy the `_id` value - you'll need it for the next steps!

---

### **Step 3: Create More Notes**

Create a few more notes with different categories:

**Note 2 - Work Category:**
```json
{
  "title": "Project Deadline",
  "content": "Complete MERN project by Friday",
  "category": "Work"
}
```

**Note 3 - Study Category:**
```json
{
  "title": "MongoDB Concepts",
  "content": "Review schemas, models, and queries",
  "category": "Study"
}
```

---

### **Step 4: Get All Notes**

**Request:** GET `http://localhost:5000/api/notes`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    { ... note 3 ... },
    { ... note 2 ... },
    { ... note 1 ... }
  ]
}
```

📌 Notes are sorted by creation date (newest first)

---

### **Step 5: Get a Single Note**

**Request:** GET `http://localhost:5000/api/notes/:id`

Replace `:id` with the actual note ID you copied earlier.

**Example:** `http://localhost:5000/api/notes/65a1b2c3d4e5f6g7h8i9j0k1`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My First Note",
    ...
  }
}
```

---

### **Step 6: Update a Note**

**Request:** PUT `http://localhost:5000/api/notes/:id`

**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "title": "My Updated Note Title",
  "content": "I just learned how to update notes!"
}
```

**Expected Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "My Updated Note Title",
    "content": "I just learned how to update notes!",
    "updatedAt": "2024-01-15T11:00:00.000Z"  // Updated timestamp!
  }
}
```

📝 Notice the `updatedAt` timestamp changed!

---

### **Step 7: Delete a Note**

**Request:** DELETE `http://localhost:5000/api/notes/:id`

**Expected Response (200 OK):**
```json
{
  "success": true,
  "message": "Note deleted successfully",
  "data": {}
}
```

**Verify deletion:** Try to GET the same note - you should get a 404 error.

---

## 🔍 Testing Error Cases

It's important to test error scenarios too!

### **Test 1: Create Note Without Required Fields**

**Request:** POST `http://localhost:5000/api/notes`

**Body:**
```json
{
  "category": "Test"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Please provide both title and content"
}
```

---

### **Test 2: Get Non-Existent Note**

**Request:** GET `http://localhost:5000/api/notes/507f1f77bcf86cd799439011`

**Expected Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Note not found"
}
```

---

### **Test 3: Invalid Note ID Format**

**Request:** GET `http://localhost:5000/api/notes/invalid-id`

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid note ID format"
}
```

---

### **Test 4: Title Too Long**

**Request:** POST `http://localhost:5000/api/notes`

**Body:** (title with more than 100 characters)
```json
{
  "title": "This is a very long title that exceeds the maximum allowed length of one hundred characters and should trigger a validation error",
  "content": "Test content"
}
```

**Expected Response (400 Bad Request):**
```json
{
  "success": false,
  "error": ["Title cannot be more than 100 characters"]
}
```

---

## 🎓 Testing Exercises

Practice your testing skills with these exercises:

### **Beginner:**
1. ✏️ Create 5 notes with different categories
2. 📖 Retrieve all notes and count them
3. 🔍 Get each note individually by ID
4. ✍️ Update 2 of the notes
5. 🗑️ Delete 1 note

### **Intermediate:**
1. 🧪 Test all error cases listed above
2. 📊 Create notes and track the timestamps
3. 🔄 Update only the title (not content) of a note
4. 🎯 Create notes with empty category (should default to "General")

### **Advanced:**
1. 🚀 Write a script to bulk create 10 notes
2. ⏱️ Time how long it takes to create 100 notes
3. 🔍 Test concurrent requests (create multiple notes simultaneously)
4. 📝 Document any bugs or issues you find

---

## 📝 HTTP Status Codes Reference

Understanding status codes is crucial for API testing:

| Code | Meaning | When You'll See It |
|------|---------|-------------------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST (created new resource) |
| 400 | Bad Request | Missing/invalid data in request |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Something went wrong on server |

---

## 🔧 Using cURL (Command Line)

If you prefer the command line, here are some cURL examples:

### Create a note:
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"CLI Note","content":"Created from terminal!"}'
```

### Get all notes:
```bash
curl http://localhost:5000/api/notes
```

### Get single note:
```bash
curl http://localhost:5000/api/notes/YOUR_NOTE_ID
```

### Update a note:
```bash
curl -X PUT http://localhost:5000/api/notes/YOUR_NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated via CLI"}'
```

### Delete a note:
```bash
curl -X DELETE http://localhost:5000/api/notes/YOUR_NOTE_ID
```

---

## ✅ Testing Checklist

Use this checklist to ensure you've tested everything:

- [ ] Server starts without errors
- [ ] Can access root endpoint (`/`)
- [ ] Can create a note with all fields
- [ ] Can create a note without category (defaults to "General")
- [ ] Can get all notes
- [ ] Can get a single note by ID
- [ ] Can update a note
- [ ] Can delete a note
- [ ] Validation errors work (missing title/content)
- [ ] 404 error for non-existent note
- [ ] 400 error for invalid note ID
- [ ] Timestamps are created and updated correctly

---

## 🎉 Congratulations!

You've learned how to:
- ✅ Test API endpoints using multiple methods
- ✅ Understand HTTP status codes
- ✅ Handle errors gracefully
- ✅ Validate API responses
- ✅ Use Postman and cURL for testing

**Next Step:** Try building a frontend (React) to interact with this API!

---

## 💡 Pro Tips

1. **Save Successful Responses:** Copy note IDs for testing UPDATE and DELETE
2. **Use Postman Variables:** Store commonly used IDs as variables
3. **Test Edge Cases:** Empty strings, very long strings, special characters
4. **Monitor Console:** Watch server logs while testing
5. **Use Postman Tests:** Write automated tests for your requests

**Happy Testing! 🚀**
