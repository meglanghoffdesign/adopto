import React from "react";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-sm text-center p-8">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-semibold text-purple-600">Adopto</h1>
        </div>

        {/* Illustration */}
        <img
          src="/landing-page.svg"
          alt="Illustration"
          className="w-40 mx-auto mb-5"
        />

        {/* Headline & Description */}
        <h2 className="text-xl font-semibold mb-2">Hello World</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-6">
          Tagline goes here! Lorem ipsum dolor sit amet, consectetur adipiscing
          elit. Phasellus imperdiet, nulla et.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/login"
            className="bg-black text-white py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-500 text-white py-3 rounded font-semibold hover:bg-purple-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
