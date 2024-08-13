import React from 'react';
import './App.css';
import EmployeeDashboard from "./pages/home";
import Navbar from "./components/navbar";
function App() {
  return (
    <div className="App">
      <Navbar/>
      <EmployeeDashboard />
    </div>
  );
}

export default App;
