# 🚀 Advanced JavaScript: Learn by Building

A practical, beginner-friendly lesson for the MUST Web Community.

> **Teaching goal:** By the end of this session, learners should understand how modern JavaScript handles data, waits for slow work, talks to APIs, stores data, and updates a web page.

## ⏱️ Suggested session plan

- **10 minutes:** What makes JavaScript “advanced”?
- **25 minutes:** Modern syntax and array methods
- **30 minutes:** Promises, `async`/`await`, and error handling
- **25 minutes:** Fetching data from an API
- **60 minutes:** Community Directory capstone
- **45+ minutes:** Choose extra projects below
- **10 minutes:** Recap and challenges

## ✅ Prerequisites

Learners should know variables, functions, arrays, objects, conditionals, and basic HTML/CSS.

## 🧰 Setup

Install Node.js for the terminal examples:

```bash
node --version
```

For browser projects, use the **Live Server** extension in VS Code. Each browser project below uses only HTML, CSS, and JavaScript. No paid services or API keys are required.

---

## 1. Modern JavaScript: writing less code clearly

### `const`, `let`, arrow functions, and template literals

Use `const` when a variable will not be reassigned. Use `let` when it will change. Avoid `var` in new code.

Create `01-modern-syntax.js`:

```javascript
const community = 'MUST Web Community';
let learners = 5;

learners += 1;

const add = (firstNumber, secondNumber) => firstNumber + secondNumber;
const greet = name => `Hello, ${name}!`;

console.log(`${community} now has ${learners} learners.`);
console.log(add(4, 6));
console.log(greet('Amina'));
```

Run it:

```bash
node 01-modern-syntax.js
```

**Try it:** Change the name, add a `multiply` function, and calculate the cost of two products.

### Destructuring and spread

Destructuring means taking values out of an object or array. Spread means copying or combining values.

```javascript
const learner = {
    name: 'Brian',
    course: 'JavaScript',
    location: 'Nairobi'
};

const { name, course } = learner;
const updatedLearner = {
    ...learner,
    level: 'Intermediate'
};

console.log(`${name} is learning ${course}.`);
console.log(updatedLearner);
```

If the same property appears twice, the later spread wins:

```javascript
const firstSettings = { theme: 'light', fontSize: 16 };
const secondSettings = { theme: 'dark' };
const settings = { ...firstSettings, ...secondSettings };

console.log(settings); // { theme: 'dark', fontSize: 16 }
```

---

## 2. Array methods: `map`, `filter`, and `reduce`

Think of these methods as three tools:

- **`map`**: transform every item.
- **`filter`**: keep only items that match a condition.
- **`reduce`**: combine many items into one result.

Create `02-array-methods.js`:

```javascript
const products = [
    { name: 'Notebook', price: 250, inStock: true },
    { name: 'Pen', price: 50, inStock: true },
    { name: 'Backpack', price: 1800, inStock: false },
    { name: 'Water bottle', price: 600, inStock: true }
];

const productNames = products.map(product => product.name);
const availableProducts = products.filter(product => product.inStock);
const totalPrice = products.reduce((total, product) => total + product.price, 0);

console.log('Names:', productNames);
console.log('Available:', availableProducts);
console.log('Total price:', totalPrice);

const affordableAvailableNames = products
    .filter(product => product.inStock)
    .filter(product => product.price < 1000)
    .map(product => product.name);

console.log('Affordable:', affordableAvailableNames);
```

Run it:

```bash
node 02-array-methods.js
```

**Try it:** Find products costing more than 500 and calculate the total price of only the available products.

> **Common mistake:** `map` does not remove items. Use `filter` when the result should contain fewer items.

---

## 3. Asynchronous JavaScript

Some work takes time: a network request, a timer, or reading a file. JavaScript can start that work and continue doing other work instead of freezing the whole page.

```javascript
console.log('1. Start');

setTimeout(() => {
    console.log('3. Timer finished');
}, 1000);

console.log('2. JavaScript continues');
```

Expected output:

```text
1. Start
2. JavaScript continues
3. Timer finished
```

### Promises and `async`/`await`

A Promise is a value that will be ready later. It can be pending, fulfilled, or rejected.

Create `03-async.js`:

```javascript
const wait = milliseconds => new Promise(resolve => {
    setTimeout(resolve, milliseconds);
});

async function runLesson() {
    console.log('Starting...');
    await wait(1000);
    console.log('One second later...');
    await wait(1000);
    console.log('Two seconds later.');
}

runLesson();
```

