import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes, Link } from "react-router-dom";
//import Axios from 'axios';
import Header from "./components/Header";
import Home from "./components/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Footer from './components/Footer';
import AddItem from './pages/AddItem';
import ShoppingCart from './pages/ShoppingCart';


function App() {

  const [token, setToken] = useState();

  return (
    <div className="App">
      <Header></Header>

      <div className="form">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/admin/additem" element={<AddItem />}/>
          <Route path="/cart" element={<ShoppingCart />}/>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;