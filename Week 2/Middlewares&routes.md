# 🚀 Express.js Beginner Guide — Middleware & Routes

Welcome! This part of the guide focuses on Express middleware and routes — two core concepts you’ll use in almost every Express app.

---

## 🎯 Objective

- Understand what middleware is and the different types.  
- Learn how middleware affects the request-response cycle.  
- Create and organize routes using Express Router.  
- Practice with examples and exercises.

---

## 📖 What is Middleware?

Middleware are functions that run during the lifecycle of an HTTP request in Express. They sit between the incoming request and the final route handler, and they can:

- ✅ Modify request (req) and response (res) objects  
- ✅ Execute code (logging, auth checks, etc.)  
- ✅ Terminate a request early (e.g., return 401 Unauthorized)  
- ✅ Handle or forward errors

Middleware signature:
```js
function middleware(req, res, next) {
  // do something
  next(); // call next middleware/route
}
```

Error-handling middleware signature:
```js
function errorHandler(err, req, res, next) {
  // handle error
}
```

---

## 🔹 Types of Middleware

1. Built-in middleware (Express)
   - express.json(), express.urlencoded(), express.static()
2. Third-party middleware
   - morgan (logger), cors, helmet, multer
3. Custom middleware
   - Your own functions to implement logging, auth, validation, etc.
4. Router-level middleware
   - Middleware attached to an Express Router
5. Error-handling middleware
   - Catches errors passed with next(err)

---

## 🧠 Middleware Execution Order

Middleware executes in the order you register it. Order matters:
- app.use(express.json()) should come before routes that need parsed bodies.
- Authentication middleware should run before protected routes.
- Error-handling middleware must be defined after routes (last in chain).

Example order:
```text
1. global middleware (app.use)
2. router-level middleware (router.use)
3. route handlers (app.get/post/...)
4. 404 handler
5. error handler (app.use((err, req, res, next) => {}))
```

---

## 🛠️ Example: Built-in & Third-party

Built-in:
```js
app.use(express.json());       // parse JSON bodies
app.use(express.urlencoded({ extended: true })); // parse form bodies
```

Third-party:
```js
const cors = require('cors');
const morgan = require('morgan');

app.use(cors());               // enable CORS
app.use(morgan('dev'));        // HTTP request logger
```

---

## 🔹 Creating Custom Middleware

Simple logger:
```js
app.use((req, res, next) => {
  console.log(`Request received at ${new Date().toISOString()}`);
  next();
});
```

Auth-check middleware:
```js
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // verify token...
  next();
}
```

Async middleware (remember to handle errors):
```js
async function asyncMiddleware(req, res, next) {
  try {
    await someAsyncOperation();
    next();
  } catch (err) {
    next(err); // pass to error handler
  }
}
```

Error handling middleware:
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Server Error' });
});
```

---

## 🔁 Per-route and Router-level Middleware

Apply middleware to specific route:
```js
app.get('/protected', requireAuth, (req, res) => {
  res.send('Secret data');
});
```

Router-level:
```js
const router = express.Router();
router.use(requireAuth); // applies to all routes in this router
router.get('/', (req, res) => res.send('Only for authenticated users'));
app.use('/admin', router);
```

---

## 🛠️ Step-by-step: Creating Routes in Express.js

Basic route:
```js
app.get('/about', (req, res) => {
  res.send('About Us Page');
});
```

Route with parameter:
```js
app.get('/user/:id', (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});
```

Query parameters:
```js
// /search?q=term&page=2
app.get('/search', (req, res) => {
  const q = req.query.q;
  const page = req.query.page || 1;
  res.json({ q, page });
});
```

POST route that reads JSON:
```js
app.post('/users', (req, res) => {
  const body = req.body;
  // validate and save...
  res.status(201).json({ created: body });
});
```

---

## 🗂️ Organizing Routes (Best Practice)

- Use Routers to group related routes: routes/users.js, routes/auth.js
- Keep route handlers slim — delegate logic to controllers/services
- Example structure:
```
routes/
  users.js
controllers/
  usersController.js
middleware/
  logger.js
  auth.js
```

Mounting a router:
```js
const usersRouter = require('./routes/users');
app.use('/users', usersRouter);
```

---

## ✅ Practical Exercises (Beginner-friendly)

1. Add a logger middleware (timestamp + method + path).
2. Create an auth middleware that blocks requests without header `x-api-key`.
3. Protect POST /users with the auth middleware.
4. Create a router routes/posts.js and mount at /posts with sample GET/POST.
5. Implement simple validation on POST /users (name and email required).

Hints:
- Use req.headers to inspect incoming headers.
- Return res.status(400).json({ error: 'Message' }) for validation errors.
- Use next(err) when an async operation throws.

---

## 🧪 Testing Routes

- Browser: for GET endpoints
- curl:
  - GET: curl http://localhost:3000/about
  - POST: curl -X POST -H "Content-Type: application/json" -d '{"name":"A"}' http://localhost:3000/users
- Postman / Insomnia: easier UI for testing headers, body, and auth

---

## 💡 Tips & Common Gotchas

- Forgetting to call next() will hang the request.
- Middleware order matters — put body parsers before routes.
- Always validate/escape user input to avoid security issues.
- Return early in middleware if you want to terminate the request (e.g., auth fails).
- Put error handler after all routes and middleware.

---

## 🔭 Next Steps

- Try adding express-validator for request validation.
- Replace in-memory data with a database (MongoDB + Mongoose).
- Add tests for your middleware (Jest + Supertest).
- Build a small API that uses router-level middleware for auth.

---

Happy learning! ✨  
This README expands the starter project with focused middleware + routes lessons. For deep practice, see the companion lesson file below.