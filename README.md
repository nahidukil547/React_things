# React State and Global State

This project is a good place to practice the difference between local state and global state in React.

## What is State?

In React, **state** is data that changes over time and affects what the UI shows.

- State is usually stored inside a component.
- When state changes, React re-renders the component.
- State is used for things like form values, counters, visibility toggles, and user input.

### Example of local state

In a React component, you often use the `useState` hook:

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

Here, `count` is local state for the `Counter` component.
Only `Counter` can read or update it directly.

## What is Global State?

**Global state** is shared data that many components need to access or update.

- Global state lives outside a single component.
- It is useful when multiple components need the same data.
- Common examples: user login status, theme choice, shopping cart items, or app settings.

### Example of global state in React

React has several ways to share global state:

- React Context
- State management libraries like Redux, Zustand, or MobX
- `useReducer` with context

A simple global state example uses React Context:

```jsx
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

function Profile() {
  const { user } = useContext(AuthContext);
  return <div>{user ? `Hello, ${user.name}` : 'Not logged in'}</div>;
}
```

In this example, `user` is global state because it can be used by any component that reads from `AuthContext`.

## When to use Local State vs Global State

- Use **local state** when data only matters inside one component.
  - Example: a toggle for showing or hiding a dropdown.
- Use **global state** when data is needed by many components.
  - Example: a user profile used in the header, menu, and account pages.

## Tips for learning

- Start with small local state examples first.
- Try moving shared state into a context provider.
- Don’t make everything global; only share state when it is needed.

## Summary

- Local state: stored inside a component, used for that component only.
- Global state: shared across components, often provided by context or a state library.
- Learning both helps you build React apps that are easier to understand and maintain.
