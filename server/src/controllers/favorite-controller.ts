import { Request, Response } from 'express';
import { Favorite } from '../models/favorite.js'; 
import { User } from '../models/user.js';
import { Pet } from '../models/pet.js';

// Add a pet to favorites
export const addFavorite = async (req: Request, res: Response) => {
  const { petId } = req.body;  // assuming you are sending petId in the body
  const userId = req.body.userId; // Assuming the userId comes from the body or is extracted from the token
  
  try {
    // Ensure that the user and pet exist
    const user = await User.findByPk(userId);
    const pet = await Pet.findByPk(petId);

    if (!user || !pet) {
      return res.status(404).json({ message: 'User or Pet not found' });
    }

    // Check if this pet is already a favorite
    const existingFavorite = await Favorite.findOne({
      where: { userId, petId }
    });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Pet is already in favorites' });
    }

    // Create the new favorite
    const favorite = await Favorite.create({ userId, petId });
    return res.status(201).json(favorite);  // Ensure a return here

  } catch (error: any) {
    return res.status(500).json({ message: error.message });  // Ensure a return here
  }
};

// Remove a pet from favorites
export const removeFavorite = async (req: Request, res: Response) => {
  const { petId } = req.params;
  const userId = req.body.userId;  // Assuming the user is authenticated and userId is in the request body

  try {
    // Find the favorite entry
    const favorite = await Favorite.findOne({
      where: { userId, petId }
    });

    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    // Delete the favorite
    await favorite.destroy();
    return res.status(200).json({ message: 'Favorite removed' });  // Ensure a return here

  } catch (error: any) {
    return res.status(500).json({ message: error.message });  // Ensure a return here
  }
};

// Get all favorites for a user
export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.body.userId;  // Assuming the user is authenticated and userId is in the request body

  try {
    // Find all favorites for the user
    const favorites = await Favorite.findAll({
      where: { userId },
      include: Pet // Including pet information in the response
    });

    if (favorites.length === 0) {
      return res.status(404).json({ message: 'No favorites found' });
    }

    return res.status(200).json(favorites);  // Ensure a return here

  } catch (error: any) {
    return res.status(500).json({ message: error.message });  // Ensure a return here
  }
};