import dotenv from 'dotenv';
dotenv.config({ path: './server/.env' });
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import petfinderRoutes from './routes/petfinder-routes.js';
import searchRoutes from './routes/api/search-routes.js';
import { authenticateToken } from './middleware/auth.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3001;
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
app.use(express.json());
app.use(routes);
// API routes
app.use('/api/search', authenticateToken, searchRoutes);
app.use('/api/petfinder', authenticateToken, petfinderRoutes);
// Catch-all route to support React Router on refresh
app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'dist', 'index.html'));
});
// Start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
