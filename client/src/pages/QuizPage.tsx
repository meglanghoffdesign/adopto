import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type QuizAnswer = string | { location: string; distance: string };

const quizData = [
  {
    question: "How old are you?",
    options: ["18 – 22", "22 – 32", "32 – 45", "45+"],
    image: "/quiz-1.svg",
  },
  {
    question: "Do you have any allergies to fur or pet dander?",
    options: ["Dogs", "Cats", "Dogs and Cats", "No allergies"],
    image: "/quiz-2.svg",
  },
  {
    question: "What best describes your living situation?",
    options: ["Apartment", "House with no yard", "House with yard", "Other"],
    image: "/quiz-3.svg",
  },
  {
    question: "Do you have any children in your home?",
    options: ["I have children", "No kids"],
    image: "/quiz-4.svg",
  },
  {
    question: "Do you have any other pets in your home?",
    options: ["Dog(s)", "Cat(s)", "Both", "No pets"],
    image: "/quiz-5.svg",
  },
  {
    question: "How much time can you spend with your pet daily?",
    options: ["0–1 hours", "1–2 hours", "2–3 hours", "3+ hours"],
    image: "/quiz-6.svg",
  },
  {
    question: "How active would you consider yourself?",
    options: ["Not active", "Somewhat active", "Active", "Very active"],
    image: "/quiz-7.svg",
  },
  {
    question: "What is your location?",
    options: [], // no multiple choice — form-based input
    image: "/quiz-8.svg",
  },
];

const QuizPage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>(Array(quizData.length).fill(""));
  const navigate = useNavigate();
  const current = quizData[currentIndex];

  const handleSelect = (option: string) => {
    const updated = [...answers];
    updated[currentIndex] = option;
    setAnswers(updated);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleFinalSubmit = async () => {
    console.log("Final quiz answers:", answers);
  
    // Map the quiz answers to the expected format for the backend
    const quizParams = {
      allergies: [], // Set allergies based on the quiz answers
      livingSituation: "", // Set based on living situation answer
      hasKids: answers[3] === "I have children" ? true : false, // Map based on "Do you have any children?"
      hasOtherPets: answers[4] !== "No pets", // Map based on "Do you have any other pets?"
      availableTime: "", // Set based on how much time they can spend with pets
      activityLevel: "", // Set based on activity level
      location: typeof answers[7] === "object" ? answers[7].location : "",
      distance: typeof answers[7] === "object" ? answers[7].distance : "",
    };

    // Save the quiz answers to localStorage
    localStorage.setItem("quizResults", JSON.stringify(quizParams));

    // Get the token from localStorage
    const token = localStorage.getItem("authToken");
  
    try {
      const response = await fetch("/api/search/search-pets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add token in the header
        },
        body: JSON.stringify(quizParams),
      });
  
      if (response.ok) {
        const pets = await response.json();
        console.log("Found pets:", pets);
        // Navigate to the results page
        navigate("/home", { state: { pets } });
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData.message);
        // Handle error (e.g., show error message)
      }
    } catch (error) {
      console.log("An error occurred:", error);
      // Handle network or fetch errors
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      {/* Logo */}
      <div className="flex items-center mb-4">
        <img src="/Adopto_Logo.svg" alt="Adopto Logo" className="h-8 w-8 mr-2" />
        <span className="text-2xl font-semibold text-purple-600">Adopto</span>
      </div>

      {/* Back Button */}
      {currentIndex > 0 && (
        <button
          onClick={handleBack}
          className="self-start ml-4 mb-2 text-gray-600 hover:text-black"
        >
          ←
        </button>
      )}

      {/* Question Header */}
      <p className="text-sm text-gray-500 mb-1">
        Question {currentIndex + 1} of {quizData.length}
      </p>
      <h2 className="text-xl font-bold mb-4">{current.question}</h2>

      {/* Image */}
      <img src={current.image} alt="Quiz" className="w-60 mx-auto mb-6" />

      {/* Conditional Question UI */}
      {currentIndex === quizData.length - 1 ? (
        // 👉 Final Question (location form)
        <div className="w-full max-w-md text-left">
          <label className="font-medium block mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter City, State or ZIP"
            value={
              typeof answers[7] === "object" ? answers[7].location : ""
            }
            onChange={(e) => {
              const updated = [...answers];
              updated[7] = {
                ...(typeof updated[7] === "object"
                  ? updated[7]
                  : { distance: "" }),
                location: e.target.value,
              };
              setAnswers(updated);
            }}
            className="w-full mb-4 border border-gray-300 px-4 py-2 rounded bg-gray-100"
          />

          <label className="font-medium block mb-1">Distance</label>
          <input
            type="text"
            placeholder="Anywhere"
            value={
              typeof answers[7] === "object" ? answers[7].distance : ""
            }
            onChange={(e) => {
              const updated = [...answers];
              updated[7] = {
                ...(typeof updated[7] === "object"
                  ? updated[7]
                  : { location: "" }),
                distance: e.target.value,
              };
              setAnswers(updated);
            }}
            className="w-full mb-6 border border-gray-300 px-4 py-2 rounded bg-gray-100"
          />

          <button
            onClick={handleFinalSubmit}
            className="w-full bg-black text-white py-3 rounded font-semibold hover:opacity-90 transition"
          >
            Meet your new friend
          </button>

          <button
            onClick={() => {
              setAnswers(Array(quizData.length).fill(""));
              setCurrentIndex(0);
            }}
            className="block mx-auto mt-4 text-sm text-purple-600 underline"
          >
            Restart the quiz
          </button>
        </div>
      ) : (
        // 👉 Multiple-choice questions (1–7)
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
          {current.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleSelect(opt)}
              className="bg-black text-white py-3 rounded hover:opacity-90 transition"
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
