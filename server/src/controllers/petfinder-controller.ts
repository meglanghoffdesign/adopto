import fetch from 'node-fetch';  // Import fetch to make requests to Petfinder API
import { Request, Response } from 'express';

// Your Petfinder API credentials (make sure they're in your .env file for security)
const API_KEY = process.env.PETFINDER_API_KEY;
const API_SECRET = process.env.PETFINDER_API_SECRET;

if (!API_KEY || !API_SECRET) {
    console.error('Missing Petfinder API credentials in the environment variables.');
  }

// Controller to fetch pets based on filters
export const getPets = async (req: Request, res: Response) => {
  const { species, breed, gender, size, age, color, location, distance } = req.query;

  // Set up the API URL and query parameters
  let url = 'https://api.petfinder.com/v2/animals';

  const params: any = {};
  if (species) params.species = species;
  if (breed) params.breed = breed;
  if (gender) params.gender = gender;
  if (size) params.size = size;
  if (age) params.age = age;
  if (color) params.color = color;
  if (location) params.location = location;
  if (distance) params.distance = distance;

  // Build query string from the params
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  try {
    // Fetch the data from Petfinder API
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // Authorization header using your Petfinder API key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pets from Petfinder API');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pets:', error);
    res.status(500).json({ error: 'Failed to fetch pets from Petfinder API' });
  }
};

// Controller to fetch details of a specific pet
export const getPetById = async (req: Request, res: Response) => {
  const petId = req.params.id;

  const url = `https://api.petfinder.com/v2/animals/${petId}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // Authorization header using your Petfinder API key
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pet details from Petfinder API');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).json({ error: 'Failed to fetch pet details from Petfinder API' });
  }
};