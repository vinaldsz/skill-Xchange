import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useEmail } from "../contexts/EmailContext.jsx"; // Import the context hook
import { myDB } from "../db/myFireStore";

export default function SignIn() {
  const [email, setEmail] = useState(""); // Local email state for user input
  const [error, setError] = useState(""); // Error state
  const { setEmail: setContextEmail } = useEmail(); // Destructure to get the setEmail function from the context
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const emailExists = await myDB.checkIfEmailExists(email);
      if (emailExists) {
        setContextEmail(email); // Set the email in the global context
        navigate("/user"); // Redirect to /user if email exists
      } else {
        setError("Error: Email does not exist. Please register.");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred while signing in. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center mb-4">Sign In</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSignIn}>
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
          <button type="submit" className="btn btn-primary w-100">
            Sign In
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
