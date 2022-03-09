import React from "react";
import '../App.css';

export default function Login(props) {
    
    return (
        <login>
            <h2>Log in</h2>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required></input>

            <button>Log In</button>

        </login>
    )
}