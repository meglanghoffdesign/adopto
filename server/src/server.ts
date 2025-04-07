import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import petfinderRoutes from './routes/petfinder-routes.js'; 
import searchRoutes from './routes/api/search-routes.js';  // Import the new search-routes
import { authenticateToken } from './middleware/auth.js'; // Import the middleware


const app = express();
const PORT = process.env.PORT || 3001;  // This line binds to the correct port

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

// Mount routes
app.use('/api/search', authenticateToken, searchRoutes);  // Use search-routes under /api/search
app.use('/api/petfinder', authenticateToken, petfinderRoutes);  // Mount Petfinder routes under /api/petfinder

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});