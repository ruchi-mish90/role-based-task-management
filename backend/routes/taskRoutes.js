import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from '../controllers/taskController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { canAccessTask } from '../middleware/ownershipMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.route('/').post(createTask).get(getTasks);
router.route('/:id').put(canAccessTask, updateTask).delete(canAccessTask, deleteTask);

export default router;
