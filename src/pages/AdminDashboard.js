import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../App.css';

export default function AdminDashboard(props) {

    const [user, setUser] = useState();
    const [acctInfo, setAcctInfo] = useState("");

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            setUser(userInfo);
            console.log(user);
        } 
    }, [])

    return (
        <admindashboard>
            <h2>Admin Dashboard</h2>
            {user ? 
            <div>
                <h3>Account Details</h3> <button>Edit Account</button>
                <p>Name: {user.FirstName} {user.LastName}</p>
                <p>Email: {user.Email}</p>
                <p>Shipping Address: {user.shipAddress}</p>
            </div>
            : null }
            <Link to="/admin/additem">Add Item </Link>
        </admindashboard>
    )
}