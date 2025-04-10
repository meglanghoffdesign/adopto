import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Pet } from "../interfaces/Pet";

const PetProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pet, setPet] = useState<Pet | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await fetch(`/api/pets/${id}`); // update if needed
        const data = await res.json();
        setPet(data.animal);
      } catch (error) {
        console.error("Failed to load pet info", error);
      }
    };

    fetchPet();
  }, [id]);

  if (!pet) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-white px-6 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            alt={pet.name}
            className="w-full md:w-1/2 rounded"
          />

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-purple-600 mb-2">{pet.name}</h1>
            <p className="text-gray-700 mb-1">{pet.breeds.primary}</p>
            <p className="text-sm text-gray-500 mb-1">
              {pet.gender} • {pet.age}
            </p>
            <p className="text-sm text-gray-500 mb-1">
              {pet.contact.address.city}, {pet.contact.address.state}
            </p>
            <a
              href={pet.url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline text-sm mt-2 inline-block"
            >
              View on Petfinder ↗
            </a>

            {pet.description && (
              <div className="mt-4">
                <h2 className="font-semibold text-lg mb-1">About</h2>
                <p className="text-gray-600 whitespace-pre-wrap text-sm">
                  {pet.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfilePage;
