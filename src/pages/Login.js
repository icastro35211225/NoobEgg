import React, { useState } from "react";
import './Login.css';
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />


export default function Login(setToken) {

    const navigate = useNavigate();

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };
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
                console.log(response);
            }
            else{
                setLoginStatus("Greetings, " + response.data[0].fName);
                localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
                navigate("/");
                window.location.reload(false);
            }
        });
    };

    return (
        <login>
            <div className="login-wrapper">
                <h2>LOG IN</h2>
                {/* <button onClick={displayInfo}>Log In</button> */}
                <label>
                    <p>Email</p>
                    <input type= "text" placeholder="Enter Email" onChange={(e)=> {setEmail(e.target.value);}}/>
                    <p>Password</p>
                </label>
                <div className="pass-wrapper">
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter Password" onChange={(e)=> {setPassword(e.target.value);}}/>
                    <i onClick={togglePasswordVisiblity}>{passwordShown ? notVisible : visible}</i>{" "}
                </div>
                    <button type="submit" onClick={login}>Submit</button>
            </div>
            <h1> {loginStatus}</h1>
        </login>
    )
}