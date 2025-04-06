import { Router } from 'express';  // Just import Router from 'express'
import { getPets, getPetById } from '../controllers/petfinder-controller.js';  // Import controller functions

const router = Router();  // Use Router() to create a new router

// Endpoint to get pets based on filters
router.get('/pets', getPets);

// Endpoint to get details of a specific pet
router.get('/pets/:id', getPetById);

export default router;