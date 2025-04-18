import React from "react";
import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import WelcomePage from "./pages/WelcomePage";
import QuizPage from "./pages/QuizPage";
import FavoritesPage from "./pages/FavoritesPage";
import PetProfilePage from "./pages/PetProfilePage";
import HomePage from "./pages/Homepage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/quiz" element={<QuizPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/pet/:id" element={<PetProfilePage />} />
    
      {/* Add more routes as needed */}
    </Routes>
  );
};

export default App;
