# Week 1: MongoDB Fundamentals

Welcome to Week 1 of the MERN stack journey! This week focuses on MongoDB, a NoSQL database that's perfect for modern web applications.

## 🎯 Learning Objectives

By the end of this week, you should understand:
- What MongoDB is and how it differs from SQL databases
- Basic MongoDB operations (CRUD)
- MongoDB document structure
- How to connect to MongoDB from a Node.js application

## 📊 What is MongoDB?

MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON). Unlike traditional relational databases, MongoDB doesn't require a fixed schema.

### Key Features:
- **Document-based**: Data stored in documents (similar to JSON objects)
- **Schema-less**: No fixed structure required
- **Scalable**: Easy horizontal scaling
- **Flexible**: Perfect for agile development

## 🛠️ Installation

### Option 1: Local Installation
1. Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Download and install MongoDB Community Server
3. Start MongoDB service

### Option 2: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get connection string

## 🔧 Basic Operations

### Connecting to MongoDB
```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Connection failed:', error);
  }
}
```

### CRUD Operations

#### Create (Insert)
```javascript
// Insert one document
await collection.insertOne({ name: 'John', age: 30 });

// Insert multiple documents
await collection.insertMany([
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
]);
```

#### Read (Find)
```javascript
// Find all documents
const allDocs = await collection.find({}).toArray();

// Find specific document
const user = await collection.findOne({ name: 'John' });

// Find with conditions
const adults = await collection.find({ age: { $gte: 18 } }).toArray();
```

#### Update
```javascript
// Update one document
await collection.updateOne(
  { name: 'John' },
  { $set: { age: 31 } }
);

// Update multiple documents
await collection.updateMany(
  { age: { $lt: 18 } },
  { $set: { status: 'minor' } }
);
```

#### Delete
```javascript
// Delete one document
await collection.deleteOne({ name: 'John' });

// Delete multiple documents
await collection.deleteMany({ age: { $lt: 18 } });
```

## 📝 Practice Exercises

1. Create a database called 'school'
2. Create a collection called 'students'
3. Insert 5 student documents with fields: name, age, grade, subjects
4. Query students by grade
5. Update a student's subjects
6. Delete a student record

## 🔗 Resources

- [MongoDB Official Documentation](https://docs.mongodb.com/)
- [MongoDB University](https://university.mongodb.com/)
- [MongoDB Node.js Driver](https://docs.mongodb.com/drivers/node/)

## ✅ Week 1 Checklist

- [ ] Install MongoDB (locally or Atlas)
- [ ] Learn basic MongoDB concepts
- [ ] Practice CRUD operations
- [ ] Complete practice exercises
- [ ] Prepare for Week 2 (Node.js & Express)

---

**Next Week**: We'll learn Node.js and Express to build a server that connects to our MongoDB database!
