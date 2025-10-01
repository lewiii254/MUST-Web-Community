# 📋 Quick Reference Guide

A one-page cheat sheet for the Notes API.

---

## 🚀 Quick Start Commands

```bash
# Setup
cd DEMO
npm install
cp .env.example .env

# Run
npm start          # Production
npm run dev        # Development (auto-restart)

# MongoDB (if local)
mongod            # Start MongoDB server
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description | Body Required |
|--------|----------|-------------|---------------|
| GET | `/api/notes` | Get all notes | No |
| GET | `/api/notes/:id` | Get single note | No |
| POST | `/api/notes` | Create note | Yes |
| PUT | `/api/notes/:id` | Update note | Yes |
| DELETE | `/api/notes/:id` | Delete note | No |

---

## 📝 Request Body Format

### Create Note (POST)
```json
{
  "title": "Note Title",
  "content": "Note content here",
  "category": "Personal"  // Optional, defaults to "General"
}
```

### Update Note (PUT)
```json
{
  "title": "New Title",      // Optional
  "content": "New Content",  // Optional
  "category": "Work"         // Optional
}
```

---

## 📊 HTTP Status Codes

| Code | Meaning | When |
|------|---------|------|
| 200 | OK | Successful GET, PUT, DELETE |
| 201 | Created | Successful POST |
| 400 | Bad Request | Invalid/missing data |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Something wrong on server |

---

## 🧩 File Structure

```
DEMO/
├── server.js              # Main entry point
├── config/
│   └── database.js        # MongoDB connection
├── models/
│   └── Note.js           # Note schema/model
├── routes/
│   └── notes.js          # CRUD route handlers
├── package.json          # Dependencies
├── .env.example          # Environment template
└── .env                  # Your environment (create this!)
```

---

## 🔧 Environment Variables (.env)

```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-app
NODE_ENV=development
```

---

## 💻 Common MongoDB Commands

```javascript
// Find all
Note.find()

// Find by ID
Note.findById(id)

// Create
Note.create({ title, content })

// Update
Note.findByIdAndUpdate(id, data, options)

// Delete
Note.findByIdAndDelete(id)

// Count
Note.countDocuments()
```

---

## 🧪 Testing with cURL

```bash
# Get all notes
curl http://localhost:5000/api/notes

# Get single note
curl http://localhost:5000/api/notes/NOTE_ID

# Create note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","content":"Testing API"}'

# Update note
curl -X PUT http://localhost:5000/api/notes/NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# Delete note
curl -X DELETE http://localhost:5000/api/notes/NOTE_ID
```

---

## 🎯 Mongoose Schema Types

| Type | Description | Example |
|------|-------------|---------|
| String | Text | `"Hello"` |
| Number | Numbers | `42` |
| Boolean | True/False | `true` |
| Date | Dates | `new Date()` |
| Array | Lists | `["a", "b"]` |
| ObjectId | Reference | MongoDB ID |

---

## ⚙️ Common Express Methods

```javascript
// GET request
app.get('/path', (req, res) => {})

// POST request
app.post('/path', (req, res) => {})

// PUT request
app.put('/path', (req, res) => {})

// DELETE request
app.delete('/path', (req, res) => {})

// Use middleware
app.use(middleware)

// Send JSON response
res.json({ data: "value" })

// Send status code
res.status(200).json({ data: "value" })
```

---

## 🛠️ Useful Middleware

```javascript
// Parse JSON bodies
app.use(express.json())

// Enable CORS
app.use(cors())

// Logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})
```

---

## 🔍 Error Handling Pattern

```javascript
try {
  // Database operation
  const result = await Model.find()
  res.json({ success: true, data: result })
} catch (error) {
  res.status(500).json({ 
    success: false, 
    error: error.message 
  })
}
```

---

## 📚 Mongoose Validation

```javascript
fieldName: {
  type: String,
  required: true,           // Must be provided
  trim: true,              // Remove whitespace
  lowercase: true,         // Convert to lowercase
  uppercase: true,         // Convert to uppercase
  minlength: 5,            // Minimum length
  maxlength: 100,          // Maximum length
  default: 'value',        // Default value
  enum: ['opt1', 'opt2']   // Only these values
}
```

---

## 🚨 Troubleshooting

### Server won't start
```bash
# Check if node_modules exists
ls node_modules

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check port is available
lsof -i :5000  # Mac/Linux
netstat -ano | findstr :5000  # Windows
```

### Can't connect to MongoDB
```bash
# Check MongoDB is running
mongod --version

# Test connection
mongo  # Or mongosh for newer versions

# Check connection string
echo $MONGODB_URI  # Mac/Linux
echo %MONGODB_URI%  # Windows
```

### Module not found
```bash
# Install missing package
npm install package-name

# Or reinstall all
npm install
```

---

## 🎓 Key Concepts

### REST API Principles
- Use HTTP methods correctly (GET, POST, PUT, DELETE)
- Use proper status codes
- Keep URLs clean and consistent
- Use JSON for data exchange

### MVC Pattern
- **Model**: Data structure (models/Note.js)
- **View**: Not used in API (would be frontend)
- **Controller**: Route handlers (routes/notes.js)

### Async/Await
```javascript
// Old way (callbacks)
Model.find((err, data) => {})

// New way (async/await)
const data = await Model.find()
```

---

## 💡 Pro Tips

1. **Always validate input** - Never trust client data
2. **Use meaningful variable names** - `note` not `n`
3. **Handle errors gracefully** - Don't let app crash
4. **Test as you build** - Don't wait until the end
5. **Read error messages** - They usually tell you what's wrong
6. **Use console.log** - Debug by logging values
7. **Keep it simple** - Don't over-complicate

---

## 🔗 Useful Links

- [Express Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [REST API Tutorial](https://restfulapi.net/)
- [Postman Learning](https://learning.postman.com/)

---

## ✅ Checklist Before Moving to Production

- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Input validation added
- [ ] Tested all endpoints
- [ ] Removed console.logs (or use proper logging)
- [ ] Added security middleware (helmet, rate limiting)
- [ ] Database connection is stable
- [ ] Documented all endpoints

---

## 📞 Need Help?

1. Check the full README.md
2. Review CODE-WALKTHROUGH.md
3. Read TESTING-GUIDE.md
4. Ask in the community
5. Google the error message
6. Check Stack Overflow

---

**Keep this handy while coding! 📌**
