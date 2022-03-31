import React, { useState, useEffect} from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";

export default function Header(props) {
    
    let navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState('');

    const reloadPage = () => {
        window.location.reload(false);
    }

    useEffect ( () => {
        if(localStorage.getItem("userInfo") != null){
            setLoggedIn(true);
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            setIsAdmin(userInfo.isAdmin);
        }
        //reloadPage();
    }, []);

    const logout = () => {
        localStorage.clear();
        navigate('/login');
        reloadPage();
    }
    
    return (
        <header className="row block center">
            <div>
                <a href="/"><h1>UTHRIFTSA</h1></a>
                {/* <Link to="/">Home </Link> */}
            </div>
            <div>
                <div>
                { loggedIn ?
                <div>
                    { isAdmin ?
                    <Link to="/admin/additem">Add Item </Link>
                    : null
                    }
                <Link to="/cart">Shopping Cart</Link>
                <button onClick={logout}>Log Out</button>
                </div>
                : 
                <div>
                <Link to="/signup">Sign Up </Link>
                <Link to="/login">Log In </Link>
                </div>
                }
                </div>
            </div>
        </header>
    )
}