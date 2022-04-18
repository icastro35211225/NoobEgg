import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../App.css';

export default function AdminDashboard(props) {

    const [user, setUser] = useState();
    const [acctInfo, setAcctInfo] = useState("");
    const [codes, setCodes] = useState(null);
    const [addingCode, setAddingCode] = useState(false);

    const getCodes = async() =>{
        let tempCodes = await Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getCodes');
        await setCodes(tempCodes.data);
    }

    const addCode = async() => {
        setAddingCode(false);
    }

    useEffect(()=> {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            setUser(userInfo);
            console.log(user);
        } 

    }, [])

    useEffect(()=> {
        if(codes === null) return;
        
    }, [codes])

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
            <p>____________________________________________________________</p>
            <Link to="/admin/additem">Add Item </Link>
            <p>____________________________________________________________</p>
            <div id="discountwrapper">
                <h3>Discount Codes</h3>
            </div>
            {addingCode ? 
                <div>
                    <div>
                        <input placeholder="Code"></input>
                        <input placeholder="Multiplier"></input>
                    </div>
                    <button onClick={addCode}>Add Code</button>
                </div>
                :
                <button onClick={function(){setAddingCode(true);}}>Add discount code</button>
            }
        </admindashboard>
    )
}