import { Router } from 'express';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  searchPets
} from '../../controllers/pet-controller.js'; // Import your controllers
import { authenticateToken } from '../../middleware/auth.js';

const petRouter = Router();

// GET /pets - Get all pets
petRouter.get('/', getAllPets);

// GET /pets/:id - Get a specific pet by ID
petRouter.get('/:id', getPetById);

// POST /pets - Create a new pet
petRouter.post('/', authenticateToken, createPet);

// PUT /pets/:id - Update a pet by ID
petRouter.put('/:id', authenticateToken, updatePet);

// DELETE /pets/:id - Delete a pet by ID
petRouter.delete('/:id', authenticateToken, deletePet);

// POST /pets/search - Search for pets based on filters
petRouter.post('/search', authenticateToken, searchPets);

export { petRouter };