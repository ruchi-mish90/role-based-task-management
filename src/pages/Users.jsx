import React, { useMemo, useState } from 'react';
import UserList from '../components/users/UserList';

const seedUsers = [
  { id: 'u1', name: 'Meera', email: 'meera@mail.com', role: 'user', managerId: '' },
  { id: 'u2', name: 'Kabir', email: 'kabir@mail.com', role: 'user', managerId: 'm1' },
  { id: 'm1', name: 'Rohit', email: 'rohit@mail.com', role: 'manager', managerId: '' },
  { id: 'm2', name: 'Naina', email: 'naina@mail.com', role: 'manager', managerId: '' },
];

const Users = () => {
  const [users, setUsers] = useState(seedUsers);

  const managers = useMemo(() => users.filter((u) => u.role === 'manager'), [users]);
  const regularUsers = useMemo(() => users.filter((u) => u.role === 'user'), [users]);

  const handleAssign = (userId, managerId) => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, managerId } : user)));
  };

  return (
    <div className="page-wrap">
      <header className="page-head">
        <h2>User Assignments</h2>
        <p>Only admin can see this and map users to managers.</p>
      </header>

      <UserList users={regularUsers} managers={managers} onAssign={handleAssign} />
    </div>
  );
};

export default Users;