Run it:

```bash
node 03-async.js
```

### Handling errors

```javascript
const getScore = async () => {
    const score = 45;

    if (score < 50) {
        throw new Error('The score is below the pass mark.');
    }

    return score;
};

async function showScore() {
    try {
        const score = await getScore();
        console.log(`Score: ${score}`);
    } catch (error) {
        console.error(`Could not load score: ${error.message}`);
    }
}

showScore();
```

**Interactive question:** Which line runs first? Ask learners to predict before running the file.

---

## 4. Fetching data from an API

An API is a service that gives our application data. `fetch` makes a network request and returns a Promise.

Create `04-fetch-users.js`:

```javascript
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Could not fetch users: ${error.message}`);
        return [];
    }
}

async function main() {
    const users = await fetchUsers();
    const names = users.map(user => user.name);
    console.log(names);
}

main();
```

Run it with Node.js 18 or newer:

```bash
node 04-fetch-users.js
```

### Fetching in parallel

Use `Promise.all` when requests do not depend on one another:

```javascript
async function loadEverything() {
    const [usersResponse, postsResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users'),
        fetch('https://jsonplaceholder.typicode.com/posts')
    ]);

    if (!usersResponse.ok || !postsResponse.ok) {
        throw new Error('One of the requests failed.');
    }

    const [users, posts] = await Promise.all([
        usersResponse.json(),
        postsResponse.json()
    ]);

    console.log(`Loaded ${users.length} users and ${posts.length} posts.`);
}

loadEverything().catch(error => console.error(error.message));
```

> Do not put real API keys in public teaching files. Use a backend or local sample data when an API requires a secret.

---

# 🧩 Project 1: Community Directory capstone

This project combines `async`/`await`, `fetch`, loading and error states, DOM updates, destructuring, spread syntax, `filter`, `map`, and a search box.

## Folder structure

```text
community-directory/
├── index.html
├── style.css
└── app.js
```

### `index.html`

````html name=index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Community Directory</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <h1>🌍 Community Directory</h1>
        <p>Search for community members fetched from an API.</p>

        <label for="searchInput">Search members</label>
        <input id="searchInput" type="search" placeholder="Try Nairobi or Alice">

        <p id="status" role="status">Loading members...</p>
        <section id="members" class="members-grid" aria-live="polite"></section>
    </main>

    <script src="app.js"></script>
</body>
</html>
````

### `style.css`

````css name=style.css
* { box-sizing: border-box; }

body {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #eef2ff;
    color: #172554;
}

.container {
    width: min(100% - 2rem, 1000px);
    margin: 0 auto;
    padding: 2rem 0;
}

label { display: block; margin-top: 1.5rem; font-weight: 700; }

input {
    width: 100%;
    margin: .5rem 0 1rem;
    padding: .8rem;
    border: 2px solid #c7d2fe;
    border-radius: .5rem;
    font-size: 1rem;
}

.members-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 1rem;
}

.card {
    padding: 1rem;
    background: white;
    border-radius: .75rem;
    box-shadow: 0 4px 12px rgb(30 41 59 / 12%);
}

.card h2 { margin-top: 0; color: #4338ca; }
.error { color: #b91c1c; font-weight: 700; }
````

### `app.js`

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com/users';
const membersElement = document.querySelector('#members');
const statusElement = document.querySelector('#status');
const searchInput = document.querySelector('#searchInput');

let members = [];

async function loadMembers() {
    try {
        statusElement.textContent = 'Loading members...';
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }

        members = await response.json();
        renderMembers(members);
        statusElement.textContent = `${members.length} members loaded.`;
    } catch (error) {
        statusElement.textContent = `Error: ${error.message}`;
        statusElement.className = 'error';
    }
}

function renderMembers(list) {
    if (list.length === 0) {
        membersElement.innerHTML = '<p>No members match your search.</p>';
        return;
    }

    membersElement.innerHTML = list.map(member => {
        const { name, email, address, company } = member;
        const { city } = address;

        return `
            <article class="card">
                <h2>${name}</h2>
                <p>📧 ${email}</p>
                <p>📍 ${city}</p>
                <p>🏢 ${company.name}</p>
            </article>
        `;
    }).join('');
}

searchInput.addEventListener('input', event => {
    const searchTerm = event.target.value.toLowerCase().trim();

    const filteredMembers = members.filter(member => {
        const searchableText = [
            member.name,
            member.email,
            member.address.city,
            member.company.name
        ].join(' ').toLowerCase();

        return searchableText.includes(searchTerm);
    });

    renderMembers(filteredMembers);
    statusElement.textContent = `${filteredMembers.length} result(s).`;
});

loadMembers();
```

