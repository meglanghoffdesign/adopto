import { Router } from 'express';
import { petRouter } from './pet-routes.js';
import { favoriteRouter } from './favorite-routes.js';
import { userRouter } from './user-routes.js';
import searchRoutes from './search-routes.js';
const router = Router();
router.use('/pets', petRouter); // All pet-related routes
router.use('/favorites', favoriteRouter); // All favorite-related routes
router.use('/users', userRouter);
router.use('/search', searchRoutes);
export default router;
