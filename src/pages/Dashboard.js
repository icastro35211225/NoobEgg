import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';

export default function Dashboard(props) {

    //Account details
    const [user, setUser] = useState(null);
    const [editingAccount, setEditingAccount] = useState(false);
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const getUser = async () => {
        const userInfo = JSON.parse(await localStorage.getItem("userInfo"));
        console.log(userInfo)
        if (userInfo) {
            //console.log(userInfo) 
            await setUser(userInfo);
            setFirstName(userInfo.FirstName);
            setLastName(userInfo.LastName);
            setEmail(userInfo.Email);
            setPassword(userInfo.Pass);
            setAddress(userInfo.shipAddress);
        }
    }
    
    const updateAccount = async () => {
        let response = await Axios.put('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/updateAccount',
        {
            userID: user.UserID,
            fName: fName,
            lName: lName,
            email: email,
            password: password,
            address: address
        });
        //get user from database w userID
        let tempUser = await Axios.get(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getUser/${user.UserID}`);
        //upload that user to local storage
        localStorage.setItem("userInfo", JSON.stringify(tempUser.data[0]));
        getUser()
    }

    const clickedApply = () => {
        (async () => await updateAccount())();
        localStorage.clear();
        setEditingAccount(false);
    }

    useEffect(()=> {
        getUser();
        
      }, [])

    return (
        <dashboard>
            {user ? 
            <div>
                <h2>Account Dashboard</h2>
                {editingAccount ?
                                <div>
                                    <button onClick={() => setEditingAccount(false)}>Cancel</button>
                                    <label><b>First Name</b></label>
                                    <input type="text" placeholder="First Name" value={fName} onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}></input>
                                    <label><b>Last Name</b></label>
                                    <input type="text" placeholder="Last Name" value={lName} onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}></input>
                                    <label><b>Email</b></label>
                                    <input type="text" placeholder="Email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}></input>
                                    <label><b>Password</b></label>
                                    <input type="password" placeholder="Password" value={user.Pass} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}></input>
                                    <label><b>Shipping Address</b></label>
                                    <input type="text" placeholder="Shipping Address" value={address} onChange={(e) => {
                                        setAddress(e.target.value)
                                    }}></input>
                                    <button onClick={() => clickedApply()}>Apply Changes</button>
                                </div>
                                :
                                <div>
                                    <button onClick={() => setEditingAccount(true)}>Edit Account</button>
                                    <p>Name: {user.FirstName} {user.LastName}</p>
                                    <p>Email: {user.Email}</p>
                                    <p>Shipping Address: {user.shipAddress}</p>
                                </div>
                            }
            </div>
            : null }
        </dashboard>
    )
}