# 🚀 Quick Start Guide - Notes App

Get up and running with the Notes App in just a few minutes!

---

## 📋 Before You Start

Make sure you have:
- ✅ Node.js (v14 or higher) installed
- ✅ MongoDB running (locally or MongoDB Atlas account)
- ✅ A code editor (VS Code recommended)
- ✅ Postman or Thunder Client (for testing API)

---

## ⚡ Quick Setup (5 minutes)

### **1. Navigate to the DEMO folder**
```bash
cd DEMO
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Create your .env file**
```bash
cp .env.example .env
```

Then edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-app
NODE_ENV=development
```

> **For MongoDB Atlas:** Use your connection string:
> `mongodb+srv://username:password@cluster.mongodb.net/notes-app`

### **4. Start MongoDB** (if using local)
```bash
mongod
```

### **5. Start the server**
```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server is running on http://localhost:5000
```

---

## 🧪 Test Your First API Call

### **Option 1: Using your browser**
Open: http://localhost:5000

You'll see the API welcome message!

### **Option 2: Using curl**
```bash
# Create a note
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Note","content":"Hello World!"}'

# Get all notes
curl http://localhost:5000/api/notes
```

### **Option 3: Using Postman/Thunder Client**
1. Create a new POST request to `http://localhost:5000/api/notes`
2. Select Body → raw → JSON
3. Add:
   ```json
   {
     "title": "My First Note",
     "content": "This is my first note!",
     "category": "Personal"
   }
   ```
4. Send the request!

---

## 📚 API Endpoints at a Glance

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| GET | `/api/notes/:id` | Get single note |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

---

## 🎓 What's Next?

1. **Read the full README.md** - Detailed documentation and learning materials
2. **Try all CRUD operations** - Practice with Postman
3. **Explore the code** - Each file has detailed comments explaining what it does
4. **Complete the exercises** - Check README.md for learning exercises

---

## ❓ Common Issues & Solutions

### Server won't start?
- ✅ Check if you ran `npm install`
- ✅ Verify MongoDB is running
- ✅ Check if another app is using port 5000

### Can't connect to MongoDB?
- ✅ Verify MongoDB is running: `mongod` command
- ✅ Check your `MONGODB_URI` in `.env`
- ✅ For Atlas: Whitelist your IP address

### "Module not found" error?
- ✅ Run `npm install` again
- ✅ Delete `node_modules` and `package-lock.json`, then run `npm install`

---

## 🎉 Success!

You now have a working Notes API! 

**Next steps:**
- Read the detailed README.md
- Try creating, reading, updating, and deleting notes
- Examine the code comments to understand how it works

**Happy Learning! 🚀**
