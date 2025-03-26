# 🎓 Skill Xchange - Skill Swap Marketplace

A collaborative platform where users can exchange skills without monetary transactions. This project fosters a community where learning is accessible, affordable, and interactive.

---

## 📖 Table of Contents

- [📚 Problem Statement](#-problem-statement)
- [🛠️ Tech Stack](#️-tech-stack)
  - [🎨 Frontend](#-frontend)
  - [🔥 Backend](#-backend)
- [CRUD Operation](#crud-operation)
- [Figma Link](#figma-link)
- [YouTube](#youtube)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🧱 Functional Programming Principles](#-functional-programming-principles)
  - [1. Pure Functions](#1-pure-functions)
  - [2. Immutability](#2-immutability)
  - [3. First Class Functions](#3-first-class-functions)
  - [4. Higher Order Functions](#4-higher-order-functions)
  - [5. Declarative Over Imperative](#5-declarative-over-imperative)
- [Array Functions](#array-functions)
  - [1. Using filter in SkillList.jsx](#1-using-filter-in-skilllistjsx)
  - [2. Using map in SkillList.jsx](#2-using-map-in-skilllistjsx)
  - [3. Using map in myFireStore.js](#3-using-map-in-myfirestorejs)
- [🛠️ Design Patterns](#️-design-patterns)
  - [1. Module Pattern](#1-module-pattern)
  - [2. Context API as a Singleton](#2-context-api-as-a-singleton)
  - [3. Component-Based Architecture as Factory Pattern](#3-component-based-architecture-as-factory-pattern)
- [Resources](#resources)
- [Project by](#project-by)

---

## 📚 Problem Statement

Learning new skills can be expensive and time-consuming. Many individuals have expertise they are willing to share but lack a structured platform to connect with others for mutual learning. Skill Xchange bridges this gap by enabling users to exchange skills through a secure, peer-reviewed, and engaging environment.

---

## 🛠️ Tech Stack

### 🎨 Frontend

- **React.js** (Functional Components + Hooks)
- **Bootstrap** for responsive UI
- **ES6 Modules** for modular coding

### 🔥 Backend

- **Firestore** for real-time database and data storage

---

## CRUD Operation

- On user collection allowing users to add, remove, edit and view skills.

## Figma Link :

https://www.figma.com/design/Hu3ICyqpLji3mJ9N0Y82gf/Untitled?node-id=0-1&m=dev&t=ZUlhsRLy6cjgzOaH-1

## YouTube :

Demo : https://www.youtube.com/watch?v=3oRFSp9c6FA&t=1s
Principles and Design Patterns: https://youtu.be/ZWIdvY57jUc

Functional Programming Fundamentals:

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skill-xchange.git
cd skill-xchange
npm install
npm run dev
```

## 🧱 Functional Programming Principles

### 1. Pure Functions

A pure function is a function that:

Always produces the same output for the same input.
Has no side effects (does not modify external state).

Example: `handleLogout` in `LogOut.jsx`

```javascript
const handleLogout = () => {
  // Clear email from localStorage
  localStorage.removeItem("user_email");

  // Clear the email context
  setEmail(null);

  // Redirect to the sign-in page
  navigate("/signin");
};
```

#### Why it's pure:

- It does not modify any external state directly (e.g., it uses setEmail to update the context and navigate to redirect).
- For the same input (no arguments), it always performs the same actions.

### 2. Immutability

Immutability means that data is not modified directly. Instead, new copies of data are created when changes are needed.

Example `setSkill in `SkillList.jsx`

```javascript
setSkills(allSkills.filter((skill) => skill.user_id === userId));
```

#### Why it demonstrates immutability:

- The filter method creates a new array without modifying the original allSkills array.
- The setSkills function updates the state with the new array, leaving the original data intact.

### 3. First Class Functions

In JavaScript, functions are first-class citizens, meaning they can be assigned to variables, passed as arguments, and returned from other functions.

Example: Passing `onSkillAddedOrUpdated` in `SkillList.jsx`

```jsx
<SkillForm
  userId={userId}
  onSkillAddedOrUpdated={() => fetchSkills(userId)} // Passing a function as a prop
  editingSkill={editingSkill}
  onCancelEdit={handleCancelEdit}
/>
```

#### Why it demonstrates first class functions:

- The onSkillAddedOrUpdated prop is passed as a function to the SkillForm component.
- This allows SkillForm to execute the function when needed, demonstrating that functions can be treated as values.

### 4. Higher Order Functions

A higher-order function is a function that takes another function as an argument or returns a function.

Example: `useEffect` in `SkillList.jsx`

```javascript
useEffect(() => {
  if (userId) {
    fetchSkills(userId); // Function passed to useEffect
  }
}, [userId]);
```

#### Why it demonstrates higher-order functions:

- The useEffect hook is a higher-order function because it takes a callback function as its argument.
- The callback function (() => fetchSkills(userId)) is executed when the userId dependency changes.

Note: Array functions like `filter` and `map` used in this project are also higher order functions.

### 5. Declarative Over Imperative

Declarative programming focuses on what to do rather than how to do it. React itself is declarative because you describe the UI structure and let React handle the DOM updates.

Example: Jsx in `NavBarWithSwap.jsx`

```jsx
{
  location.pathname === "/user" ? (
    <>
      <Nav.Link href="/swapreq">Swap Skills</Nav.Link>
      <Logout />
    </>
  ) : (
    <>
      <Nav.Link href="/signin">Sign In</Nav.Link>
      <Nav.Link href="/signup">Sign Up</Nav.Link>
    </>
  );
}
```

#### Why it demonstrates declarative programming:

- The JSX syntax describes what the UI should look like based on the location.pathname condition.
- React takes care of efficiently updating the DOM when state or props change.

## Array Funtions

### 1. Using filter in SkillList.jsx

You use the `filter` method to create a new array of skills that belong to a specific user. This avoids modifying the original array and keeps the code declarative.

```javascript
const fetchSkills = async (userId) => {
  try {
    const allSkills = await myDB.getSkillsPromise();
    setSkills(allSkills.filter((skill) => skill.user_id === userId)); // Filter by user_id
  } catch (error) {
    console.error("Error fetching skills:", error);
  } finally {
    setLoading(false);
  }
};
```

### Why This is Declarative:

- The filter method creates a new array containing only the skills that match the user_id.
- It avoids using a for loop or manually pushing items into a new array, which would be more imperative.

### 2. Using map in SkillList.jsx

You use the `map` method to render a list of SkillCard components for each skill in the skills array. This is a declarative way to transform an array into a list of React components.

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {skills.map((skill) => (
    <SkillCard key={skill.id} skill={skill} />
  ))}
</div>
```

### Why This is Declarative:

- The `map` method transforms the skills array into an array of `SkillCard` components.
- It avoids manually iterating over the array and appending elements to the DOM.

### 3. map in myFireStore.js

In your `myFireStore.js` file, you use the `map` method to transform Firestore documents into an array of skill objects.

```javascript
class MyFireStoreHandler {
  async getSkillsPromise() {
    const skillsCol = collection(this.db, "skills");
    const snapshot = await getDocs(skillsCol);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Transform Firestore docs into skill objects
  }
}
```

### Why This is Declarative:

- The `map` method transforms the `snapshot.docs` array into an array of skill objects.
- It avoids manually iterating over the documents and constructing the objects.

## 🛠️ Design Patterns

### 1. Module Pattern

The Module Pattern is used to encapsulate related functionality into a single file or module, exposing only the necessary parts while keeping the rest private. This is evident in your myFireStore.js file, where Firestore-related operations are encapsulated.

Example: `myFireStore.js`

```javascript
class MyFireStoreHandler {
  async getSkillsPromise() {
    const skillsCol = collection(this.db, "skills");
    const snapshot = await getDocs(skillsCol);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async addSkill(skill) {
    const skillsCol = collection(this.db, "skills");
    const docRef = await addDoc(skillsCol, skill);
    return { id: docRef.id, ...skill };
  }

  // Other Firestore operations...
}

export const myDB = new MyFireStoreHandler();
```

#### Why it demonstrates the Module Pattern:

- All Firestore-related operations (e.g., getSkillsPromise, addSkill, updateSkill, deleteSkill) are encapsulated in the MyFireStoreHandler class.
- Only the myDB instance is exported, keeping the implementation details private.

Note: myFireStore.js also exibits Singleton beheavior.

### Hypothetical Example

```javascript
// myFireStore.js
export async function getSkillsPromise() {
  const skillsCol = collection(this.db, "skills");
  const snapshot = await getDocs(skillsCol);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function addSkill(skill) {
  const skillsCol = collection(this.db, "skills");
  const docRef = await addDoc(skillsCol, skill);
  return { id: docRef.id, ...skill };
}

// Another file for Firestore operations
export async function deleteSkill(skillId) {
  const skillDoc = doc(this.db, "skills", skillId);
  await deleteDoc(skillDoc);
}
```

### Why This Breaks the Module Pattern

- Firestore-related operations are scattered across multiple files instead of being encapsulated in a single module.
- There’s no central class or object to manage Firestore operations, making the code harder to maintain and reuse.

### 2. Context API as a Singleton

The Singleton Pattern ensures that only one instance of a class or object is created and shared across the application. Your EmailContext implementation acts as a Singleton by providing a single shared state (email) across the entire app.

Example: `EmailContext.jsx`

```javascript
import React, { createContext, useContext, useState } from "react";

const EmailContext = createContext();

export function EmailProvider({ children }) {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
}

export function useEmail() {
  return useContext(EmailContext);
}
```

#### Why it demonstrates the Singleton Pattern:

- The EmailContext provides a single shared instance of the email state and setEmail function.
- The EmailProvider ensures that all components consuming the EmailContext share the same state.

### Hypothetical Example

```javascript
// Creating multiple contexts instead of reusing the same one
const EmailContext1 = createContext();
const EmailContext2 = createContext();

export function EmailProvider1({ children }) {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext1.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext1.Provider>
  );
}

export function EmailProvider2({ children }) {
  const [email, setEmail] = useState(null);

  return (
    <EmailContext2.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext2.Provider>
  );
}
```

### Why This Breaks the Module Pattern

- Multiple EmailContext instances are created (EmailContext1 and EmailContext2), leading to inconsistent state across the app.
- Components consuming EmailContext1 won’t share the same state as those consuming EmailContext2.

### 3. Component-Based Architecture as Factory Pattern

The Factory Pattern is used to create objects (or components) without specifying their exact class. In React, components act as factories for creating UI elements. Your NavBarWithSwap.jsx demonstrates this by conditionally rendering different links based on the current route.

Example: `NavBarWithSwap.jsx`

```jsx
function BasicExample() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">skill-Xchange</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/about">About</Nav.Link>
            {location.pathname === "/user" ? (
              <>
                <Nav.Link href="/swapreq">Swap Skills</Nav.Link>
                <Logout />
              </>
            ) : (
              <>
                <Nav.Link href="/signin">Sign In</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
```

#### Why it demonstrates the Factory Pattern:

- The NavBarWithSwap component acts as a factory for creating different UI elements (e.g., "Swap Skills" and "Logout" links or "Sign In" and "Sign Up" links) based on the current route (location.pathname).
- It abstracts the logic for creating these elements, making the component reusable and dynamic.

### Hypothetical Example

```javascript
function NavBarWithSwap() {
  const location = useLocation();

  if (location.pathname === "/user") {
    return (
      <Navbar>
        <Nav.Link href="/swapreq">Swap Skills</Nav.Link>
        <Logout />
      </Navbar>
    );
  } else if (location.pathname === "/signin") {
    return (
      <Navbar>
        <Nav.Link href="/signin">Sign In</Nav.Link>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
      </Navbar>
    );
  } else {
    return (
      <Navbar>
        <Nav.Link href="/">Home</Nav.Link>
      </Navbar>
    );
  }
}
```

### Why This Breaks the Module Pattern

- The logic for creating different UI elements is hardcoded and repetitive.
- There’s no abstraction or reuse of the logic for creating Nav.Link components.

## Resources:

Design Patterns: https://refactoring.guru/design-patterns/factory-method
React Bootstrap: https://react-bootstrap.github.io/docs/components/navbar
Referenced Projects: https://github.com/john-guerra/reactFirestore-project-analyzer
React.js: https://react.dev/learn

## Deployement

Firebase hosting is used.

link: https://skill-exchange-73c3c.web.app/

## Project by : Vinal Dalcy Dsouza
