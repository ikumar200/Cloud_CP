// src/components/LogoutButton.jsx
import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
