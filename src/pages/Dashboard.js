import React, { useState, useEffect } from "react";
import { Card, Button, Col, Row, Table, DropdownButton, Dropdown, ListGroup } from "react-bootstrap";
import OrderSummary from "../components/OrderSummary";
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
    //Order summary
    const [orders, setOrders] = useState(null);
    const [orderID, setOrderID] = useState(null);
    const [viewingOrder, setViewingOrder] = useState(false);

    const getUser = async () => {
        const userInfo = JSON.parse(await localStorage.getItem("userInfo"));
        //console.log(userInfo)
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
        let response = await Axios.put('api-noobegg.up.railway.app/api/updateAccount',
            {
                userID: user.UserID,
                fName: fName,
                lName: lName,
                email: email,
                password: password,
                address: address
            });
        //get user from database w userID
        let tempUser = await Axios.get(`api-noobegg.up.railway.app/api/getUser/${user.UserID}`);
        //upload that user to local storage
        localStorage.setItem("userInfo", JSON.stringify(tempUser.data[0]));
        getUser()
    }

    const getUserOrders = async () => {
        let tempOrders = await Axios.get(`api-noobegg.up.railway.app/api/getUserOrders/${user.UserID}`);
        await setOrders(tempOrders.data);
    }

    const sortHighToLow = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            return b.OrderTotal - a.OrderTotal;
        })
        setOrders(sortedOrders);
    }

    const sortLowToHigh = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            return a.OrderTotal - b.OrderTotal
        })
        setOrders(sortedOrders);
    }

    const sortByDate = () => {
        const sortedOrders = [...orders].sort((a, b) => {
            var dateA = new Date(a.OrderDate);
            var dateB = new Date(b.OrderDate);
            return dateA - dateB
        })
        setOrders(sortedOrders);
    }

    const showOrder = (id) => {
        setOrderID(id);
        setViewingOrder(true);
    }

    const clickedApply = () => {
        (async () => await updateAccount())();
        localStorage.clear();
        setEditingAccount(false);
    }

    const goBack = () => {
        setViewingOrder(false);
        //window.location.reload(false);
    }

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {
        getUserOrders();
    }, [user])

    return (
        <dashboard>
            <Card>
            {viewingOrder ?
                <div>
                    <Button onClick={goBack}>Back to Dashboard</Button>
                    <OrderSummary orderID={orderID} />
                </div>
                :
                <div>
                    <ListGroup variant="flush">
                    <h2>Account Dashboard</h2>
                    {user ?
                        <div>
                            <ListGroup.Item>
                            <h3>Account Details</h3>
                            {editingAccount ?
                                <div>
                                    <Col><Button onClick={() => setEditingAccount(false)}>Cancel</Button></Col>
                                    <label><b>First Name</b></label>
                                    <input type="text" placeholder="First Name" value={fName} onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}></input>
                                    <Col><b>Last Name</b></Col>
                                    <input type="text" placeholder="Last Name" value={lName} onChange={(e) => {
                                        setLastName(e.target.value)
                                    }}></input>
                                    <Col><b>Email</b></Col>
                                    <input type="text" placeholder="Email" value={email} onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}></input>
                                    <Col><b>Password</b></Col>
                                    <input type="password" placeholder="Password" value={user.Pass} onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}></input>
                                    
                                    <Col><b>Shipping Address</b></Col>
                                    <input type="text" placeholder="Shipping Address" value={address} onChange={(e) => {
                                        setAddress(e.target.value)
                                    }}></input>
                                    <Col><Button onClick={() => clickedApply()}>Apply Changes</Button></Col>
                                </div>
                                :
                                <div>
                                    <Button onClick={() => setEditingAccount(true)}>Edit Account</Button>
                                    <p>Name: {user.FirstName} {user.LastName}</p>
                                    <p>Email: {user.Email}</p>
                                    <p>Shipping Address: {user.shipAddress}</p>
                                </div>
                            }
                            </ListGroup.Item>
                        </div>
                        : null}
                        
                    <h3>My Orders</h3>
                    <DropdownButton id="dropdown-basic-button" title="Sort">
                    <Dropdown.Item onClick={() => sortHighToLow()}>Sort $$$</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortLowToHigh()}>Sort $</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByDate()}>Sort By Date</Dropdown.Item>
                    </DropdownButton>
                    
                    {orders === null ?
                        <p>No orders</p>
                        :
                        <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Order Date</th>
                                    <th>Order Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    return (
                                        <tr key={order.OrderID}>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderID}</button></td>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderDate}</button></td>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>${order.OrderTotal}</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        </Col>
                    }
                </ListGroup>
                </div>
            }
            </Card>
        </dashboard>
    )
}