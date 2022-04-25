import React, { useState, useEffect } from "react";
import './Login.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button, Toast, ToastContainer, Col } from "react-bootstrap";
const visible = <FontAwesomeIcon icon={faEye} />;
const notVisible = <FontAwesomeIcon icon={faEyeSlash} />

export default function Signup(props) {

    const navigate = useNavigate();
    const [errShow, setErrShow] = useState(false);
    const [emailUsed, setEmailUsed] = useState(false);
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [accounts, setAccounts] = useState();
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    //TODO: SHOULD ADD EMAIL VALIDATION? (is email in right format?)
    const getAccounts = async () => {
        let tempAccounts = await Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getAllAccounts');
        setAccounts(tempAccounts.data);
    }

    const submitInfo = () => {
        
        if(fName === '' || lName === '' || email === '' || password === '' || address === ''){
            setErrShow(true);
            return;
        }

        for(let i = 0; i < accounts.length; i++){
            if(email === accounts[i].Email){
                setEmailUsed(true);
                return;
            }
        }

        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/signup', {
          fName: fName,
          lName: lName,
          email: email,
          password: password,
          address: address
        });

        navigate('/login');
    };

    useEffect(() => {
        getAccounts();
    }, [])
    
    return (
        <signup>
            <ToastContainer className="p-3" position={'top-end'} >
                <Toast show={errShow} onClose={() => setErrShow(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">Please enter information for all fields.</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position={'top-end'} >
                <Toast show={emailUsed} onClose={() => setEmailUsed(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">This email is already being used.</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className="login-wrapper">
                <h2>SIGN UP</h2>
                <div className="form-group">
                    <p>First Name</p>
                    <input type="text" placeholder="First Name" name="fName" required onChange={(e)=> {
                    setFirstName(e.target.value)
                    }}></input>
                </div>

                <div className="form-group">
               <p>Last Name</p>
                <input type="text" placeholder="Last Name" name="lName" required onChange={(e)=> {
                    setLastName(e.target.value)
                }}></input>
                </div>

                <div className="form-group">
                <p>Email</p>
                <input type="text" placeholder="Enter Email" name="email" required onChange={(e)=> {
                    setEmail(e.target.value)
                }}></input>
                <p>Password</p>
                </div>
                
                <div className="pass-wrapper">
                    <input type={passwordShown ? "text" : "password"} placeholder="Enter Password" name="psw" required onChange={(e)=> {
                    setPassword(e.target.value)
                    }}></input>
                    <i onClick={togglePasswordVisiblity}>{passwordShown ? notVisible : visible}</i>{" "}
                </div>

                <div className="form-group">
                <p>Shipping Address</p>
                <input type="text" placeholder="Street, City, State, Zip Code" required onChange={(e)=> {
                    setAddress(e.target.value)
                }}></input>
                </div>
                <h6><u>This website was made for a class project. Do not use your login credentials from any other platforms.</u></h6>
                <Col><Button variant="dark" onClick={submitInfo}>Create Account</Button></Col>
                <p> </p>
            </div>
        </signup>
    )
}