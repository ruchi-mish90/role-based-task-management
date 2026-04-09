import { Router } from 'express';
import { assignManager, getUsers } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = Router();

router.use(authMiddleware, roleMiddleware('admin'));

router.get('/', getUsers);
router.patch('/:id/manager', assignManager);

export default router;
