import React from "react";
import '../App.css';

export default function Signup(props) {
    
    return (
        <signup>
            <h2>Make an account</h2>
            <h6 >This website was made as a class project. Do not your login credentials for any other platform.</h6>

            <label for="fName"><b>First Name</b></label>
            <input type="text" placeholder="First Name" name="fName" required></input>

            <label for="lName"><b>Last Name</b></label>
            <input type="text" placeholder="Last Name" name="lName" required></input>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required></input>

            <button>Create Account</button>

        </signup>
    )
}