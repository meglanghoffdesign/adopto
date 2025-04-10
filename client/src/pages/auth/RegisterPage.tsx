import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // for redirection after registration

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Basic validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          confirmPassword: form.confirmPassword,  // Send confirmPassword here
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Redirect user to login page after successful registration
        navigate("/login");
      } else {
        // Show error message if registration failed
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-20 w-50 mr-2" />
       
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white text-center">
        <h2 className="text-xl font-bold mb-1">Ready to Make a Difference?</h2>
        <p className="text-sm text-gray-700 mb-6">Join Adopto and help give a pet the loving home they deserve.</p>

        {/* Username Field */}
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Email Field */}
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Password Field */}
        <div className="text-left mb-4">
          <label className="block font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className="text-left mb-6">
          <label className="block font-medium mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
            required
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded font-semibold transition duration-300 hover:bg-purple-500"
>
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-medium underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;