Run with Live Server, then search for `Nairobi`, `Alice`, or a company name.

---

# 🧩 Project 2: Interactive Shopping Cart

This project is excellent for teaching `map`, `filter`, `reduce`, spread, event listeners, and state updates. It uses local data, so it works without an internet connection.

## Folder structure

```text
shopping-cart/
├── index.html
├── style.css
└── app.js
```

### `index.html`

````html name=shopping-cart/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopping Cart</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <h1>🛒 Campus Shop</h1>
        <div id="products" class="grid"></div>
        <aside class="cart">
            <h2>Your cart</h2>
            <div id="cartItems"></div>
            <strong id="total">Total: KSh 0</strong>
        </aside>
    </main>
    <script src="app.js"></script>
</body>
</html>
````

### `style.css`

````css name=shopping-cart/style.css
* { box-sizing: border-box; }
body { margin: 0; font-family: system-ui, sans-serif; background: #f8fafc; color: #172554; }
.container { width: min(100% - 2rem, 900px); margin: auto; padding: 2rem 0; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.card, .cart { background: white; padding: 1rem; border-radius: .75rem; box-shadow: 0 3px 12px rgb(0 0 0 / 10%); }
.cart { margin-top: 1.5rem; }
button { border: 0; padding: .6rem .8rem; border-radius: .4rem; cursor: pointer; background: #4f46e5; color: white; }
button:hover { background: #3730a3; }
.cart-row { display: flex; justify-content: space-between; gap: .5rem; padding: .5rem 0; border-bottom: 1px solid #e2e8f0; }
````

### `app.js`

```javascript
const products = [
    { id: 1, name: 'Notebook', price: 250 },
    { id: 2, name: 'Water bottle', price: 600 },
    { id: 3, name: 'Backpack', price: 1800 },
    { id: 4, name: 'Pen', price: 50 }
];

let cart = [];
const productsElement = document.querySelector('#products');
const cartItemsElement = document.querySelector('#cartItems');
const totalElement = document.querySelector('#total');

function formatMoney(amount) {
    return `KSh ${amount.toLocaleString()}`;
}

function renderProducts() {
    productsElement.innerHTML = products.map(product => `
        <article class="card">
            <h2>${product.name}</h2>
            <p>${formatMoney(product.price)}</p>
            <button data-product-id="${product.id}">Add to cart</button>
        </article>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    cart = [...cart, product];
    renderCart();
}

function removeFromCart(indexToRemove) {
    cart = cart.filter((_, index) => index !== indexToRemove);
    renderCart();
}

function renderCart() {
    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<p>Your cart is empty.</p>';
        totalElement.textContent = 'Total: KSh 0';
        return;
    }

    cartItemsElement.innerHTML = cart.map((product, index) => `
        <div class="cart-row">
            <span>${product.name}</span>
            <span>${formatMoney(product.price)}</span>
            <button data-remove-index="${index}">Remove</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, product) => sum + product.price, 0);
    totalElement.textContent = `Total: ${formatMoney(total)}`;
}

productsElement.addEventListener('click', event => {
    const productId = Number(event.target.dataset.productId);
    if (productId) addToCart(productId);
});

cartItemsElement.addEventListener('click', event => {
    const index = Number(event.target.dataset.removeIndex);
    if (!Number.isNaN(index)) removeFromCart(index);
});

renderProducts();
renderCart();
```

**Teaching focus:** Explain that `cart = [...cart, product]` creates a new array instead of changing the old array directly.

**Challenges:** Add quantities, a checkout button, or a search box for products.

---

# 🧩 Project 3: Quiz App with score and restart

This project teaches arrays of objects, DOM events, conditional rendering, `map`, and state.

## Folder structure

```text
quiz-app/
├── index.html
├── style.css
└── app.js
```

### `index.html`

````html name=quiz-app/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Quiz</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="quiz-box">
        <h1>🧠 JavaScript Quiz</h1>
        <p id="progress"></p>
        <h2 id="question"></h2>
        <div id="answers"></div>
        <p id="feedback"></p>
        <button id="nextButton" hidden>Next question</button>
    </main>
    <script src="app.js"></script>
</body>
</html>
````

### `style.css`

````css name=quiz-app/style.css
body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, sans-serif; background: #dbeafe; color: #172554; }
.quiz-box { width: min(100% - 2rem, 600px); padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 8px 24px rgb(0 0 0 / 12%); }
.answer { display: block; width: 100%; margin: .7rem 0; padding: .8rem; border: 1px solid #93c5fd; border-radius: .5rem; background: #eff6ff; text-align: left; cursor: pointer; }
.answer:hover { background: #bfdbfe; }
button { padding: .7rem 1rem; border: 0; border-radius: .5rem; background: #2563eb; color: white; cursor: pointer; }
````

### `app.js`

```javascript
const questions = [
    {
        question: 'Which keyword creates a variable that should not be reassigned?',
        answers: ['var', 'const', 'change', 'static'],
        correctAnswer: 'const'
    },
    {
        question: 'Which method creates a new array by transforming every item?',
        answers: ['filter', 'reduce', 'map', 'find'],
        correctAnswer: 'map'
    },
    {
        question: 'Which keyword waits for a Promise inside an async function?',
        answers: ['pause', 'await', 'waitFor', 'hold'],
        correctAnswer: 'await'
    }
];

let currentQuestionIndex = 0;
let score = 0;

const progressElement = document.querySelector('#progress');
const questionElement = document.querySelector('#question');
const answersElement = document.querySelector('#answers');
const feedbackElement = document.querySelector('#feedback');
const nextButton = document.querySelector('#nextButton');

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const { question, answers } = currentQuestion;

    progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.textContent = question;
    feedbackElement.textContent = '';
    nextButton.hidden = true;

    answersElement.innerHTML = answers.map(answer => `
        <button class="answer" data-answer="${answer}">${answer}</button>
    `).join('');
}

function finishQuiz() {
    questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
    progressElement.textContent = 'Quiz complete';
    answersElement.innerHTML = '';
    feedbackElement.textContent = 'Great work! Refresh the page to try again.';
    nextButton.hidden = true;
}

answersElement.addEventListener('click', event => {
    const selectedAnswer = event.target.dataset.answer;
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
        score += 1;
        feedbackElement.textContent = '✅ Correct!';
    } else {
        feedbackElement.textContent = `❌ Correct answer: ${questions[currentQuestionIndex].correctAnswer}`;
    }

    nextButton.hidden = false;
});

nextButton.addEventListener('click', () => {
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        finishQuiz();
    }
});

renderQuestion();
```

**Teaching focus:** Ask learners to identify where state is stored: `currentQuestionIndex` and `score`.

**Challenges:** Add a restart button, a timer, or a progress bar.

---

# 🧩 Project 4: Notes app with `localStorage`

This project introduces browser storage. Notes remain after refreshing the page.

## Folder structure

```text
notes-app/
├── index.html
├── style.css
└── app.js
```

### `index.html`

````html name=notes-app/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes App</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <main class="container">
        <h1>📝 My Notes</h1>
        <form id="noteForm">
            <input id="noteInput" required placeholder="Write a note...">
            <button>Add note</button>
        </form>
        <ul id="notes"></ul>
    </main>
    <script src="app.js"></script>
</body>
</html>
````

### `style.css`

````css name=notes-app/style.css
body { margin: 0; font-family: system-ui, sans-serif; background: #fefce8; color: #422006; }
.container { width: min(100% - 2rem, 700px); margin: auto; padding: 2rem 0; }
form { display: flex; gap: .5rem; }
input { flex: 1; padding: .8rem; border: 1px solid #facc15; border-radius: .5rem; }
button { padding: .8rem 1rem; border: 0; border-radius: .5rem; background: #ca8a04; color: white; cursor: pointer; }
li { display: flex; justify-content: space-between; gap: 1rem; margin: .7rem 0; padding: .8rem; background: white; border-radius: .5rem; }
.delete { background: #dc2626; }
````

### `app.js`

```javascript
const form = document.querySelector('#noteForm');
const input = document.querySelector('#noteInput');
const notesElement = document.querySelector('#notes');

let notes = JSON.parse(localStorage.getItem('notes')) ?? [];

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    notesElement.innerHTML = notes.map((note, index) => `
        <li>
            <span>${note}</span>
            <button class="delete" data-index="${index}">Delete</button>
        </li>
    `).join('');
}

form.addEventListener('submit', event => {
    event.preventDefault();

    const note = input.value.trim();
    if (!note) return;

    notes = [...notes, note];
    saveNotes();
    renderNotes();
    form.reset();
    input.focus();
});

notesElement.addEventListener('click', event => {
    const index = Number(event.target.dataset.index);
    if (Number.isNaN(index)) return;

    notes = notes.filter((_, noteIndex) => noteIndex !== index);
    saveNotes();
    renderNotes();
});

renderNotes();
```

**Teaching focus:** Explain that `localStorage` stores strings, so arrays are converted with `JSON.stringify` and restored with `JSON.parse`.

**Challenges:** Add edit functionality, note colors, or a search input.

---

# 🧩 Project 5: GitHub profile viewer

This is an optional API project. It uses the public GitHub API and does not require a key for a small teaching demonstration.

### `index.html`

````html name=github-viewer/index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GitHub Profile Viewer</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 700px; margin: auto; padding: 2rem; background: #f1f5f9; }
        form { display: flex; gap: .5rem; }
        input, button { padding: .7rem; }
        button { cursor: pointer; }
        #profile { margin-top: 1rem; padding: 1rem; background: white; border-radius: .75rem; }
        img { width: 100px; border-radius: 50%; }
        .error { color: #b91c1c; }
    </style>
</head>
<body>
    <h1>🐙 GitHub Profile Viewer</h1>
    <form id="profileForm">
        <input id="username" required placeholder="Try octocat">
        <button>Search</button>
    </form>
    <p id="status"></p>
    <section id="profile"></section>
    <script src="app.js"></script>
</body>
</html>
````

### `app.js`

```javascript
const form = document.querySelector('#profileForm');
const usernameInput = document.querySelector('#username');
const statusElement = document.querySelector('#status');
const profileElement = document.querySelector('#profile');

form.addEventListener('submit', async event => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    if (!username) return;

    statusElement.textContent = 'Loading profile...';
    profileElement.innerHTML = '';

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error('User was not found.');
        }

        const profile = await response.json();
        const { avatar_url, name, login, bio, public_repos, html_url } = profile;

        profileElement.innerHTML = `
            <img src="${avatar_url}" alt="${login}'s avatar">
            <h2>${name ?? login}</h2>
            <p>${bio ?? 'This user has no biography.'}</p>
            <p>Public repositories: ${public_repos}</p>
            <a href="${html_url}" target="_blank" rel="noreferrer">View GitHub profile</a>
        `;
        statusElement.textContent = 'Profile loaded.';
    } catch (error) {
        statusElement.textContent = error.message;
        statusElement.className = 'error';
    }
});
```

**Teaching focus:** This project is useful for showing a complete request lifecycle: form submission, loading state, successful response, destructuring, and error state.

> **Security note:** Never insert untrusted API text into `innerHTML` in a production application without escaping it. For a production app, create DOM elements with `textContent` where possible.

---

## 🧠 Common mistakes and debugging tips

### `fetch` works but no data appears

You must convert the response to JSON and wait for it:

```javascript
const response = await fetch(url);
const data = await response.json();
```

### A 404 does not enter `catch`

Check `response.ok` manually and throw an error when it is false.

### `map` returns unexpected text

Use `.join('')` when converting an array of HTML strings into one HTML string.

### `undefined` appears on the page

Inspect the object with `console.log(object)` and verify the property path.

### The browser shows a CORS error

Run projects with Live Server and use APIs that allow browser requests. Do not bypass browser security restrictions.

### The page is blank

Open DevTools with `F12`, check the **Console**, and read the first error from top to bottom.

### The app works once but not after refreshing

Check whether your variables are reset on page load. For persistent data, use `localStorage` as shown in the Notes App.

---

## 🎓 Final recap

Ask learners to explain these in their own words:

1. What is the difference between synchronous and asynchronous code?
2. What does `await` wait for?
3. Why do we check `response.ok`?
4. When would you use `map`, `filter`, and `reduce`?
5. What does destructuring do?
6. Why do we show loading and error states?
7. What is the difference between `localStorage` and a normal variable?
8. Why should we avoid exposing API keys in frontend code?

### Live-demo checklist

- [ ] Ask learners to predict output before running code.
- [ ] Run each small example in the VS Code terminal.
- [ ] Change one value and run it again.
- [ ] Use `console.log` to inspect arrays and objects.
- [ ] Build the Community Directory in small steps.
- [ ] Demonstrate one successful request and one failed request.
- [ ] Let learners choose one extra project.
- [ ] Leave time for at least one extension challenge.

> **Main lesson:** Modern JavaScript helps us transform data, wait for slow work, handle errors, store information, and create useful interactive applications.

**Happy coding! 💻✨**
