// src/components/Logout.jsx
import React from "react";
import { useNavigate } from "react-router";
import { useEmail } from "../contexts/EmailContext"; // Import context
import Nav from "react-bootstrap/Nav"; // Import Nav from react-bootstrap

const Logout = () => {
  const { setEmail } = useEmail(); // Access the setEmail function from the context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear email from localStorage
    localStorage.removeItem("user_email");

    // Clear the email context
    setEmail(null);

    // Redirect to the sign-in page
    navigate("/signin");
  };

  return (
    <Nav.Link onClick={handleLogout} className="me-auto">
      Logout
    </Nav.Link>
  );
};

export default Logout;
