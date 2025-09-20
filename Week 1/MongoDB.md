# Week 1: MongoDB – Data Layer Fundamentals and Advanced Techniques 🗄️🔍

Welcome to Week 1 of the MERN stack journey! 🚀 Get ready to dive into the exciting world of MongoDB, the powerhouse NoSQL database that's revolutionizing how modern web applications handle data. 

Think of MongoDB as your data's best friend – flexible, scalable, and incredibly powerful! 💪 In the MERN stack, MongoDB serves as the foundation (the "M" in MERN), providing the robust data layer that powers everything from simple blogs to enterprise applications used by millions of users worldwide. 🌍

**Why is MongoDB crucial in the MERN stack?** 🤔
- **Perfect Match**: MongoDB's JSON-like documents play beautifully with JavaScript across the entire stack
- **Developer Friendly**: No complex joins or rigid schemas – just intuitive, document-based data
- **Scalability Champion**: From startup MVP to enterprise scale, MongoDB grows with your dreams 📈
- **Real-time Ready**: Perfect for modern features like live chats, notifications, and dynamic content

## 🎯 Learning Objectives

By the end of this week, you should understand:
- What MongoDB is and how it differs from SQL databases
- Basic MongoDB operations (CRUD)
- MongoDB document structure and collections
- Schemas, indexes, and aggregation basics
- How to connect to MongoDB from a Node.js application using both native driver and Mongoose

## 🆚 NoSQL vs SQL: The Great Database Showdown!

Imagine you're organizing information about students in a school... 🏫

### 📊 SQL Databases (Like Spreadsheets) 
Think of SQL databases like a perfectly organized filing cabinet with labeled folders:
```
Students Table:    |  Courses Table:     |  Enrollments Table:
ID | Name | Age    |  ID | Name | Credits  |  StudentID | CourseID
1  | John | 20     |  1  | Math | 3        |  1         | 1  
2  | Jane | 19     |  2  | History | 3     |  1         | 2
```
- **Rigid Structure**: Every student MUST have the exact same fields ⚡
- **Relationships**: Need separate tables connected by IDs (like connecting spreadsheets) 🔗
- **Changes**: Adding a new field? You need to modify the entire structure! 😅

### 🗂️ NoSQL Databases (Like Flexible Folders)
MongoDB is like having magical folders that can contain any type of document:
```javascript
// Student documents - each can be unique! ✨
{
  name: "John",
  age: 20,
  courses: ["Math", "History"],
  address: { city: "Nairobi", country: "Kenya" },
  hobbies: ["coding", "football"] // Some students have hobbies, others don't!
}

{
  name: "Jane", 
  age: 19,
  courses: ["Biology", "Chemistry"],
  scholarships: ["Merit Award"], // Jane has scholarships, John doesn't!
  labPartner: "Alice"
}
```

### 🎯 Real-World Analogy: Library Management
**SQL Approach (Traditional Library)** 📚
- Every book card has identical fields: Title, Author, ISBN, Publication Date
- Separate cards for borrowers, separate cards for book categories
- Want to add "E-book link"? Need to redesign ALL cards!

**NoSQL Approach (Modern Digital Library)** 💻
- Each book is a flexible digital record
- Some books have audio versions, some have videos, some have interactive content
- Easy to add new fields like "VR Experience" or "Interactive Quiz" to specific books
- All information about a book (reviews, borrowing history, multimedia) in one place!

## 📊 What is MongoDB? Your Data's Ultimate Best Friend! 🤝

MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents called BSON (Binary JSON). Think of it as a super-smart filing system that adapts to whatever you throw at it! 🎯

### 🏠 Real-World Analogy: Your Personal Documents Folder
Imagine your computer's Documents folder, but SUPER organized:

```
📁 MyLife Database
   📄 Profile.json         → Your personal info (flexible fields)
   📄 School_Record.json   → Academic history 
   📄 Hobbies.json        → Your interests (could be anything!)
   📄 Family.json         → Family members (different info for each person)
```

Each "document" can have completely different information – just like how your school transcripts look different from your photo collection metadata!

### 🌟 Key Features (Why MongoDB Rocks!):
- **📄 Document-based**: Data stored in documents (like JSON objects you already know!)
  ```javascript
  // Just like JavaScript objects you're familiar with! 
  const student = {
    name: "Maria",
    age: 21,
    courses: ["Web Dev", "Data Structures"],
    contact: {
      email: "maria@example.com",
      phone: "+254-712-345-678"
    }
  }
  ```

