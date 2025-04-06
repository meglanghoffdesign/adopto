import { Request, Response } from 'express';
import { Pet } from '../models/pet.js'; // Assuming Pet is the model you are using

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
    // If fetch_timestamp is missing, set it to the current date
    const fetch_timestamp = new Date();

    // Create the pet entry in the database, explicitly passing null for `createdAt` and `updatedAt`
    const newPet = await Pet.create({
      name,
      species,
      breed,
      age,
      size,
      description,
      status,
      location,
      organization_id,  // Ensure organization_id is provided in the request body
      distance,          // Ensure distance is provided in the request body
      fetch_timestamp,   // Use the current timestamp for fetch_timestamp
    });

    // Return the newly created pet
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
  const { species, breed, age, size, status, location } = req.body;
  
  try {
    const searchFilters: any = {};
    if (species) searchFilters.species = species;
    if (breed) searchFilters.breed = breed;
    if (age) searchFilters.age = age;
    if (size) searchFilters.size = size;
    if (status) searchFilters.status = status;
    if (location) searchFilters.location = location;

    const pets = await Pet.findAll({
      where: searchFilters,
    });

    res.json(pets);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
