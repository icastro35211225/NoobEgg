import React, { useState, useEffect } from "react";
import '../App.css';

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const displayInfo = () => {
        console.log(email);
        console.log(password);

        setEmail("");
        setPassword("");

    };

    return (
        <login>
            <h2>Log in</h2>

            <label for="email"><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="email" required onChange={(e)=> {
                setEmail(e.target.value);
            }}></input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required onChange={(e)=> {
                setPassword(e.target.value);
            }}></input>

            <button onClick={displayInfo}>Log In</button>

        </login>
    )
}