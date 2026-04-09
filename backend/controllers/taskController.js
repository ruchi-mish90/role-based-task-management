import Task from '../models/Task.js';
import User from '../models/User.js';
import parsePagination from '../utils/pagination.js';
import { canManagerAssignUser } from '../middleware/ownershipMiddleware.js';

const buildTaskScope = async (user) => {
  if (user.role === 'admin') {
    return {};
  }

  if (user.role === 'user') {
    return { ownerId: user._id };
  }

  if (user.role === 'manager') {
    const assignedUsers = await User.find({ managerId: user._id }).select('_id');
    const ownerIds = assignedUsers.map((u) => u._id);
    return { ownerId: { $in: ownerIds } };
  }

  return { ownerId: null };
};

export const createTask = async (req, res) => {
  try {
    const { title, description, status, ownerId } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    let taskOwnerId = req.user._id;

    if (req.user.role === 'admin' && ownerId) {
      taskOwnerId = ownerId;
    }

    if (req.user.role === 'manager') {
      if (!ownerId) {
        return res.status(400).json({ message: 'Managers must provide ownerId' });
      }

      const canAssign = await canManagerAssignUser(req.user._id, ownerId);
      if (!canAssign) {
        return res.status(403).json({ message: 'Cannot create task for this user' });
      }

      taskOwnerId = ownerId;
    }

    const task = await Task.create({
      title,
      description,
      status,
      ownerId: taskOwnerId,
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create task' });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { search, status } = req.query;
    const { page, limit, skip } = parsePagination(req.query);

    const scope = await buildTaskScope(req.user);
    const query = { ...scope };

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(query),
    ]);

    return res.status(200).json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (title !== undefined) req.task.title = title;
    if (description !== undefined) req.task.description = description;
    if (status !== undefined) req.task.status = status;

    const updatedTask = await req.task.save();

    return res.status(200).json(updatedTask);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await req.task.deleteOne();
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete task' });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const scope = await buildTaskScope(req.user);

    // Status breakdown
    const statusCounts = await Task.aggregate([
      { $match: scope },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    // Tasks created per day (last 14 days)
    const since = new Date();
    since.setDate(since.getDate() - 13);
    const daily = await Task.aggregate([
      { $match: { ...scope, createdAt: { $gte: since } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Leaderboard: top users by completed tasks
    const leaderboard = await Task.aggregate([
      { $match: { ...scope, status: 'completed' } },
      { $group: { _id: '$ownerId', completed: { $sum: 1 } } },
      { $sort: { completed: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      { $project: { name: '$user.name', role: '$user.role', completed: 1 } },
    ]);

    return res.status(200).json({ statusCounts, daily, leaderboard });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};
