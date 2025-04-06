import { Request, Response } from 'express';
import fetch from 'node-fetch'; // Ensure you are using node-fetch
import { Pet } from '../models/pet.js'; // Assuming Pet is the model you are using

// Define the expected structure of the Petfinder API response
interface PetfinderAPIResponse {
  animals: Array<{
    id: number;
    name: string;
    species: string;
    breed: string;
    age: string;
    size: string;
    status: string;
    location: string;
    description: string;
  }>;
}

// Function to get access token from Petfinder API
async function getAccessToken() {
  try {
    const response = await fetch("https://api.petfinder.com/v2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: process.env.PETFINDER_API_KEY,
        client_secret: process.env.PETFINDER_API_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error(`Petfinder API token request failed with status ${response.status}`);
    }

    const data = (await response.json()) as { access_token: string };
    return data.access_token;
  } catch (error: any) {
    console.error("Error getting Petfinder API access token:", error);
    throw new Error("Failed to get access token from Petfinder API");
  }
}

// GET /pets - Get all pets
export const getAllPets = async (_req: Request, res: Response) => {
  try {
    const pets = await Pet.findAll();
    res.json(pets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /pets/:id - Get a specific pet by ID
export const getPetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /pets - Create a new pet
export const createPet = async (req: Request, res: Response) => {
  const { 
    name, 
    species, 
    breed, 
    age, 
    size, 
    description, 
    status, 
    location,
    organization_id,  // Added organization_id
    distance,          // Added distance
  } = req.body;

  try {
    const fetch_timestamp = new Date();

    const newPet = await Pet.create({
      name,
      species,
      breed,
      age,
      size,
      description,
      status,
      location,
      organization_id,
      distance,
      fetch_timestamp,
    });

    res.status(201).json(newPet);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /pets/:id - Update a pet by ID
export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, species, breed, age, size, description, status, location } = req.body;

  try {
    const pet = await Pet.findByPk(id);
    if (pet) {
      pet.name = name || pet.name;
      pet.species = species || pet.species;
      pet.breed = breed || pet.breed;
      pet.age = age || pet.age;
      pet.size = size || pet.size;
      pet.description = description || pet.description;
      pet.status = status || pet.status;
      pet.location = location || pet.location;

      await pet.save();
      res.json(pet);
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /pets/:id - Delete a pet by ID
export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findByPk(id);
    if (pet) {
      await pet.destroy();
      res.json({ message: 'Pet deleted' });
    } else {
      res.status(404).json({ message: 'Pet not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /pets/search - Search for pets based on filters
export const searchPets = async (req: Request, res: Response) => {
  const { species, breed, age, size, status, location, distance } = req.body;

  try {
    // Fetch access token for Petfinder API
    const token = await getAccessToken();

    // Build query string for Petfinder API
    const queryParams = new URLSearchParams({
      ...(species && { species }),
      ...(breed && { breed }),
      ...(age && { age }),
      ...(size && { size }),
      ...(status && { status }),
      ...(location && { location }),
      ...(distance && { distance }),
    });

    // Call Petfinder API with the search filters
    const response = await fetch(`https://api.petfinder.com/v2/animals?${queryParams.toString()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Type the response data using type assertion
    const data = (await response.json()) as PetfinderAPIResponse;

    // If you have pets in your local database that match the filters, you can merge or return them along with Petfinder API pets
    const petsFromDb = await Pet.findAll({
      where: {
        ...(species && { species }),
        ...(breed && { breed }),
        ...(age && { age }),
        ...(size && { size }),
        ...(status && { status }),
        ...(location && { location }),
      },
    });

    // Combine the results (optional)
    const combinedPets = [...data.animals, ...petsFromDb];

    // Return the combined list
    res.json(combinedPets);
  } catch (error: any) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ message: error.message });
  }
};