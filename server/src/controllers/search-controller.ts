import { Request, Response } from 'express';
import { Pet } from '../models/pet.js';

export const searchPets = async (req: Request, res: Response) => {
  const {
    species,
    breed,
    size,
    gender,
    age,
    color,
    coat,
    status,
    goodWithChildren,
    goodWithDogs,
    goodWithCats,
    location,
    distance,
  } = req.body;

  // Build the query filters dynamically based on the provided body parameters
  const filters: any = {};

  if (species) filters.species = species;
  if (breed) filters.breed = breed;
  if (size) filters.size = size;
  if (gender) filters.gender = gender;
  if (age) filters.age = age;
  if (color) filters.color = color;
  if (coat) filters.coat = coat;
  if (status) filters.status = status;
  if (goodWithChildren !== undefined) filters.goodWithChildren = goodWithChildren;
  if (goodWithDogs !== undefined) filters.goodWithDogs = goodWithDogs;
  if (goodWithCats !== undefined) filters.goodWithCats = goodWithCats;

  // For location-based search, you could use a specific distance or other logic
  if (location && distance) {
    // Assuming you have a way to calculate or store distance (e.g., geolocation data)
    // You can filter based on the user's location and distance preference
    filters.location = { $near: location, $maxDistance: distance };
  }

  try {
    // Fetch pets based on the filters
    const pets = await Pet.findAll({
      where: filters,
      // You can also add more logic for sorting, pagination, etc.
    });

    // Return a response if pets are found
    if (pets.length > 0) {
      return res.status(200).json(pets); // Ensure the response is returned here
    }

    // If no pets found, return an appropriate response
    return res.status(404).json({ message: 'No pets found matching the criteria' });

  } catch (error: any) {
    return res.status(500).json({ message: error.message }); // Ensure the error response is returned here
  }
};