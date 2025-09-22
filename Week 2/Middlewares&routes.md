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



# 📚 Week 2: Additional Resources for Express.js

Welcome to Week 2! Here are carefully curated resources for deepening your Express.js knowledge, including official documentation, security essentials, testing, deployment, and must-use libraries.[^1]

***

## 🌟 Official Documentation \& Guides

- [Express.js Official Documentation](https://expressjs.com/) – The definitive resource to understand Express.js, straight from the creators.[^1]
- [Node.js Official Documentation](https://nodejs.org/en/docs/) – Comprehensive docs of Node.js, its modules, and best practices.[^1]
- [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm) – A handy tool to install and manage multiple Node.js versions on your system.[^1]
- [MDN Web Docs – HTTP Request Methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) – Deep dive into crucial HTTP methods used in building REST APIs.[^1]

***

## 🔧 Middleware \& Security

- [Middleware in Express.js](https://expressjs.com/en/guide/using-middleware.html) – Learn how to harness middleware in Express for powerful request handling.[^1]
- [CORS in Express.js](https://expressjs.com/en/resources/middleware/cors.html) – Official guide to enabling Cross-Origin Resource Sharing in Express.[^1]
- [Helmet.js – Security Middleware](https://helmetjs.github.io/) – Secure your Express apps by setting various HTTP headers.[^1]
- [OWASP Node.js Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html) – Community-driven best practices for Node.js security.[^1]

***

## 🔄 REST API Design \& Best Practices

- [REST API Best Practices](https://restfulapi.net/) – Comprehensive guide for structuring high-quality APIs.[^1]
- [API Versioning in Express.js](https://cloud.google.com/blog/topics/developers-practitioners/api-design-everything-you-need-know-about-versioning-rest-apis) – Learn why and how to version your APIs for maintainability.[^1]
- [Pagination in REST APIs](https://jsonapi.org/format/#fetching-pagination) – Best practices for handling large datasets efficiently.[^1]

***

## 🧪 Testing \& Debugging

- [Jest for Node.js Testing](https://jestjs.io/docs/getting-started) – A beginner-friendly guide to automated testing in Node.js.[^1]
- [Supertest for API Testing](https://github.com/visionmedia/supertest) – A powerful tool for testing HTTP endpoints in Express.[^1]
- [Postman API Testing](https://learning.postman.com/docs/getting-started/introduction/) – Learn to manually test your APIs using Postman.[^1]
- [Debugging in Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/) – Official guide to debugging Node.js apps efficiently.[^1]

***

## 🔥 Deployment \& DevOps

- [Deploy Express.js on Render](https://render.com/docs/deploy-node-express-app) – Step-by-step guide to deploying Express apps on Render.[^1]
- [Using PM2 for Process Management](https://pm2.keymetrics.io/) – Keep your Express server stable and running in production environments.[^1]
- [Logging in Express.js with Winston](https://github.com/winstonjs/winston) – Learn robust logging strategies for Express apps.[^1]
- [GitHub Actions for CI/CD](https://docs.github.com/en/actions/learn-github-actions) – Automate deployment and development workflows with GitHub Actions.[^1]

***

## 🛠️ Additional Tools \& Libraries

- [Swagger for API Documentation](https://swagger.io/docs/) – Automatically generate interactive API docs.[^1]
- [Morgan – Request Logging Middleware](https://expressjs.com/en/resources/middleware/morgan.html) – Elegant HTTP request logging for Express apps.[^1]
- [Socket.io – Real-Time Communication](https://socket.io/) – Add real-time event-based communication to your Express apps.[^1]
- [GraphQL with Express.js](https://graphql.org/graphql-js/express-graphql/) – Build powerful GraphQL APIs using Express.js.[^1]

***

Feel free to explore each link and deepen your week’s learning experience!

<div style="text-align: center">⁂</div>

[^1]: https://expressjs.com

