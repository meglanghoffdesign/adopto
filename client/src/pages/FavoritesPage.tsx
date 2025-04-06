import React, { useEffect, useState } from "react";
import { Pet } from "../interfaces/Pet";
import PetCard from "../components/PetCard";

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<Pet[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Remove pet from favorites
  const handleRemove = (id: number) => {
    const updated = favorites.filter((pet) => pet.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Favorite Pets</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">You have no favorites yet 🐶</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((pet) => (
            <div key={pet.id} className="relative">
              <PetCard pet={pet} />
              <button
                onClick={() => handleRemove(pet.id)}
                className="absolute top-3 right-3 text-red-500 text-xl"
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
