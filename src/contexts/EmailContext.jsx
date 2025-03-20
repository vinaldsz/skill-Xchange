// src/contexts/EmailContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

// Create EmailContext
export const EmailContext = createContext();

// Create EmailProvider
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    const savedEmail = localStorage.getItem("user_email");
    return savedEmail || null;
  });

  useEffect(() => {
    if (email) {
      localStorage.setItem("user_email", email);
    } else {
      localStorage.removeItem("user_email");
    }
  }, [email]);

  const value = { email, setEmail };

  return (
    <EmailContext.Provider value={value}>{children}</EmailContext.Provider>
  );
};

// Custom hook to use the EmailContext
export const useEmail = () => {
  return useContext(EmailContext);
};
