import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import the route files
import routes from './routes/index.js';  // Your main routes file (if any)
import { sequelize } from './models/index.js';  // Your database connection
import petfinderRoutes from './routes/petfinder-routes.js';  // Petfinder routes
import searchRoutes from './routes/api/search-routes.js';  // Search routes
import { authenticateToken } from './middleware/auth.js';  // JWT auth middleware

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the React app (build directory)
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));

// // Prevent caching on API requests (including /petfinder/pets)
// app.use('/api/petfinder', (_req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store');  // Prevent caching
//   next();
// });
// app.use('/api/search', (_req, res, next) => {
//   res.setHeader('Cache-Control', 'no-store');  // Prevent caching
//   next();
// });

// Middleware to parse JSON
app.use(express.json());

// Group general routes
app.use(routes);

// API Routes - Petfinder and Search routes
app.use('/api/petfinder', petfinderRoutes);  // Petfinder routes
app.use('/api/search', authenticateToken, searchRoutes);  // Search routes with JWT authentication
app.use('/api/pets/search', authenticateToken);

// Catch-all route for React Router (if needed)
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});

// Start server and sync DB
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});