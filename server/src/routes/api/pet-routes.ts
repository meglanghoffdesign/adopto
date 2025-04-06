import { Router } from 'express';
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
  searchPets
} from '../../controllers/pet-controller.js'; // Import your controllers

const petRouter = Router();

// GET /pets - Get all pets
petRouter.get('/', getAllPets);

// GET /pets/:id - Get a specific pet by ID
petRouter.get('/:id', getPetById);

// POST /pets - Create a new pet
petRouter.post('/', createPet);

// PUT /pets/:id - Update a pet by ID
petRouter.put('/:id', updatePet);

// DELETE /pets/:id - Delete a pet by ID
petRouter.delete('/:id', deletePet);

// POST /pets/search - Search for pets based on filters
petRouter.post('/search', searchPets);

export { petRouter };