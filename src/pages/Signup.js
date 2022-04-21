import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />

export default function Signup(props) {

    const navigate = useNavigate();

    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

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
          password: password,
          address: address
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
                <h2>Create an account</h2>
                <h6 >This website was made for a class project. Do not use your login credentials from any other platforms.</h6>
                <div className="form-group">
                    <label for="fName"><b>First Name</b></label>
                    <input type="text" placeholder="First Name" name="fName" required onChange={(e)=> {
                        setFirstName(e.target.value)
                    }}></input>
                </div>

                <div className="form-group">
                <label for="lName"><b>Last Name</b></label>
                <input type="text" placeholder="Last Name" name="lName" required onChange={(e)=> {
                    setLastName(e.target.value)
                }}></input>
                </div>


                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" required onChange={(e)=> {
                    setEmail(e.target.value)
                }}></input>
                
                <label for="psw"><b>Password</b></label>
                <div className="pass-wrapper">
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter Password" name="psw" required onChange={(e)=> {
                        setPassword(e.target.value)
                    }}></input>
                    <i onClick={togglePasswordVisiblity}>{passwordShown ? notVisible : visible}</i>{" "}
                </div>

                <label for="psw"><b>Shipping Address</b></label>
                <input type="text" placeholder="Street, City, State, Zip Code" required onChange={(e)=> {
                    setAddress(e.target.value)
                }}></input>
                
                <button onClick={submitInfo}>Create Account</button>
        </signup>
    )
}