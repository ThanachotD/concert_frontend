import React, { useState } from 'react';
import { BASE_PATH } from '@/utils';

interface UserCreationFormProps {
  onUserCreated: (role: string) => void;
}

const UserCreationForm: React.FC<UserCreationFormProps> = ({ onUserCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  
  const createAdmin = async()=>{
       const response = await fetch( BASE_PATH+'user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Role: "admin",
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const createdUser = await response.json();
      onUserCreated(createdUser.Role); 
    }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch( BASE_PATH+'user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Role: role,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      const createdUser = await response.json();
      createAdmin()
      onUserCreated(createdUser.Role); 
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Failed to create user.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          >
            <option value="">Select a role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserCreationForm;
