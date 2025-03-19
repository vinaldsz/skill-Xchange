import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import UserPage from "./pages/UserPage.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import { EmailProvider } from "./contexts/EmailContext.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import SwapRequestPage from "./pages/SwapRequestPage.jsx";

import { BrowserRouter, Routes, Route } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <StrictMode>
      <EmailProvider>
        {" "}
        {/* Wrap the app with EmailProvider */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/swapreq" element={<SwapRequestPage />} />
          </Routes>
        </BrowserRouter>
      </EmailProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")).render(<App />);
