import { useNavigate } from "react-router"; // Import the hook
// components/HeroSection.jsx
export default function HeroSection() {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleGetStarted = () => {
    navigate("/signin"); // Navigate to /signin on button click
  };
  return (
    <section className="text-center py-24 bg-gray-200 mx-8 rounded-lg shadow-lg">
      <div className="container mx-auto px-6">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Skill Xchange
        </h1>
        <p className="text-xl text-gray-700 mt-4 mb-6 max-w-2xl mx-auto">
          Learn new skills by exchanging knowledge with others.
        </p>
        <div className="mt-4">
          <button
            onClick={handleGetStarted} // Handle click to redirect
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 text-lg font-medium transition-all"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
