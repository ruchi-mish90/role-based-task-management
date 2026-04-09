import mongoose from 'mongoose';
import User from '../models/User.js';

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find()
      .select('_id name email role managerId')
      .sort({ createdAt: -1 });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const assignManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { managerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'user') {
      return res.status(400).json({ message: 'Only users can be assigned to a manager' });
    }

    if (managerId) {
      if (!mongoose.Types.ObjectId.isValid(managerId)) {
        return res.status(400).json({ message: 'Invalid manager id' });
      }

      const manager = await User.findById(managerId).select('role');
      if (!manager || manager.role !== 'manager') {
        return res.status(400).json({ message: 'Manager not found' });
      }
    }

    user.managerId = managerId || null;
    await user.save();

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      managerId: user.managerId,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update manager assignment' });
  }
};
