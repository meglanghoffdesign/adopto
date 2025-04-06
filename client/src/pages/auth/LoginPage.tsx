import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here (API call, validation, etc.)
    console.log("Logging in with:", { username, password });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-8 w-8 mr-2" />
        <span className="text-2xl font-semibold text-purple-600">Adopto</span>
      </div>

      {/* Form Container */}
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-white text-center"
      >
        <h2 className="text-xl font-bold mb-1">Welcome Back!</h2>
        <p className="text-sm text-gray-700 mb-6">Let’s get you logged in</p>

        {/* Username Field */}
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Password Field */}
        <div className="text-left mb-6">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold hover:opacity-90 transition mb-4"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