- **🎨 Schema-less**: No rigid structure required – add fields as you go!
  ```javascript
  // Today's student record
  { name: "John", age: 20, course: "Computer Science" }
  
  // Tomorrow you can add more fields to NEW records
  { name: "Jane", age: 19, course: "IT", scholarship: true, mentor: "Dr. Smith" }
  ```

- **📈 Horizontally Scalable**: From 100 users to 100 million – MongoDB scales like magic!
- **⚡ Flexible**: Perfect for agile development – change your mind? No problem!

### 🎪 The School Database Analogy
Imagine you're building a system for MUST (Meru University):

**Student Management System** 🎓
```javascript
// Computer Science student
{
  studentId: "CS/2024/001",
  name: "Kevin Kiprotich", 
  program: "Computer Science",
  year: 2,
  projects: [
    { name: "Weather App", tech: ["React", "Node.js"], grade: "A" },
    { name: "Chat Bot", tech: ["Python", "AI"], grade: "B+" }
  ],
  clubs: ["Coding Club", "Robotics Society"],
  location: { county: "Meru", residence: "On-campus" }
}

// Business student - completely different structure!
{
  studentId: "BU/2024/002", 
  name: "Grace Wanjiku",
  program: "Business Administration",
  year: 3,
  internships: [
    { company: "Safaricom", role: "Marketing Intern", duration: "3 months" }
  ],
  businessPlan: "Eco-friendly packaging startup",
  languages: ["English", "Swahili", "Kikuyu"]
}
```

**Why This Is Awesome** ✨
- No need to create separate tables for projects, internships, or languages
- Each student record can be as unique as the student themselves
- Easy to add new fields like "study abroad experience" without restructuring everything
- All related information is stored together – no complex joins needed!

## 🛠️ Installation: Setting Up Your MongoDB Playground! 

Let's get MongoDB running on your machine! Choose your adventure: 🎮

### 🖥️ Option 1: Local Installation (Full Control)
Perfect for development and learning!

