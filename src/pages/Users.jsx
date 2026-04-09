import React, { useMemo, useState } from 'react';
import UserList from '../components/users/UserList';
import { assignUserManager, fetchUsers } from '../services/userService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchUsers();
      setUsers(data);
    } catch (loadError) {
      setError(loadError.message || 'Could not load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const managers = useMemo(() => users.filter((u) => u.role === 'manager'), [users]);
  const regularUsers = useMemo(() => users.filter((u) => u.role === 'user'), [users]);

  const handleAssign = async (userId, managerId) => {
    try {
      await assignUserManager(userId, managerId);
      await loadUsers();
    } catch (assignError) {
      setError(assignError.message || 'Failed to assign manager');
    }
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>User Assignments</h2>
        <p>Map team members to managers.</p>
      </header>

      {error && <p className="error-msg">{error}</p>}
      {loading ? (
        <p className="empty-msg">Loading users...</p>
      ) : (
        <UserList users={regularUsers} managers={managers} onAssign={handleAssign} />
      )}
    </div>
  );
};

export default Users;
