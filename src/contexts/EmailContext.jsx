// src/contexts/EmailContext.jsx
import React, { createContext, useState, useContext } from "react";

// Create the EmailContext
export const EmailContext = createContext();

// Create the EmailProvider component
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null); // Default email is null

  const value = { email, setEmail };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

// Custom hook to use the EmailContext
export const useEmail = () => {
  return useContext(EmailContext); // Access the context in a more convenient way
};
