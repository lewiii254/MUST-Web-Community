# 🚀 Advanced JavaScript: Learn by Building

A practical, beginner-friendly lesson for the MUST Web Community.

> **Teaching goal:** By the end of this session, learners should understand how modern JavaScript handles data, waits for slow work, talks to APIs, and updates a web page.

## ⏱️ Suggested session plan

- **10 minutes:** What makes JavaScript “advanced”?
- **20 minutes:** Modern syntax: `const`, `let`, arrow functions, template literals, destructuring, and spread
- **25 minutes:** `map`, `filter`, and `reduce`
- **30 minutes:** Asynchronous JavaScript and `async`/`await`
- **25 minutes:** Fetching data from an API
- **60 minutes:** Capstone project: Community Directory
- **10 minutes:** Recap and challenges

## ✅ Prerequisites

Learners should know variables, functions, arrays, objects, conditionals, and basic HTML/CSS.

## 🧰 Setup

Install **Node.js** to run the small JavaScript examples:

```bash
node --version
```

For the browser project, create the files shown in the project section, then open `index.html` with the **Live Server** extension in VS Code. Live Server is recommended because browsers may block API requests when an HTML file is opened directly.

---

## 1. Modern JavaScript: writing less code clearly

### `const` and `let`

Use `const` when a variable will not be reassigned. Use `let` when it will change. Avoid `var` in new code.

Create `01-modern-syntax.js`:

```javascript
const community = 'MUST Web Community';
let learners = 5;

learners += 1;

console.log(`${community} now has ${learners} learners.`);
```

Run it:

```bash
node 01-modern-syntax.js
```

Expected output:

```text
MUST Web Community now has 6 learners.
```

### Arrow functions and template literals

An arrow function is a shorter way to write a function. A template literal lets us insert values inside a string using `${...}`.

```javascript
const add = (firstNumber, secondNumber) => firstNumber + secondNumber;
const greet = name => `Hello, ${name}!`;

console.log(add(4, 6));
console.log(greet('Amina'));
```

**Try it:** Change the name and calculate the price of two products.

### Destructuring and spread

Destructuring means “take values out of an object or array.” Spread means “copy or combine values.”

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

**Ask learners:** What happens if we change `level` in a second object spread after the first spread? The later value wins.

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
```

Run it:

```bash
node 02-array-methods.js
```

### Chaining methods

```javascript
const affordableAvailableNames = products
    .filter(product => product.inStock)
    .filter(product => product.price < 1000)
    .map(product => product.name);

console.log(affordableAvailableNames);
```

Expected output:

```text
[ 'Notebook', 'Pen', 'Water bottle' ]
```

**Try it:** Find products costing more than 500. Then calculate the total price of only the available products.

> **Common mistake:** `map` does not remove items. Use `filter` when the result should contain fewer items.

---

## 3. Asynchronous JavaScript: waiting without freezing the page

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

### Promises

A Promise is a value that will be ready later. It can be pending, fulfilled, or rejected.

```javascript
const wait = milliseconds => new Promise(resolve => {
    setTimeout(resolve, milliseconds);
});

wait(1000).then(() => {
    console.log('The promise finished after one second.');
});
```

### `async` and `await`

`async` allows a function to use `await`. `await` pauses that function until a Promise finishes; it does not freeze the entire browser.

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

**Interactive question:** Which message appears first? Ask learners to predict before running the file.

### Handling errors with `try...catch`

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

**Key idea:** Code that might fail belongs inside `try`; the response to failure belongs inside `catch`.

---

## 4. Fetching data from an API

An API is a service that gives our application data. `fetch` makes a network request and returns a Promise.

Create `04-fetch-users.js`:

```javascript
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // fetch does not reject automatically for HTTP 404 or 500 responses.
        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const users = await response.json();
        return users;
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

If your Node.js version is older and `fetch` is unavailable, run this example in the browser or install a current Node.js version.

### Fetching in parallel

When requests do not depend on each other, use `Promise.all` so they can run at the same time:

