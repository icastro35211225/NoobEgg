import React, { useState } from "react";
import './Login.css';
import Axios from "axios";

export default function Login(setToken) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const displayInfo = () => {
        console.log(email);
        console.log(password);
        setEmail("");
        setPassword("");
    };

    const login = () => {
        Axios.post("http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/login", {
            email: email,
            password: password,
        }).then((response) => {
            console.log(response);
            if(response.data.message) {
                setLoginStatus(response.data.message);
            }
            else{
                setLoginStatus("Greetings, " + response.data[0].fName);
            }
        });
    };

    return (
        <login>
            <div className="login-wrapper">
                <h2>Log in</h2>
                {/* <button onClick={displayInfo}>Log In</button> */}
                <label>
                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" onChange={(e)=> {setEmail(e.target.value);}}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" onChange={(e)=> {setPassword(e.target.value);}}/>
                </label>
                    <button type="submit" onClick={login}>Submit</button>
            </div>
            <h1> {loginStatus}</h1>
        </login>
    )
}