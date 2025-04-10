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

    if (!response.ok) {
      throw new Error("Failed to fetch pets from Petfinder API");
    }

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

// import { Request, Response } from 'express';
// import { Pet } from '../models/pet.js';
// import { User } from '../models/user.js';
// import { buildFiltersFromQuiz } from '../utils/quiz-filter-builder.js';

// export const searchPets = async (req: Request, res: Response) => {
//   const userId = (req as any).user?.id; // pulled from the JWT via middleware
//   const useQuiz = req.body.useQuiz || false;

//   let filters: any = {};

//   try {
//     console.log('Request Body:', req.body);
  
//     if (useQuiz && userId) {
//       const user = await User.findByPk(userId);
//       if (user?.quiz_parms) {
//         filters = buildFiltersFromQuiz(user.quiz_parms);
//         console.log('Filters from quiz:', filters);
//       }
//     } else {
//       const {
//         species,
//         breed,
//         size,
//         gender,
//         age,
//         color,
//         coat,
//         status,
//         goodWithChildren,
//         goodWithDogs,
//         goodWithCats,
//         location,
//         distance,
//       } = req.body;

//       if (species) filters.species = species;
//       if (breed) filters.breed = breed;
//       if (size) filters.size = size;
//       if (gender) filters.gender = gender;
//       if (age) filters.age = age;
//       if (color) filters.color = color;
//       if (coat) filters.coat = coat;
//       if (status) filters.status = status;

//       // Updated these to use snake_case instead of camelCase
//       if (goodWithChildren !== '') filters.good_with_children = goodWithChildren || null;
//       if (goodWithDogs !== '') filters.good_with_dogs = goodWithDogs || null;
//       if (goodWithCats !== '') filters.good_with_cats = goodWithCats || null;

//       if (location) filters.location = location;
//       if (distance) filters.distance = distance;

//       console.log('Filters from request body:', filters);
//     }

//     const pets = await Pet.findAll({
//       where: filters,
//     });

//     console.log('Found pets:', pets);  // Log pets returned from the DB

//     if (pets.length > 0) {
//       return res.status(200).json(pets);
//     }

//     return res.status(404).json({ message: 'No pets found matching the criteria' });

//   } catch (error: any) {
//     console.error('Error:', error.message);  // Log the error message
//     return res.status(500).json({ message: error.message });
//   }
// };