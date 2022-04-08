import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup(props) {

    const navigate = useNavigate();

    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //FIXME: SHOULD ADD EMAIL VALIDATION (is email in right format?)
    //FIXME: CHECK IF EMAIL IS ALREADY USED WHEN CLICKING CREATE ACCOUNT

    const submitInfo = () => {
        
        //FOR TESTING
        // console.log(fName);
        // console.log(lName);
        // console.log(email);
        // console.log(password);

        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/signup', {
          fName: fName,
          lName: lName,
          email: email,
          password: password
        });

        navigate('/login');

        //clearFields();

    };
    
    const clearFields = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    }
    
    return (
        <signup>
            <h2>Make an account</h2>
            <h6 >This website was made for a class project. Do not use your login credentials from any other platforms.</h6>

            <label for="fName"><b>First Name</b></label>
            <input type="text" placeholder="First Name" name="fName" required onChange={(e)=> {
                setFirstName(e.target.value)
            }}></input>

            <label for="lName"><b>Last Name</b></label>
            <input type="text" placeholder="Last Name" name="lName" required onChange={(e)=> {
                setLastName(e.target.value)
            }}></input>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required onChange={(e)=> {
                setEmail(e.target.value)
            }}></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required onChange={(e)=> {
                setPassword(e.target.value)
            }}></input>

            <button onClick={submitInfo}>Create Account</button>

        </signup>
    )
}