#### Step 1: Install MongoDB Community Server
1. Visit [MongoDB Download Center](https://www.mongodb.com/try/download/community) 🌐
2. Select your operating system:
   - **Windows**: Download the MSI installer
   - **macOS**: Use Homebrew: `brew install mongodb/brew/mongodb-community`  
   - **Linux (Ubuntu)**: 
     ```bash
     wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
     sudo apt-get update
     sudo apt-get install -y mongodb-org
     ```
3. Start MongoDB service:
   - **Windows**: MongoDB starts automatically
   - **macOS/Linux**: `sudo systemctl start mongod` or `brew services start mongodb-community`

#### Step 2: Install MongoDB Compass (Your Visual Dashboard) 📊
Think of Compass as your MongoDB GPS – it helps you navigate your data visually!

1. Download [MongoDB Compass](https://www.mongodb.com/products/compass) 🧭
2. Install and connect to `mongodb://localhost:27017`
3. **What you'll see**: A beautiful interface showing:
   - 🗂️ Your databases (like folders)
   - 📄 Collections (like file types)
   - 🔍 Query builder (no coding required!)
   - 📈 Performance insights

### ☁️ Option 2: MongoDB Atlas (Cloud - Recommended for Beginners)
Free, managed, and always accessible! Perfect for learning and small projects.

#### The Cloud Adventure: 🌥️
1. **Create Account**: Visit [MongoDB Atlas](https://www.mongodb.com/atlas) 
2. **Create Free Cluster**: 
   ```
   🌍 Choose Region: Select closest to you (e.g., Ireland for African users)
   💰 Tier: M0 Sandbox (FREE forever!)
   📛 Name: "MyFirstCluster" or "MUST-Learning-DB"
   ```
3. **Setup Security**:
   - Create database user (username/password) 🔐
   - Add your IP to whitelist (or use 0.0.0.0/0 for learning) 🌐
4. **Get Connection String**: 
   ```javascript
   // Your personal MongoDB URL will look like:
   mongodb+srv://username:password@cluster0.abc123.mongodb.net/myFirstDatabase
   ```

### 🧪 Testing Your Installation
Let's make sure everything works! Open your terminal and try:

#### For Local Installation:
```bash
# Connect to MongoDB shell
mongo
# or for newer versions:
mongosh

# You should see something like:
# MongoDB shell version v7.0.0
# connecting to: mongodb://127.0.0.1:27017
```

#### For Atlas (Cloud):
```bash
# Install MongoDB shell tools first:
npm install -g mongosh

# Connect using your connection string:
mongosh "mongodb+srv://username:password@cluster0.abc123.mongodb.net/"
```

### 🎉 Success Indicators
You know you're ready when:
- ✅ MongoDB shell connects without errors
- ✅ MongoDB Compass shows your databases 
- ✅ You can create a test database
- ✅ You feel like a database wizard! 🧙‍♂️

**Pro Tip**: Keep your connection string safe – treat it like a password! 🔒

## 🗂️ Schemas & Collections: Organizing Your Digital World

### 📚 Collections: Think Digital Bookshelves
In MongoDB, a **Collection** is like a bookshelf in a library – it holds similar types of documents, but each book (document) can be unique! 

```javascript
// University Library Analogy 📖
Database: "UniversityLibrary"
├── Collection: "students" 👥
├── Collection: "courses" 📚  
├── Collection: "faculty" 👨‍🏫
└── Collection: "events" 🎪
```

#### Real-World Example: MUST Student Records
```javascript
// Collection: students
// Each document is a student, but they can have different fields!

// Computer Science Student
{
  _id: ObjectId("..."),
  studentId: "CS/2024/001", 
  name: "Alice Mukami",
  program: "Computer Science",
  year: 2,
  courses: ["Data Structures", "Web Development", "Database Systems"],
  projects: [
    { name: "Library Management System", tech: ["Node.js", "MongoDB"] }
  ],
  gpa: 3.7
}

// Art Student (completely different structure!)
{
  _id: ObjectId("..."),
  studentId: "ART/2024/002",
  name: "David Kiprop", 
  program: "Fine Arts",
  year: 3,
  medium: "Digital Art",
  exhibitions: ["Nairobi Art Festival 2024"],
  portfolio: "https://davidart.com",
  mentor: "Prof. Jane Wanjiku"
}
```

### 🏗️ Schemas: The Flexible Blueprint (Mongoose Magic)
While MongoDB itself is schema-less, **Mongoose** (our Node.js companion) lets us create flexible blueprints:

```javascript
// Think of a schema as a "suggestion" not a "rule" 💡
const mongoose = require('mongoose');

// Student Schema - like a form template
const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true // Removes extra spaces automatically
  },
  email: {
    type: String,
    required: true,
    unique: true, // No duplicate emails allowed
    match: [/.+\@.+\..+/, 'Please enter a valid email'] // Validation magic!
  },
  age: {
    type: Number,
    min: 16, // Minimum age
    max: 100 // Maximum age
  },
  courses: [{ // Array of course objects
    name: String,
    instructor: String,
    credits: { type: Number, default: 3 }
  }],
  address: {
    county: String,
    town: String,
    country: { type: String, default: 'Kenya' }
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

// Create the model (like creating the actual bookshelf)
const Student = mongoose.model('Student', studentSchema);
```

### 🎯 Schema Features That Make Life Easier:

#### 1. **Validation**: Your Data Bouncer 🛡️
```javascript
// Email validation
email: {
  type: String,
  validate: {
    validator: function(email) {
      return email.includes('@must.ac.ke'); // Only MUST emails allowed!
    },
    message: 'Only MUST university emails are allowed'
  }
}
```

#### 2. **Default Values**: Smart Assumptions 🤖
```javascript
country: { type: String, default: 'Kenya' },
createdAt: { type: Date, default: Date.now },
isActive: { type: Boolean, default: true }
```

#### 3. **Virtual Properties**: Computed Fields ⚡
```javascript
// Add virtual property for full name
studentSchema.virtual('fullInfo').get(function() {
  return `${this.name} (${this.studentId}) - ${this.program}`;
});

// Usage:
console.log(student.fullInfo); // "Alice Mukami (CS/2024/001) - Computer Science"
```

### 🏫 Real-World Collection Design: School Management System

#### Collection Structure Planning:
```javascript
// Database: "MUSTManagement"

// Collection 1: students
{
  studentId: "CS/2024/001",
  personalInfo: { name: "...", age: 20, contacts: {...} },
  academic: { program: "...", year: 2, gpa: 3.7 },
  activities: { clubs: [], sports: [], leadership: [] }
}

// Collection 2: courses  
{
  courseCode: "CS201",
  title: "Data Structures",
  instructor: "Dr. Smith",
  credits: 3,
  schedule: { days: ["Mon", "Wed"], time: "10:00-11:30" },
  enrolledStudents: ["CS/2024/001", "CS/2024/002"] // References to student IDs
}

// Collection 3: faculty
{
  employeeId: "FAC001",
  name: "Dr. John Smith", 
  department: "Computer Science",
  courses: ["CS201", "CS301"], // References to course codes
  officeHours: "Mon-Fri 2:00-4:00PM"
}
```

### 💡 Pro Tips for Collection Design:
1. **Keep related data together** - Store a student's courses with the student, not separately
2. **Use references for large, shared data** - Store instructor ID, not full instructor info in each course
3. **Think about how you'll query** - Structure data how you'll use it most often
4. **Start simple, evolve** - MongoDB allows you to add fields later!

## 🔧 Basic Operations: Your MongoDB Toolbox! 🧰

Time to get hands-on! We'll explore MongoDB operations using both **MongoDB Shell** (direct database commands) and **Node.js with Mongoose** (for application development).

### 🔌 Connecting to MongoDB

#### Option A: MongoDB Shell (Direct Database Access)
```bash
# Local MongoDB
mongosh
# or for older versions: mongo

# MongoDB Atlas (Cloud)
mongosh "mongodb+srv://username:password@cluster0.abc123.mongodb.net/"

# Once connected, switch to your database:
use mustUniversity
```

#### Option B: Node.js with Native Driver
```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Local
// const uri = 'mongodb+srv://username:password@cluster0.abc123.mongodb.net/'; // Atlas

const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log('🎉 Connected to MongoDB!');
    const db = client.db('mustUniversity');
    const collection = db.collection('students');
    return collection;
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}
```

#### Option C: Node.js with Mongoose (Recommended!)
```javascript
const mongoose = require('mongoose');

// Connect to database
async function connectWithMongoose() {
  try {
    await mongoose.connect('mongodb://localhost:27017/mustUniversity');
    console.log('🚀 Mongoose connected to MongoDB!');
  } catch (error) {
    console.error('❌ Mongoose connection failed:', error);
  }
}

// Define a simple student model
const Student = mongoose.model('Student', {
  name: String,
  age: Number,
  course: String,
  email: String
});
```

### 🎪 CRUD Operations: The Main Show! 

Let's manage student records for MUST University! 🎓

#### 📝 Create (Insert) - Adding New Students

**MongoDB Shell Commands:**
```javascript
// Switch to our database
use mustUniversity

// Insert one student
db.students.insertOne({
  name: "Grace Wanjiku",
  age: 20,
  studentId: "CS/2024/001",
  course: "Computer Science", 
  email: "grace.wanjiku@must.ac.ke",
  year: 2,
  gpa: 3.8
})

// Insert multiple students at once! 🚀
db.students.insertMany([
  {
    name: "John Kiprotich", 
    age: 21,
    studentId: "ENG/2024/002",
    course: "Engineering",
    email: "john.kiprotich@must.ac.ke",
    year: 3,
    specialization: "Civil Engineering"
  },
  {
    name: "Mary Akinyi",
    age: 19, 
    studentId: "BUS/2024/003",
    course: "Business",
    email: "mary.akinyi@must.ac.ke",
    year: 1,
    interests: ["Marketing", "Finance"]
  }
])
```

**Node.js with Native Driver:**
```javascript
// Insert one document
await collection.insertOne({ 
  name: 'Grace Wanjiku', 
  age: 20,
  course: 'Computer Science',
  email: 'grace.wanjiku@must.ac.ke'
});

// Insert multiple documents
await collection.insertMany([
  { name: 'John Kiprotich', age: 21, course: 'Engineering' },
  { name: 'Mary Akinyi', age: 19, course: 'Business' }
]);
```

**Node.js with Mongoose:**
```javascript
// Create and save one student
const newStudent = new Student({
  name: 'Grace Wanjiku',
  age: 20,
  course: 'Computer Science',
  email: 'grace.wanjiku@must.ac.ke'
});
await newStudent.save();

// Or create directly
await Student.create({
  name: 'John Kiprotich',
  age: 21, 
  course: 'Engineering'
});

// Create multiple students
await Student.insertMany([
  { name: 'Mary Akinyi', age: 19, course: 'Business' },
  { name: 'David Mwangi', age: 22, course: 'Medicine' }
]);
```

#### 🔍 Read (Find) - Discovering Your Data

**MongoDB Shell Commands:**
```javascript
// Find all students
db.students.find()

// Find all students (pretty formatted)
db.students.find().pretty()

// Find specific student by name
db.students.findOne({ name: "Grace Wanjiku" })

// Find students by course
db.students.find({ course: "Computer Science" })

// Find students older than 20
db.students.find({ age: { $gt: 20 } })

// Find Computer Science students in year 2 or 3
db.students.find({ 
  course: "Computer Science", 
  year: { $in: [2, 3] } 
})

// Find students and show only specific fields
db.students.find(
  { course: "Engineering" }, 
  { name: 1, age: 1, specialization: 1 } // 1 means include, 0 means exclude
)

// Find with sorting and limiting
db.students.find().sort({ gpa: -1 }).limit(5) // Top 5 students by GPA
```

**Node.js with Native Driver:**
```javascript
// Find all documents
const allStudents = await collection.find({}).toArray();

// Find specific student
const student = await collection.findOne({ name: 'Grace Wanjiku' });

// Find with conditions
const csStudents = await collection.find({ course: 'Computer Science' }).toArray();

// Find students older than 20
const adults = await collection.find({ age: { $gte: 21 } }).toArray();
```

**Node.js with Mongoose:**
```javascript
// Find all students
const allStudents = await Student.find();

// Find one student
const student = await Student.findOne({ name: 'Grace Wanjiku' });

// Find by ID
const studentById = await Student.findById('60f7b3b3b3b3b3b3b3b3b3b3');

// Find with conditions
const csStudents = await Student.find({ course: 'Computer Science' });

// Find with advanced querying
const topStudents = await Student
  .find({ gpa: { $gte: 3.5 } })
  .sort({ gpa: -1 })  // Sort by GPA descending
  .limit(10)          // Get top 10
  .select('name course gpa'); // Only return specific fields
```

#### ✏️ Update - Keeping Information Current

**MongoDB Shell Commands:**
```javascript
// Update one student's age
db.students.updateOne(
  { name: "Grace Wanjiku" },  // Find criteria
  { $set: { age: 21 } }       // Update operation
)

// Update multiple students (add graduation year to all final year students)
db.students.updateMany(
  { year: 4 },
  { $set: { graduationYear: 2024 } }
)

// Add new field to specific student
db.students.updateOne(
  { studentId: "CS/2024/001" },
  { 
    $set: { 
      projects: ["Library Management System", "Weather App"],
      mentorAssigned: true 
    } 
  }
)

// Add element to array (add a new course to student's course list)
db.students.updateOne(
  { name: "John Kiprotich" },
  { $push: { courses: "Advanced Mathematics" } }
)

// Remove element from array
db.students.updateOne(
  { name: "John Kiprotich" },
  { $pull: { courses: "Basic Mathematics" } }
)
```

**Node.js with Native Driver:**
```javascript
// Update one document
await collection.updateOne(
  { name: 'Grace Wanjiku' },
  { $set: { age: 21 } }
);

// Update multiple documents  
await collection.updateMany(
  { course: 'Computer Science' },
  { $set: { department: 'School of Computing' } }
);
```

**Node.js with Mongoose:**
```javascript
// Update one student
await Student.updateOne(
  { name: 'Grace Wanjiku' },
  { age: 21, year: 3 }
);

// Update using findByIdAndUpdate (returns updated document)
const updatedStudent = await Student.findByIdAndUpdate(
  studentId,
  { gpa: 3.9 },
  { new: true } // Return updated document
);

// Update multiple students
await Student.updateMany(
  { year: 4 },
  { graduationYear: 2024 }
);
```

#### 🗑️ Delete - Cleaning Up Data

**MongoDB Shell Commands:**
```javascript
// Delete one student
db.students.deleteOne({ name: "John Kiprotich" })

// Delete multiple students (remove all graduated students)
db.students.deleteMany({ graduationYear: { $lt: 2024 } })

// Delete all students from a specific course
db.students.deleteMany({ course: "Discontinued Program" })
```

**Node.js with Native Driver:**
```javascript
// Delete one document
await collection.deleteOne({ name: 'John Kiprotich' });

// Delete multiple documents
await collection.deleteMany({ graduationYear: { $lt: 2020 } });
```

**Node.js with Mongoose:**
```javascript
// Delete one student
await Student.deleteOne({ name: 'John Kiprotich' });

// Delete by ID
await Student.findByIdAndDelete(studentId);

// Delete multiple students
await Student.deleteMany({ graduationYear: { $lt: 2020 } });

// Find and delete (returns deleted document)
const deletedStudent = await Student.findOneAndDelete({ name: 'Old Student' });
```

### 🎯 Pro Tips for CRUD Operations:
1. **Always backup before mass updates/deletes** ⚠️
2. **Use `findOne()` to test your queries before `updateMany()`** 🧪
3. **MongoDB shell is perfect for quick admin tasks** ⚡
4. **Mongoose is better for application development** 🚀
5. **Use `.pretty()` in shell for readable output** 👀

## 🚀 Indexes & Aggregations: Supercharging Your Queries!

### 📚 Indexes: Your Database's Table of Contents

Think of indexes like the index at the back of a textbook – they help you find information lightning-fast! ⚡

#### 🏫 Real-World Analogy: Library Card Catalog
Imagine MUST library without a catalog system:
- **Without Index**: To find "Database Systems" book, check every single shelf 😴
- **With Index**: Look up "Database Systems" in catalog, go directly to "Section C, Shelf 23" 🎯

#### Creating Indexes

**MongoDB Shell:**
```javascript
// Switch to our database
use mustUniversity

// Create index on frequently searched field (student email)
db.students.createIndex({ email: 1 })  // 1 = ascending, -1 = descending

// Create compound index (multiple fields)
db.students.createIndex({ course: 1, year: 1 })

// Create text index for search functionality
db.students.createIndex({ 
  name: "text", 
  course: "text" 
})

// View all indexes
db.students.getIndexes()
```

**Node.js with Mongoose:**
```javascript
// Define indexes in schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Automatically creates index
  studentId: { type: String, unique: true, index: true }, // Explicit index
  course: { type: String, index: true },
  year: Number,
  gpa: Number
});

// Compound index
studentSchema.index({ course: 1, year: 1 });

// Text search index  
studentSchema.index({ name: 'text', course: 'text' });
```

#### 🎯 When to Use Indexes:
- ✅ Fields you query frequently (email, studentId)
- ✅ Fields used for sorting
- ✅ Fields used in WHERE conditions
- ❌ Don't over-index (slows down writes)

### 📊 Aggregations: Your Data Analysis Superpower!

Aggregation is like having a data analyst assistant that can:
- 📈 Calculate statistics
- 🔍 Group and filter data
- 🧮 Perform complex calculations
- 📋 Generate reports

#### 🏫 Real-World Example: University Statistics

**MongoDB Shell Aggregations:**
```javascript
// 1. Count students per course
db.students.aggregate([
  {
    $group: {
      _id: "$course",              // Group by course
      totalStudents: { $sum: 1 },  // Count students
      averageAge: { $avg: "$age" } // Calculate average age
    }
  },
  {
    $sort: { totalStudents: -1 } // Sort by student count (descending)
  }
])

// Result:
// { _id: "Computer Science", totalStudents: 45, averageAge: 21.2 }
// { _id: "Engineering", totalStudents: 38, averageAge: 22.1 }
// { _id: "Business", totalStudents: 32, averageAge: 20.8 }

// 2. Find top performing students per course
db.students.aggregate([
  {
    $match: { gpa: { $exists: true } } // Only students with GPA
  },
  {
    $group: {
      _id: "$course",
      topStudent: { $first: "$name" },
      highestGPA: { $max: "$gpa" },
      students: { $push: "$name" }
    }
  }
])

// 3. Complex pipeline: Course enrollment analysis
db.students.aggregate([
  // Stage 1: Filter active students
  { $match: { isActive: true } },
  
  // Stage 2: Group by course and year
  {
    $group: {
      _id: { 
        course: "$course", 
        year: "$year" 
      },
      count: { $sum: 1 },
      avgGPA: { $avg: "$gpa" },
      students: { $push: { name: "$name", gpa: "$gpa" } }
    }
  },
  
  // Stage 3: Sort results
  { $sort: { "_id.course": 1, "_id.year": 1 } },
  
  // Stage 4: Reshape output
  {
    $project: {
      course: "$_id.course",
      year: "$_id.year", 
      studentCount: "$count",
      averageGPA: { $round: ["$avgGPA", 2] },
      _id: 0
    }
  }
])
```

**Node.js with Mongoose Aggregations:**
```javascript
// Course statistics
const courseStats = await Student.aggregate([
  {
    $group: {
      _id: '$course',
      totalStudents: { $sum: 1 },
      averageAge: { $avg: '$age' },
      averageGPA: { $avg: '$gpa' }
    }
  },
  {
    $sort: { totalStudents: -1 }
  }
]);

// Find students needing academic support (GPA < 2.5)
const supportNeeded = await Student.aggregate([
  { $match: { gpa: { $lt: 2.5, $exists: true } } },
  {
    $group: {
      _id: '$course',
      studentsAtRisk: { $push: '$name' },
      count: { $sum: 1 },
      averageGPA: { $avg: '$gpa' }
    }
  }
]);

// Monthly enrollment trends
const enrollmentTrends = await Student.aggregate([
  {
    $group: {
      _id: {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' }
      },
      newEnrollments: { $sum: 1 }
    }
  },
  { $sort: { '_id.year': 1, '_id.month': 1 } }
]);
```

#### 🔥 Common Aggregation Operators:

**Grouping & Calculations:**
```javascript
$group: {
  _id: "$field",           // Group by field
  count: { $sum: 1 },      // Count documents
  total: { $sum: "$amount" }, // Sum values
  avg: { $avg: "$score" },    // Average
  max: { $max: "$grade" },    // Maximum value
  min: { $min: "$age" }       // Minimum value
}
```

**Filtering & Matching:**
```javascript
$match: { 
  age: { $gte: 18 },      // Age >= 18
  course: "Computer Science",
  isActive: true 
}
```

**Sorting & Limiting:**
```javascript
{ $sort: { gpa: -1 } },   // Sort by GPA descending
{ $limit: 10 },           // Get top 10
{ $skip: 20 }             // Skip first 20
```

### 🎯 Real-World Use Cases:

#### 1. **Student Performance Dashboard** 📊
```javascript
// Generate semester report
db.students.aggregate([
  { $match: { semester: "Fall 2024" } },
  {
    $group: {
      _id: "$course",
      totalStudents: { $sum: 1 },
      passRate: { 
        $avg: { $cond: [{ $gte: ["$gpa", 2.0] }, 1, 0] } 
      },
      averageGPA: { $avg: "$gpa" }
    }
  }
])
```

#### 2. **Resource Planning** 📚
```javascript
// Find courses needing more sections
db.students.aggregate([
  {
    $group: {
      _id: "$course",
      enrollmentCount: { $sum: 1 }
    }
  },
  { $match: { enrollmentCount: { $gt: 40 } } }, // Courses with >40 students
  { $sort: { enrollmentCount: -1 } }
])
```

### 💡 Pro Tips:
1. **Use indexes** for fields in `$match` stages 🎯
2. **Put `$match` early** in pipeline to reduce data processed ⚡  
3. **Use `$project`** to limit fields and reduce memory usage 💾
4. **Test aggregations** with small datasets first 🧪

## 📝 Practice Exercises: Time to Get Your Hands Dirty! 🛠️

### 🎯 Beginner Level: MUST University Student Management

#### Exercise 1: Database Setup & Basic CRUD
```javascript
// 1. Create database and connect
use mustUniversityPractice

// 2. Create your first student collection with these sample students:
db.students.insertMany([
  {
    studentId: "CS/2024/001",
    name: "Grace Wanjiku", 
    age: 20,
    course: "Computer Science",
    year: 2,
    email: "grace.wanjiku@must.ac.ke",
    gpa: 3.8,
    subjects: ["Data Structures", "Web Development", "Database Systems"],
    address: { county: "Meru", town: "Meru", hostel: "Block A" }
  },
  {
    studentId: "ENG/2024/002", 
    name: "John Kiprotich",
    age: 21,
    course: "Civil Engineering", 
    year: 3,
    email: "john.kiprotich@must.ac.ke",
    gpa: 3.6,
    subjects: ["Structural Analysis", "Fluid Mechanics", "Construction Management"],
    address: { county: "Uasin Gishu", town: "Eldoret", hostel: "Block C" }
  },
  {
    studentId: "BUS/2024/003",
    name: "Mary Akinyi",
    age: 19,
    course: "Business Administration", 
    year: 1,
    email: "mary.akinyi@must.ac.ke", 
    gpa: 3.9,
    subjects: ["Principles of Management", "Marketing", "Accounting"],
    address: { county: "Kisumu", town: "Kisumu", hostel: "Block B" }
  }
])

// 3. Practice Queries:
// Find all Computer Science students
db.students.find({ course: "Computer Science" })

// Find students with GPA > 3.7
db.students.find({ gpa: { $gt: 3.7 } })

// Find second-year students
db.students.find({ year: 2 })

// Update Grace's GPA to 3.9
db.students.updateOne(
  { name: "Grace Wanjiku" },
  { $set: { gpa: 3.9 } }
)

// Add a new subject to John's subjects array
db.students.updateOne(
  { name: "John Kiprotich" },
  { $push: { subjects: "Environmental Engineering" } }
)
```

#### Exercise 2: Advanced Queries & Filtering
```javascript
// 1. Find students from Meru county
db.students.find({ "address.county": "Meru" })

// 2. Find students whose names contain "John"
db.students.find({ name: /John/i }) // i = case insensitive

// 3. Find students taking "Marketing" subject
db.students.find({ subjects: "Marketing" })

// 4. Get only names and GPAs of all students
db.students.find({}, { name: 1, gpa: 1, _id: 0 })

// 5. Find top 2 students by GPA
db.students.find().sort({ gpa: -1 }).limit(2)
```

### 🎓 Intermediate Level: Course Management System

#### Exercise 3: Multiple Collections & References
```javascript
// Create courses collection
db.courses.insertMany([
  {
    courseCode: "CS201", 
    title: "Data Structures and Algorithms",
    instructor: "Dr. Peter Mwangi",
    credits: 4,
    department: "Computer Science",
    semester: "Fall 2024",
    maxStudents: 50,
    enrolledStudents: ["CS/2024/001"]
  },
  {
    courseCode: "ENG301",
    title: "Structural Analysis", 
    instructor: "Prof. Jane Wanjiru",
    credits: 3,
    department: "Civil Engineering", 
    semester: "Fall 2024",
    maxStudents: 30,
    enrolledStudents: ["ENG/2024/002"]
  }
])

// Create instructors collection
db.instructors.insertMany([
  {
    employeeId: "INST001",
    name: "Dr. Peter Mwangi",
    department: "Computer Science", 
    courses: ["CS201", "CS301"],
    officeHours: "Mon-Wed 2:00-4:00 PM",
    email: "peter.mwangi@must.ac.ke"
  },
  {
    employeeId: "INST002", 
    name: "Prof. Jane Wanjiru",
    department: "Civil Engineering",
    courses: ["ENG301", "ENG401"], 
    officeHours: "Tue-Thu 10:00-12:00 PM",
    email: "jane.wanjiru@must.ac.ke"
  }
])

// Practice: Find all courses taught by Dr. Peter Mwangi
db.courses.find({ instructor: "Dr. Peter Mwangi" })

// Find all Computer Science courses
db.courses.find({ department: "Computer Science" })
```

### 🚀 Advanced Level: Analytics & Aggregations

#### Exercise 4: University Statistics Dashboard
```javascript
// 1. Count students per course
db.students.aggregate([
  {
    $group: {
      _id: "$course",
      totalStudents: { $sum: 1 },
      averageGPA: { $avg: "$gpa" }
    }
  },
  { $sort: { totalStudents: -1 } }
])

// 2. Find average age per year of study
db.students.aggregate([
  {
    $group: {
      _id: "$year", 
      averageAge: { $avg: "$age" },
      studentCount: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
])

// 3. Performance analysis: Students needing academic support
db.students.aggregate([
  { $match: { gpa: { $lt: 3.0 } } },
  {
    $group: {
      _id: "$course",
      studentsAtRisk: { $push: "$name" },
      count: { $sum: 1 },
      averageGPA: { $avg: "$gpa" }
    }
  }
])

// 4. County-wise student distribution
db.students.aggregate([
  {
    $group: {
      _id: "$address.county",
      students: { $push: "$name" },
      count: { $sum: 1 }
    }
  },
  { $sort: { count: -1 } }
])
```

#### Exercise 5: Complex Queries & Indexing
```javascript
// Create useful indexes
db.students.createIndex({ course: 1, year: 1 })  // Compound index
db.students.createIndex({ gpa: -1 })              // GPA descending
db.students.createIndex({ email: 1 }, { unique: true }) // Unique email
db.students.createIndex({ name: "text", course: "text" }) // Text search

// Test text search
db.students.find({ $text: { $search: "Grace Computer" } })

// Explain query performance
db.students.find({ course: "Computer Science", year: 2 }).explain("executionStats")
```

### 🎪 Challenge Projects: Real-World Scenarios

#### Project 1: Library Management System 📚
Create collections for:
- `books` (title, author, isbn, category, available copies)
- `borrowers` (student info)  
- `transactions` (borrow/return history)

```javascript
// Sample structure:
db.books.insertOne({
  isbn: "978-0132350884",
  title: "Clean Code", 
  author: "Robert C. Martin",
  category: "Programming",
  totalCopies: 5,
  availableCopies: 3,
  borrowedBy: ["CS/2024/001", "CS/2024/002"]
})

db.transactions.insertOne({
  studentId: "CS/2024/001",
  isbn: "978-0132350884", 
  action: "borrow",
  date: new Date(),
  dueDate: new Date(Date.now() + 14*24*60*60*1000) // 2 weeks from now
})
```

#### Project 2: Event Management System 🎪
Create collections for:
- `events` (name, date, venue, organizer, attendees)
- `venues` (name, capacity, location)
- `registrations` (student, event, registration date)

### 🏆 Completion Checklist:
- [ ] **Basic CRUD**: Can insert, find, update, and delete student records
- [ ] **Queries**: Master filtering, sorting, and field selection
- [ ] **Arrays & Objects**: Work with nested data (address, subjects)
- [ ] **Aggregation**: Calculate statistics and generate reports
- [ ] **Indexes**: Create and use indexes for better performance  
- [ ] **Multiple Collections**: Design related collections with references
- [ ] **Real-World Project**: Complete at least one challenge project

### 💡 Pro Tips for Practice:
1. **Start with small datasets** – easier to see results 🔍
2. **Use `.pretty()`** in shell for readable output 👀
3. **Experiment fearlessly** – you can always recreate test data 🧪
4. **Check your results** – use `.count()` to verify operations ✅
5. **Document your queries** – comment complex aggregation pipelines 📝

**Remember**: The best way to learn MongoDB is by doing! Don't just read the commands – type them out and see the magic happen! ✨

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
