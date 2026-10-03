# 🌐 MUST Web Community
## Week 1 — HTML for Beginners

> Learn. Build. Collaborate. Grow.

Welcome to Week 1 of the MUST Web Community curriculum. This guide is designed for absolute beginners and focuses on **learning by doing**.

---

## Prerequisites

No prior web development experience is required.

You need:
- [VS Code](https://code.visualstudio.com/)
- A web browser (Chrome, Brave, or Firefox)
- Git and GitHub (optional for Week 1)

### Quick Setup Workflow

Create folder  
↓  
Open in VS Code  
↓  
Create `index.html`  
↓  
Write HTML  
↓  
Open in browser  
↓  
Make changes  
↓  
Refresh browser

---

## By the end of this lesson, you should be able to:

- Explain what HTML is and how it works
- Create a basic HTML page
- Use headings, paragraphs, links, images, and lists
- Build basic forms and tables
- Understand HTML attributes
- Use semantic HTML elements
- Build a simple webpage from scratch

---

## Learning Path

1. **01 — What is HTML?**
2. **02 — Your First HTML Page**
3. **03 — Text & Headings**
4. **04 — Links & Images**
5. **05 — Lists**
6. **06 — Containers & Semantic HTML**
7. **07 — Forms**
8. **08 — Tables**
9. **09 — Attributes**
10. **10 — Practice**
11. **11 — Mini Project**

---

## 01 — What is HTML?

HTML (HyperText Markup Language) is the standard language used to structure content on web pages.

Think of HTML as the **skeleton** of a website:
- Headings define titles
- Paragraphs define text blocks
- Links connect pages
- Images display media
- Forms collect user input

🧪 **Try it yourself:**
- Open VS Code
- Create a file named `index.html`
- Add one line: `Hello MUST Web Community`
- Open the file in your browser

---

## 02 — Your First HTML Page

Every HTML page follows this basic structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My First Website</title>
</head>
<body>
  <h1>Welcome to MUST Web Community</h1>
  <p>We are learning how to build websites.</p>
</body>
</html>
```

**Expected output in browser:**
- Big heading: **Welcome to MUST Web Community**
- Paragraph text below it

🧪 **Try it yourself:**
- Change the heading to your name
- Change the paragraph to why you joined the Web Community

---

## 03 — Text & Headings

Use headings to organize content from most important (`h1`) to least (`h6`).

```html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<p>This is a paragraph of content.</p>
```

**Expected output in browser:**
- Larger text for `h1`
- Medium text for `h2` and `h3`
- Normal paragraph text

🧪 **Try it yourself:**
- Create a page section called “About Me”
- Add one heading and two paragraphs

---

## 04 — Links & Images

### Links

```html
<a href="https://developer.mozilla.org/" target="_blank">Visit MDN</a>
```

### Images

```html
<img src="profile.jpg" alt="A profile photo" width="200">
```

**Expected output in browser:**
- A clickable link to MDN
- An image if `profile.jpg` exists in your folder

🧪 **Try it yourself:**
- Add a link to your GitHub profile
- Add an image from your project folder
- Change the `alt` text to describe the image clearly

---

## 05 — Lists

Lists help present grouped information.

### Unordered list
```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>
```

### Ordered list
```html
<ol>
  <li>Open VS Code</li>
  <li>Create index.html</li>
  <li>Run in browser</li>
</ol>
```

**Expected output in browser:**
- Bulleted list for `ul`
- Numbered list for `ol`

🧪 **Try it yourself:**
- Create a list of your hobbies
- Create a numbered list of your study routine

---

## 06 — Containers & Semantic HTML

### Containers
- `<div>`: block container for grouping sections
- `<span>`: inline container for small text parts

### Semantic elements
Semantic tags describe meaning, not just appearance:
- `<header>`
- `<nav>`
- `<main>`
- `<section>`
- `<article>`
- `<footer>`

```html
<header>
  <h1>My Developer Profile</h1>
</header>
<main>
  <section>
    <h2>About Me</h2>
    <p>Short introduction here.</p>
  </section>
</main>
<footer>
  <p>© 2026</p>
</footer>
```

**Expected output in browser:**
- Content appears similar visually
- Structure is clearer for accessibility and SEO

🧪 **Try it yourself:**
- Wrap your current page content with semantic tags
- Add `header`, `main`, and `footer`

---

## 07 — Forms

Forms collect user data.

```html
<form>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Message:</label>
  <textarea id="message" name="message" rows="4"></textarea>

  <button type="submit">Send</button>
</form>
```

**Expected output in browser:**
- Input fields for name/email
- A message box
- A submit button

🧪 **Try it yourself:**
- Add a dropdown for “Year of Study”
- Add checkboxes for skills (HTML, CSS, JS)

---

## 08 — Tables

Tables display structured data.

```html
<table border="1">
  <thead>
    <tr>
      <th>Skill</th>
      <th>Level</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>Beginner</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>Learning</td>
    </tr>
  </tbody>
</table>
```

**Expected output in browser:**
- A 2-column table with borders and headings

🧪 **Try it yourself:**
- Create a table for your weekly study timetable

---

## 09 — Attributes

Attributes add extra meaning or behavior to HTML elements.

Common attributes:
- `href` on links
- `src` and `alt` on images
- `id`, `class`, `title` on many elements
- `required`, `placeholder`, `type` on form fields

Example:

```html
<a href="https://github.com" title="Open GitHub">GitHub</a>
<img src="logo.png" alt="Community logo">
<input type="text" placeholder="Enter your username" required>
```

🧪 **Try it yourself:**
- Add `title` to your links
- Add `placeholder` to all text inputs

---

## 10 — Practice

Build a one-page “About Me” site with:
- One `h1` and at least two `h2` sections
- Paragraphs about yourself
- One image with `alt`
- At least one link
- One ordered or unordered list
- One table
- One simple contact form
- Semantic layout (`header`, `main`, `section`, `footer`)

---

## 11 — Mini Project

### 🚀 Mini Project: My Developer Profile

Build a complete page that includes:
- Your name
- Profile image
- Short introduction
- Skills
- Hobbies
- Education
- Social/GitHub links
- Contact form
- A small table
- Semantic HTML structure

Suggested page flow:

My Developer Profile  
↓  
About Me  
↓  
Skills  
↓  
Education  
↓  
Projects  
↓  
Contact

### Submission checklist
- [ ] Page opens correctly in browser
- [ ] No missing closing tags
- [ ] All images include `alt`
- [ ] Headings are in correct order (`h1` → `h2` → `h3`)
- [ ] Form labels are connected to inputs (`for` + `id`)

---

## Common Mistakes (and Fixes)

### 1) Missing link destination

❌ Wrong:
```html
<a>Google</a>
```

✅ Correct:
```html
<a href="https://google.com">Google</a>
```

Why: `href` tells the browser where to go.

### 2) Missing closing tag

❌ Wrong:
```html
<p>This is my paragraph
```

✅ Correct:
```html
<p>This is my paragraph</p>
```

### 3) Incorrect nesting

❌ Wrong:
```html
<p><h2>About</h2></p>
```

✅ Correct:
```html
<h2>About</h2>
<p>About section text.</p>
```

### 4) Missing image alt text

❌ Wrong:
```html
<img src="photo.jpg">
```

✅ Correct:
```html
<img src="photo.jpg" alt="Portrait of student">
```

### 5) Form label not connected

❌ Wrong:
```html
<label>Name</label>
<input type="text">
```

✅ Correct:
```html
<label for="name">Name</label>
<input type="text" id="name" name="name">
```

---

## 📚 Further Learning

- [MDN HTML documentation](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [W3Schools HTML reference](https://www.w3schools.com/html/)
- [W3C HTML Validator](https://validator.w3.org/)
- [VS Code documentation](https://code.visualstudio.com/docs)

---

## 🚀 What’s Next?

In Week 2, we’ll take the pages you built with HTML and style them using CSS.

**Keep building. Keep learning. Keep shipping. ⚡**
