import React, { useState } from "react";
import './Login.css';
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Toast, ToastContainer } from "react-bootstrap";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />


export default function Login(setToken) {

    const navigate = useNavigate();
    const [errShow, setErrShow] = useState(false);
    const [loginErr, setLoginErr] = useState(false);
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
        if (email === '' || password === '') {
            setErrShow(true);
            console.log("Please enter correct information");
            return;
        }
        Axios.post("https://api-noobegg.up.railway.app/api/login", {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            email: email,
            password: password,
        }).then((response) => {
            //console.log(response);
            if (response.data.message) {
                setLoginErr(true);
                //setLoginStatus(response.data.message);
                //console.log(response);
            }
            else {
                setLoginStatus("Greetings, " + response.data[0].fName);
                localStorage.setItem("userInfo", JSON.stringify(response.data[0]));
                navigate("/");
                window.location.reload(false);
            }
        });
    };

    return (
        <login>
            <ToastContainer className="p-3" position={'top-end'} >
                <Toast show={errShow} onClose={() => setErrShow(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Please enter valid credentials.</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position={'middle-end'} >
                <Toast show={loginErr} onClose={() => setLoginErr(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Wrong email or password.</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="login-wrapper">
                <h2>LOG IN</h2>
                {/* <button onClick={displayInfo}>Log In</button> */}
                <label>
                    <p>Email</p>
                    <input type="text" placeholder="Enter Email" onChange={(e) => { setEmail(e.target.value); }} />
                    <p>Password</p>
                </label>
                <div className="pass-wrapper">
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter Password" onChange={(e) => { setPassword(e.target.value); }} />
                    <i onClick={togglePasswordVisiblity}>{passwordShown ? notVisible : visible}</i>{" "}
                </div>
                <Button variant="dark" type="submit" onClick={login}>Submit</Button>
            </div>
            <h1> {loginStatus}</h1>
        </login>
    )
}