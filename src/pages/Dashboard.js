import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';

export default function Dashboard(props) {

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
        <dashboard>
            <h2>Account Dashboard</h2>
            {user ? 
            <div>
                <h3>Account Details</h3> <button>Edit Account</button>
                <p>Name: {user.FirstName} {user.LastName}</p>
                <p>Email: {user.Email}</p>
                <p>Shipping Address: {user.shipAddress}</p>
            </div>
            : null }
        </dashboard>
    )
}