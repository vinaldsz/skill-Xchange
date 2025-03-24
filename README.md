# 🎓 Skill Xchange - Skill Swap Marketplace

## A collaborative platform where users can exchange skills without monetary transactions. This project fosters a community where learning is accessible, affordable, and interactive.

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

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/skill-xchange.git
cd skill-xchange
npm install
npm build dev
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

Example `setSkillData` in `SkillForm.jsx`

```javascript
const handleChange = (e) => {
  setSkillData({ ...skillData, [e.target.name]: e.target.value });
};
```

#### Why it demonstrates immutability:

- The setSkillData function creates a new object using the spread operator ({ ...skillData }) instead of modifying the existing skillData object directly.
- This ensures that the original state remains unchanged.

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
- React handles the underlying DOM manipulation, so you don’t need to write imperative code to show or hide elements.

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

## Project by : Vinal Dalcy Dsouza
