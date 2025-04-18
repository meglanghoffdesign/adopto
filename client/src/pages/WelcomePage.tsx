import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white">
      {/* Logo */}
      <div className="flex items-center mb-6">
      <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-20 w-50 mr-2" />
      </div>

      {/* Headline + Text */}
      <h2 className="text-xl font-bold mb-2">Welcome to Adopto!</h2>
      <p className="max-w-md text-gray-700 mb-6">
      Discover your perfect match — take the quiz and meet your future furry friend
      </p>

      {/* Illustration */}
      <img
        src="/welcomepage.svg"
        alt="Man with cat"
        className="w-60 mx-auto mb-8"
      />

      {/* Actions */}
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() => navigate("/quiz")}
          className="w-60 bg-black text-white py-3 rounded font-semibold hover:opacity-90 transition"
        >
          Take the Quiz
        </button>
        <button
          onClick={() => navigate("/home")}
          className="text-sm text-purple-600 underline"
        >
          Skip the quiz and start searching
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
