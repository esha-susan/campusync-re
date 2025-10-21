import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../services/userService';
import Layout from '../common/Layout'; // Assuming you have a Layout component
import './AdminManageUsers.css'; // We will create this CSS file

const AdminManageUsers = ({ currentUser, onLogout }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch users from the database
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      setError('Failed to fetch users. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle the deletion of a user
  const handleDelete = async (userId) => {
    // Confirmation dialog to prevent accidental deletion
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await deleteUser(userId);
        // Refresh the user list after deletion
        fetchUsers(); 
      } catch (err) {
        setError('Failed to delete user.');
        console.error(err);
      }
    }
  };

  return (
    <Layout currentUser={currentUser} onLogout={onLogout}>
      <div className="manage-users-page">
        <div className="page-header">
          <div>
            <h1 className="page-title">Manage Users</h1>
            <p className="page-subtitle">View, edit, or delete user accounts.</p>
          </div>
          <Link to="/admin/users/create" className="btn-primary">
            &#43; Create User
          </Link>
        </div>

        {error && <p className="error-message">{error}</p>}
        
        <div className="dashboard-card">
          {isLoading ? (
            <p>Loading users...</p>
          ) : (
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td><span className={`role-badge role-${user.role}`}>{user.role}</span></td>
                      <td>{user.department}</td>
                      <td>
                        <div className="action-buttons">
                          {/* Add a link to a future edit page */}
                          <button className="btn-edit" disabled>Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(user.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminManageUsers;