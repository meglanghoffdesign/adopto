import express from 'express';
import { searchPets } from '../../controllers/search-controller.js'; // Import the searchPets controller

const router = express.Router();

// Define the route for searching pets
router.post('/search-pets', searchPets);

export default router;