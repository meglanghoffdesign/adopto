import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', email: 'jollyguru@example.com', password: 'password', quiz_parms: {} },
    { username: 'SunnyScribe', email: 'sunnyscribe@example.com', password: 'password', quiz_parms: {} },
    { username: 'RadiantComet', email: 'radiantcomet@example.com', password: 'password', quiz_parms: {} },
  ], { individualHooks: true });
};