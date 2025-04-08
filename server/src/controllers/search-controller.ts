import { Request, Response } from 'express';
import { Pet } from '../models/pet.js';
import { User } from '../models/user.js';
import { buildFiltersFromQuiz } from '../utils/quiz-filter-builder.js';

export const searchPets = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id; // pulled from the JWT via middleware
  const useQuiz = req.body.useQuiz || false;

  let filters: any = {};

  try {
    console.log('Request Body:', req.body);
  
    if (useQuiz && userId) {
      const user = await User.findByPk(userId);
      if (user?.quiz_parms) {
        filters = buildFiltersFromQuiz(user.quiz_parms);
        console.log('Filters from quiz:', filters);
      }
    } else {
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

      if (species) filters.species = species;
      if (breed) filters.breed = breed;
      if (size) filters.size = size;
      if (gender) filters.gender = gender;
      if (age) filters.age = age;
      if (color) filters.color = color;
      if (coat) filters.coat = coat;
      if (status) filters.status = status;

      // Updated these to use snake_case instead of camelCase
      if (goodWithChildren !== '') filters.good_with_children = goodWithChildren || null;
      if (goodWithDogs !== '') filters.good_with_dogs = goodWithDogs || null;
      if (goodWithCats !== '') filters.good_with_cats = goodWithCats || null;

      if (location) filters.location = location;
      if (distance) filters.distance = distance;

      console.log('Filters from request body:', filters);
    }

    const pets = await Pet.findAll({
      where: filters,
    });

    console.log('Found pets:', pets);  // Log pets returned from the DB

    if (pets.length > 0) {
      return res.status(200).json(pets);
    }

    return res.status(404).json({ message: 'No pets found matching the criteria' });

  } catch (error: any) {
    console.error('Error:', error.message);  // Log the error message
    return res.status(500).json({ message: error.message });
  }
};