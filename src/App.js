//import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes, Link } from "react-router-dom";
//import Axios from 'axios';
import Header from "./components/Header";
import Home from "./components/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      <Header></Header>

      <div className="form">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}/>  
          <Route path="/login" element={<Login />}/>
        </Routes>

        
      </div>
    </div>
  );
}

export default App;