import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pet } from "../interfaces/Pet";

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      const favorites: Pet[] = JSON.parse(stored);
      const already = favorites.some((f) => f.id === pet.id);
      setIsFavorited(already);
    }
  }, [pet.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    const stored = localStorage.getItem("favorites");
    let favorites: Pet[] = stored ? JSON.parse(stored) : [];

    if (isFavorited) {
      favorites = favorites.filter((f) => f.id !== pet.id);
    } else {
      favorites.push(pet);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorited(!isFavorited);
  };

  return (
    <Link to={`/pet/${pet.id}`} className="block w-full">
      <div className="bg-white rounded shadow p-4 flex flex-col items-center text-center relative">
        {/* Image (fallback-safe) */}
        <img
          src={
            pet.primary_photo_cropped?.medium ||
            pet.photos?.[0]?.medium ||
            "/brittany-spaniel-dog.webp"
          }
          alt={pet.name}
          className="w-full h-48 object-cover rounded mb-4"
        />

        {/* Favorite Icon */}
        <button
          onClick={toggleFavorite}
          className="absolute top-3 right-3"
          title={isFavorited ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src="/PawFavorite.svg"
            alt="Favorite icon"
            className={`w-10 h-30 transition duration-200 ${
              isFavorited ? "opacity-100" : "opacity-40"
            }`}
          />
        </button>

        {/* Pet Info */}
        <h3 className="font-bold text-lg">{pet.name}</h3>
        <p className="text-sm text-gray-600">{pet.breeds?.primary || "Unknown Breed"}</p>
        <p className="text-sm text-gray-600">{pet.gender} • {pet.species}</p>
        <p className="text-sm text-gray-500">
          {pet.age}
          <br />
          {pet.contact?.address?.city || "Unknown City"},{" "}
          {pet.contact?.address?.state || "Unknown State"}
        </p>
      </div>
    </Link>
  );
};

export default PetCard;