```javascript
async function loadEverything() {
    const [users, posts] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(response => response.json())
    ]);

    console.log(`Loaded ${users.length} users and ${posts.length} posts.`);
}

loadEverything().catch(error => console.error(error));
```

> Do not use real API keys in teaching files or public repositories. If an API needs a key, use a backend or a local mock dataset instead.

---

# 🧩 Capstone project: Community Directory

This project combines:

- `async`/`await`
- `fetch`
- loading and error states
- DOM updates
- destructuring
- spread syntax
- `filter` and `map`
- a search box

The project uses JSONPlaceholder, which is free and does not require an API key.

## Folder structure

```text
community-directory/
├── index.html
├── style.css
└── app.js
```

## 1. `index.html`

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

## 2. `style.css`

````css name=style.css
* {
    box-sizing: border-box;
}

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

h1 {
    margin-bottom: 0.25rem;
}

label {
    display: block;
    margin-top: 1.5rem;
    font-weight: 700;
}

input {
    width: 100%;
    margin: 0.5rem 0 1rem;
    padding: 0.8rem;
    border: 2px solid #c7d2fe;
    border-radius: 0.5rem;
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
    border-radius: 0.75rem;
    box-shadow: 0 4px 12px rgb(30 41 59 / 12%);
}

.card h2 {
    margin-top: 0;
    color: #4338ca;
}

.error {
    color: #b91c1c;
    font-weight: 700;
}
````

## 3. `app.js`

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

## Run the project

1. Open the `community-directory` folder in VS Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.
5. Open the browser console to inspect the data and errors.
6. Search for `Nairobi`, `Alice`, or a company name.

## Teach the project step by step

1. Start with the HTML and ask: “Where will the cards appear?”
2. Explain `querySelector` and the three DOM references.
3. Explain that `members` starts as an empty array.
4. Run `loadMembers()` and observe the loading message.
5. Add a `console.log(members)` after `await response.json()`.
6. Explain why `response.ok` is checked.
7. Explain destructuring: `const { name, email } = member`.
8. Explain `map`: one member becomes one HTML card.
9. Explain `filter`: search keeps only matching members.
10. Break the URL temporarily and demonstrate the error state.

## Extension challenges

- Add a button to sort members alphabetically.
- Add a counter for the total number of visible members.
- Add a “clear search” button.
- Show the member's website.
- Create a dark mode button using spread syntax for a settings object.
- Replace the API with a local `members.json` file.

---

## 🧠 Common mistakes and debugging tips

### `fetch` works but no data appears

Check that you called `response.json()` and waited for it:

```javascript
const response = await fetch(url);
const data = await response.json();
```

### A 404 does not enter `catch`

Check `response.ok` manually and throw an error when it is false.

### `map` returns unexpected text

Remember that `map` returns a new array. Use `.join('')` when converting an array of HTML strings into one string.

### `undefined` appears on the page

Inspect the object with `console.log(member)` and verify the property path, such as `member.address.city`.

### The browser shows a CORS error

Run the project with Live Server and use APIs that allow browser requests. Do not try to bypass security restrictions in a real application.

### The page is blank

Open DevTools with `F12`, check the **Console**, and read the first error from top to bottom.

---

## 🎓 Final recap

Ask learners to explain these in their own words:

1. What is the difference between synchronous and asynchronous code?
2. What does `await` wait for?
3. Why do we check `response.ok`?
4. When would you use `map`, `filter`, and `reduce`?
5. What does destructuring do?
6. Why do we show loading and error states?

### Live-demo checklist

- [ ] Ask learners to predict output before running code.
- [ ] Run each small example in the VS Code terminal.
- [ ] Change one value and run it again.
- [ ] Use `console.log` to inspect arrays and objects.
- [ ] Build the capstone in small steps instead of pasting everything at once.
- [ ] Demonstrate one successful request and one failed request.
- [ ] Leave time for learners to complete at least one extension challenge.

> **Main lesson:** Modern JavaScript helps us transform data, wait for slow work, handle errors, and create useful interactive applications.

**Happy coding! 💻✨**
