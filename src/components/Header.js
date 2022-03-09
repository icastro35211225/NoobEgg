import React from "react";
import { Route, Routes, Link } from "react-router-dom";

export default function Header(props) {
    
    return (
        <header className="row block center">
            <div>
                <h1 >UTHRIFTSA</h1> 
                <Link to="/">Home </Link>
            </div>
            <div>
                <Link to="/signup">Sign Up </Link>
                <Link to="/login">Log In </Link>
                <a href="#/cart">Shopping Cart</a>
            </div>
        </header>
    )
}