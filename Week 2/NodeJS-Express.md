# Week 2: Node.js & Express
# 🚀 Express.js Beginner Guide

Welcome! This README is a beginner-friendly, step-by-step guide to learning and building a basic Express.js server. It's designed for learners who are new to Node.js and Express and want to understand the fundamentals, set up a project, and explore common patterns used in real-world apps.

---

## 🎯 Objective

- Learn the fundamentals of Express.js.
- Set up a basic Express.js server.
- Understand the request-response cycle.
- Explore routes, middleware, error handling, and dev tooling.

---

## 📖 What is Express.js?

Express.js is a fast, unopinionated, and minimalist web framework for Node.js. It provides a robust set of features to build web and mobile applications.

Why use Express.js?  
✅ Minimal boilerplate  
✅ Simple routing and middleware support  
✅ Easy integration with databases (MongoDB, PostgreSQL, etc.)  
✅ Fast REST API development  
✅ Works well with Node.js async/await

---

## 🔹 Understanding the Request-Response Cycle

1. A client (browser, mobile app, or curl) makes an HTTP request (e.g., GET, POST).  
2. The server (Express app) receives and processes that request.  
3. The server sends back a response with data (HTML, JSON, text) or an error code.

This cycle happens for every request and can be augmented by middleware that runs before or after route handlers.

---

## 🛠️ Step 1 — Install Node.js using NVM (recommended)

Using NVM lets you manage multiple Node versions.

### 📌 Windows
- Use nvm-windows: https://github.com/coreybutler/nvm-windows  
- Run installer, restart terminal.

Verify:
```bash
nvm version
```

### 📌 macOS / Linux
Install NVM:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
Restart terminal and verify:
```bash
nvm --version
```

Install Node:
```bash
nvm install node    # installs latest LTS / latest
nvm use node
node -v             # verify
```

---

## 🛠️ Step 2 — Create an Express.js Project

Initialize:
```bash
mkdir express-app && cd express-app
npm init -y
npm install express
```

Project structure (starter)
```
express-app/
├─ server.js
├─ package.json
├─ node_modules/
└─ README.md
```

---

## 📝 server.js — Basic Server

Create `server.js`:
```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Built-in middleware to parse JSON bodies
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

Run:
```bash
node server.js
# or use nodemon for development:
# npx nodemon server.js
```

Open: http://localhost:3000/

---

## 🔹 Common Routes & Examples

GET:
```js
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from GET' });
});
```

POST (receives JSON body):
```js
app.post('/api/echo', (req, res) => {
  const body = req.body;
  res.status(201).json({ received: body });
});
```

Route params and query:
```js
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;           // route param
  const filter = req.query.filter;        // query param ?filter=...
  res.json({ userId, filter });
});
```

PUT / DELETE:
```js
app.put('/items/:id', (req, res) => { /* update item */ });
app.delete('/items/:id', (req, res) => { /* delete item */ });
```

---

## 🧩 Middleware (What & How)

Middleware are functions that run during request processing. Types:
- Application-level (app.use)
- Router-level
- Error-handling middleware
- Third-party (CORS, body parser, logger)
- Built-in (express.json(), express.urlencoded())

Example of middleware:
```js
// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
```

Error-handling middleware:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});
```

---

## 🔁 Async Routes & Error Handling

Use async/await in route handlers, and ensure errors are passed to the error handler:

```js
app.get('/data', async (req, res, next) => {
  try {
    const data = await someAsyncOperation();
    res.json(data);
  } catch (err) {
    next(err); // Passes to error middleware
  }
});
```

Tip: use helper wrappers to avoid repeating try/catch (many helper libraries exist).

---

## 🔐 Environment Variables (.env)

Store secrets in `.env` and load with dotenv:
```bash
npm install dotenv
```

Example `.env`:
```
PORT=4000
MONGO_URI=mongodb://localhost:27017/mydb
```

Load in `server.js`:
```js
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

Never commit `.env` to version control.

---

## ⚙️ Dev tooling

- nodemon for auto-restarts:
  ```bash
  npm install --save-dev nodemon
  ```
  Add to package.json:
  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```

- eslint + prettier for code quality.

---

## 🌐 CORS

If your frontend runs on another origin, enable CORS:
```bash
npm install cors
```
```js
const cors = require('cors');
app.use(cors()); // Allow all for dev; configure in prod
```

---

## 🗂️ Organizing Routes (Example)

Break routes into files:

routes/users.js
```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { res.send('users list'); });
router.get('/:id', (req, res) => { res.send(`user ${req.params.id}`); });

module.exports = router;
```

In `server.js`:
```js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

---

## 💾 Databases (Quick note)

Express works with any database. Example with MongoDB + Mongoose:
```bash
npm install mongoose
```
Then connect:
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
```

---

## 📡 Testing Endpoints

- Browser for GET routes.
- curl:
  ```bash
  curl http://localhost:3000/api/hello
  curl -X POST -H "Content-Type: application/json" -d '{"name":"Bob"}' http://localhost:3000/api/echo
  ```
- Postman / Insomnia for advanced testing

---

## ✅ Best Practices & Tips

- Use express.json() to parse JSON request bodies.
- Return proper HTTP status codes:
  - 200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Internal Server Error
- Centralize error handling with an error middleware.
- Keep routes small and focused (single responsibility).
- Use environment variables for configuration.
- Use a process manager (PM2) or containerization for production.
- Validate input (Joi, celebrate, express-validator).

---

## 🧭 Next Steps / Further Learning

- Add authentication (JWT or sessions)
- Learn database modeling and ORM/ODM (Sequelize, Mongoose)
- Implement testing (Jest + Supertest)
- Explore GraphQL with Express (apollo-server-express)
- Deploy to a cloud provider (Heroku, Vercel, DigitalOcean, AWS)

---

## 📚 Useful Resources

- Express docs: https://expressjs.com/  
- Node.js docs: https://nodejs.org/  
- MDN Web Docs (HTTP): https://developer.mozilla.org/en-US/docs/Web/HTTP  
- Mongoose: https://mongoosejs.com/  
- Postman: https://www.postman.com/

---

## ❓ FAQ (Short)

Q: Do I need Express to build a Node server?  
A: No — Node's http module can be used directly, but Express provides helpful abstractions and middleware.

Q: Is Express still relevant?  
A: Yes — Express remains one of the most popular web frameworks for Node.js and is widely used in production.

---

## 📝 Example: Full Minimal Project (copy-paste)

server.js
```js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello, Express.js!'));

app.post('/echo', (req, res) => {
  res.status(201).json({ youSent: req.body });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

package.json (scripts)
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

---

## 🤝 Contributing

If you're learning and want to contribute improvements to this guide, feel free to open issues or PRs. Keep changes focused and beginner-friendly!

---

## 🧾 License

This guide is free to use — adapt it for learning or teaching.

---

Happy coding! 💻✨