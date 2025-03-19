import React, { useState } from "react";
import { useNavigate } from "react-router";
import { myDB } from "../db/myFireStore"; // Import Firestore handler

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); // Error state for validation
  const [success, setSuccess] = useState(""); // Success state
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Check if the email already exists
      const emailExists = await myDB.checkIfEmailExists(email);
      if (emailExists) {
        setError("Email already exists. Please sign in.");
        return;
      }

      // Add the new user to Firestore
      const newUser = { name, age, email, location };
      const createdUser = await myDB.addUser(newUser);

      // Handle successful signup
      setSuccess("Account created successfully! Redirecting to Sign In...");
      setTimeout(() => {
        navigate("/signin"); // Redirect to sign in after success
      }, 2000);
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("An error occurred during sign-up. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4">Sign Up</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && (
          <div className="alert alert-success text-center">{success}</div>
        )}
        <form onSubmit={handleSignUp}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              className="form-control"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="location" className="form-label">
              Location
            </label>
            <input
              type="text"
              id="location"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
