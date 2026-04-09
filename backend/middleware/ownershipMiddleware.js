import Task from '../models/Task.js';
import User from '../models/User.js';

export const canAccessTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    req.task = task;

    if (req.user.role === 'admin') {
      return next();
    }

    if (req.user.role === 'user') {
      if (task.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Forbidden: not your task' });
      }

      return next();
    }

    if (req.user.role === 'manager') {
      const owner = await User.findById(task.ownerId).select('managerId');

      if (!owner) {
        return res.status(404).json({ message: 'Task owner not found' });
      }

      if (owner.managerId?.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ message: 'Forbidden: task owner is not assigned to this manager' });
      }

      return next();
    }

    return res.status(403).json({ message: 'Forbidden' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to verify task ownership' });
  }
};

export const canManagerAssignUser = async (managerId, userId) => {
  const user = await User.findById(userId).select('managerId');
  if (!user) {
    return false;
  }

  return user.managerId?.toString() === managerId.toString();
};
