import React, { useEffect, useState } from 'react';

import { loadUsers, deleteUser } from '../backend';

export default function AdminDashboard(props) {
  const [users, setUsers] = useState();

  function handleLoadUsers() {
    loadUsers()
      .then(users => setUsers(users))
      .catch(() => alert('Unable to load users'));
  }

  function handleDeleteUser(userId) {
    deleteUser(userId)
      .catch(() => {
        alert('Unable to delete user');
      })
      .then(handleLoadUsers);
  }

  useEffect(() => {
    handleLoadUsers();
  }, []);

  return(
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleLoadUsers}>Refresh</button>
      <h2>List of not admin users</h2>
      <ul>
      {users && users.map(user =>
        <li key={user.id}>
          {user.username}
          <button onClick={(e) => handleDeleteUser(user.id)}>delete</button>
        </li>)}
      </ul>
      {users && users.length === 0 && <p>No users found.</p>}
    </div>
  );
}
