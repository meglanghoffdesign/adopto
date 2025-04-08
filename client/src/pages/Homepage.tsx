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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchPets = async () => {
    setLoading(true);
    setError(null);
  
    const queryParams = new URLSearchParams({
      page: currentPage.toString(),
      ...filters,
    });
  
    try {
      const res = await fetch(`/api/pets?${queryParams}`);
      console.log("Response status:", res.status);
  
      const text = await res.text();
      console.log("Raw response text:", text);
  
      const data = JSON.parse(text);
      const petsArray = data.animals || data.pets || data || [];
  
      setPets(petsArray);
    } catch (err) {
      console.error("Failed to fetch pets:", err);
      setError("Could not load pets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchPets();
  }, [currentPage, filters]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset pagination on filter change
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <div className="flex items-center space-x-2">
          <img src="/Adopto_Logo_Favicon.svg" className="w-6 h-6" alt="logo" />
          <h1 className="text-xl font-bold text-purple-600">Adopto</h1>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => navigate("/favorites")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            View my favorites
          </button>
          <button
            onClick={() => setShowFilters(true)}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Filters
          </button>
        </div>
      </header>

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
          {loading ? (
            <p className="text-center text-gray-500">Loading pets...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <PetCard key={pet.id} pet={pet} />
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={10} // Update once your API returns real pagination
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-6 mt-auto">
        <div className="flex justify-center items-center space-x-2">
          <img src="/Adopto_Logo.svg" className="w-5 h-5" alt="logo" />
          <span className="font-bold">Adopto</span>
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
