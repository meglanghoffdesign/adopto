import { seedUsers } from './user-seeds.js';
import { seedPets } from './pet-seeds.js'; // Import pet seeding function
import { seedFavorites } from './favorite-seeds.js'; // Import favorites seeding function
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    // Seed Users
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    // Seed Pets
    await seedPets();
    console.log('\n----- PETS SEEDED -----\n');
    
    // Seed Favorites (user-pet relationships)
    await seedFavorites();
    console.log('\n----- FAVORITES SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();