import React, { useState, useEffect } from "react";
import './App.css';
import { Route, Routes, Link } from "react-router-dom";
//import Axios from 'axios';
//import Header from "./components/Header";
import Home from "./components/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
//import Footer from './components/Footer';
import AddItem from './pages/AddItem';
import ShoppingCart from './pages/ShoppingCart';


function App() {

  const [token, setToken] = useState();

  return (
    <div className="App">
      <header className="row">
                <div>
                    <a className="brand" href="/">UthrifTSA</a>
                </div>
                <div>
                  <Link to="/cart">SHOPPING CART</Link>
                  <Link to="/login">LOG IN </Link>
                </div>
            </header>
      <div className="form">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />}/>  
          <Route path="/login" element={<Login />}/>
          <Route path="/admin/additem" element={<AddItem />}/>
          <Route path="/cart" element={<ShoppingCart />}/>
        </Routes>
      </div>
      <footer className="row center">ALL RIGHTS RESERVED (LMAAO)</footer>
    </div>
  );
}

export default App;