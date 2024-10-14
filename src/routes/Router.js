import React, { useState } from "react"; // Import useState
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const Router = () => {
  const [user, setUser] = useState(null); 

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" 
        element={
          user ? (
            <Dashboard user={user} onLogout={handleLogout} />
          ) : (
            <Login setUser={setUser} /> 
          )
        }
      />
    </Routes>
  );
};

export default Router;
