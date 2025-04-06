import { Favorite } from '../models/favorite.js'; // Import your Favorite model

export const seedFavorites = async () => {
  await Favorite.bulkCreate([
    { userId: 1, petId: 1 }, // User 1 favorites Buddy
    { userId: 2, petId: 2 }, // User 2 favorites Mittens
  ]);
};