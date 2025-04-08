import fetch from 'node-fetch';
import { Request, Response } from 'express';
import { Pet } from '../models/pet.js';

const API_KEY = process.env.PETFINDER_API_KEY;

if (!API_KEY) {
  console.error('Missing Petfinder API credentials in the environment variables.');
}

export const getPets = async (req: Request, res: Response) => {
  // Extract query parameters from the request
  const { species, breed, gender, size, age, color, location, distance } = req.query;

  let url = 'https://api.petfinder.com/v2/animals';
  const params: any = {};

  // Add filters to the query parameters
  if (species) params.species = species;
  if (breed) params.breed = breed;
  if (gender) params.gender = gender;
  if (size) params.size = size;
  if (age) params.age = age;
  if (color) params.color = color;
  if (location) params.location = location;
  if (distance) params.distance = distance;

  // Convert the params object to query string
  const queryString = new URLSearchParams(params).toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  console.log('Fetching pets from Petfinder with URL:', url); // Log the request URL

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    // Log the response status and check if we got a valid response
    console.log('Response status:', response.status); // Log the response status

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Error response body:', errorBody); // Log the error body
      throw new Error('Failed to fetch pets from Petfinder API');
    }

    const data = await response.json(); // Parse the response as JSON
    console.log('Fetched data:', data); // Log the response data

    // Send the data back to the client
    res.json(data);
  } catch (error: unknown) {
    // Type assertion to 'Error' to avoid 'unknown' type error
    if (error instanceof Error) {
      console.error('Error fetching pets:', error.message); // Log the error message
      res.status(500).json({ error: 'Failed to fetch pets from Petfinder API', message: error.message });
    } else {
      console.error('Unexpected error:', error); // Log unexpected errors
      res.status(500).json({ error: 'Unexpected error occurred', message: String(error) });
    }
  }
};

export const getPetById = async (req: Request, res: Response) => {
  const petId = req.params.id; // Get pet ID from URL parameter

  const url = `https://api.petfinder.com/v2/animals/${petId}`; // Fetch URL for specific pet

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch pet details from Petfinder API');
    }

    const data = (await response.json()) as { animal: any }; // Get data for single pet

    const { id, name, species, breed, age, size, status, location, description } = data.animal;

    // Placeholder for organization_id, distance, and fetch_timestamp
    const organization_id = 1; // Default value
    const petDistance = 100;    // Default distance
    const fetchTimestamp = new Date(); // Current timestamp

    // Check if pet already exists in the database
    const existingPet = await Pet.findOne({
      where: { petfinder_id: id.toString() },
    });

    // If pet doesn't exist, store it in the database
    if (!existingPet) {
      await Pet.create({
        petfinder_id: id.toString(),
        name,
        species,
        breed,
        age,
        size,
        status,
        location,
        description,
        organization_id,  // Default value
        distance: petDistance,  // Default value
        fetch_timestamp: fetchTimestamp,  // Current timestamp
      });
      console.log(`Pet with id ${id} has been stored in the database.`);
    } else {
      console.log(`Pet with id ${id} already exists in the database.`);
    }

    // Return the fetched pet details in the response
    res.json(data);
  } catch (error) {
    console.error('Error fetching pet details:', error);
    res.status(500).json({ error: 'Failed to fetch pet details from Petfinder API' });
  }
};