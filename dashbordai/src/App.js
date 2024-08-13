import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import EmployeeDashboard from "./pages/home"; // Assuming this is the main page
import Analytics from "./pages/analytics"; // Add profile page component
import Navbar from "./components/navbar"; // Ensure Navbar uses Link for routing

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<EmployeeDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
