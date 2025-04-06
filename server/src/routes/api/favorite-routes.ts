import express from 'express';
import { addFavorite, removeFavorite, getFavorites } from '../../controllers/favorite-controller.js';

const router = express.Router();

// Add a pet to favorites
router.post('/', addFavorite);

// Remove a pet from favorites
router.delete('/:petId', removeFavorite);

// Get all favorites for a user
router.get('/', getFavorites);

export { router as favoriteRouter };  // Export as favoriteRouter