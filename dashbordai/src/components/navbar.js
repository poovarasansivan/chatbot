// src/components/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:underline">Home</a></li>
          <li><a href="#" className="hover:underline">Profile</a></li>
          <li><a href="#" className="hover:underline">Settings</a></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
