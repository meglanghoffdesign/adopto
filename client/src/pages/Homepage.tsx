import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterModal from "../components/FilterModal";
import PetCard from "../components/PetCard";
import Pagination from "../components/Pagination";
import { Pet } from "../interfaces/Pet";

const HomePage: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ species: "", gender: "", age: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      const quizResults = JSON.parse(localStorage.getItem("quizResults") || "{}");
      const authToken = localStorage.getItem("authToken");

      // Fetch pets based on quiz results if available
      if (quizResults && Object.keys(quizResults).length > 0) {
        try {
          const res = await fetch(`/api/pets/search`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // Attach the token here
            },
            body: JSON.stringify({
              page: currentPage,
              quizResults,
            }),
          });

          if (!res.ok) {
            throw new Error("Failed to fetch pets");
          }

          const data = await res.json();
          setPets(data.animals || []);
        } catch (err) {
          console.error("Failed to fetch pets", err);
        }
      } else {
        // Fetch all pets if no quiz results
        try {
          const res = await fetch(`/api/pets?page=${currentPage}`, {
            headers: {
              Authorization: `Bearer ${authToken}`, // Attach the token here
            },
          });

          if (!res.ok) {
            throw new Error("Failed to fetch pets");
          }

          const data = await res.json();
          setPets(data.animals || []);
        } catch (err) {
          console.error("Failed to fetch pets", err);
        }
      }
    };

    fetchPets();
  }, [currentPage]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    console.log("Applying filters:", newFilters);
    // TODO: Apply filters to API call once backend is ready
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <div className="flex items-center space-x-2">
          <img src="/Adopto_Logo_Favicon.svg" className="w-20 h-50" alt="logo" />
          
        </div>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            View my favorites
          </button>
          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={() => setShowFilters(true)}
          >
            Filters
          </button>

          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-1 p-6 gap-6">
        {/* Sidebar */}
        <aside className="w-full max-w-sm bg-white p-6 rounded shadow text-center">
          <img src="/landing-page.svg" alt="Illustration" className="mx-auto mb-4 w-40" />
          <h2 className="font-bold text-lg mb-2">Find your new best friend!</h2>
          <p className="text-sm text-gray-500 mb-4">
            We have your quiz results. Head back to find your new best friend!
          </p>
          <button className="bg-black text-white px-4 py-2 rounded w-full mb-2">
            See my results
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="text-sm text-purple-600 underline"
          >
            Restart the quiz
          </button>
        </aside>

        {/* Pet Results Grid */}
        <main className="flex-1">
    {/* Pet Cards Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pets.length > 0 ? (
        pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No pets found. Try adjusting your filters.
        </p>
      )}
    </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={10} // Adjust this if your backend gives a real total
            onPageChange={setCurrentPage}
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-auto">
        <div className="flex justify-center items-center space-x-2">
          <img src="/Adopto_Logo.svg" className="w-20 h-50" alt="logo" />
          
        </div>
        <p className="text-xs mt-1">© 2025, Adopto</p>
      </footer>

      {/* Filter Modal */}
      <FilterModal
        open={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
      />
    </div>
  );
};

export default HomePage;
