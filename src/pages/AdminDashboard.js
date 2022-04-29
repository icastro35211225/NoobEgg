import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../App.css';
import OrderSummary from "../components/OrderSummary";
import { click } from "@testing-library/user-event/dist/click";
import { Button, Table, Col, Card, ListGroup, DropdownButton, Dropdown } from "react-bootstrap";



export default function AdminDashboard(props) {

    //Order summary
    const [orders, setOrders] = useState(null);
    const [orderID, setOrderID] = useState(null);
    const [viewingOrder, setViewingOrder] = useState(false);
    //Discount code
    const [addingCode, setAddingCode] = useState(false);
    const [codes, setCodes] = useState(null);
    const [disCode, setDisCode] = useState("");
    const [mult, setMult] = useState();
    //Account details
    const [user, setUser] = useState(null);
    const [editingAccount, setEditingAccount] = useState(false);
    const [fName, setFirstName] = useState('');
    const [lName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');

    const goBack = () => {
        setViewingOrder(false);
        //window.location.reload(false);
    }

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

    const getCodes = async () => {
        let tempCodes = await Axios.get('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/getCodes');
        await setCodes(tempCodes.data);
    }

    const postCodes = async () => {
        await Axios.post('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/addCode',
            {
                code: disCode,
                mult: mult
            });
        //await setCodes(null);
        console.log(codes);
    }

    const deleteCode = async (codeID) => {
        await Axios.delete(`http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/deleteCode/${codeID}`);
        //await setCodes(null);
    }

    const updateAccount = async () => {
        let response = await Axios.put('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/updateAccount',
            {
                userID: user.UserID,
                fName: fName,
                lName: lName,
                email: email,
                password: password,
                address: address
            });
        //get user from database w userID
        let tempUser = await Axios.get(`http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/getUser/${user.UserID}`);
        //upload that user to local storage
        localStorage.setItem("userInfo", JSON.stringify(tempUser.data[0]));
        getUser()
    }

    const showOrder = (id) => {
        setOrderID(id);
        setViewingOrder(true);
    }

    const sortHighToLow = () => {
        function highToLow(a, b) {
            return b.OrderTotal - a.OrderTotal
        }
        orders.sort(highToLow)
    }

    const sortLowToHigh = () => {
        function lowToHigh(a, b) {
            return a.OrderTotal - b.OrderTotal
        }
        orders.sort(lowToHigh)
    }

    const sortByDate = () => {
        function dates(a, b) {
            var dateA = new Date(a.OrderDate);
            var dateB = new Date(b.OrderDate);
            return dateA - dateB
        }
        orders.sort(dates)
    }

    const sortByCustomer = () => {
        function byCust(a, b) {
            return a.OrderUserID - b.OrderUserID
        }
        orders.sort(byCust)
    }

    const addCode = async () => {
        (async () => await postCodes())()
        setCodes(null);
        setAddingCode(false);
    }

    const clickedDelete = (cID) => {
        (async () => await deleteCode(cID))()
        setCodes(null);
    }

    const clickedApply = () => {
        (async () => await updateAccount())();
        localStorage.clear();
        setEditingAccount(false);
    }

    const getOrders = async () => {
        let tempOrders = await Axios.get('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/getAllOrders');
        await setOrders(tempOrders.data);
    }

    useEffect(() => {
        getUser()
        getOrders()
        getCodes()
    }, [])

    useEffect(() => {
        // if (codes === null) return;
        (async () => await getCodes())()
    }, [codes])

    useEffect(() => {
    }, [viewingOrder])

    return (
        <admindashboard>
            <Card>
            {viewingOrder ?
                <div>
                    <Button onClick={goBack}>Back to Dashboard</Button>
                    <OrderSummary orderID={orderID} />
                </div>
                :
                <div>
                    <ListGroup variant="flush">
                    <h2>Admin Dashboard</h2>
                    {user ?
                        <div>
                            <ListGroup.Item>
                            <h3>Account Details</h3>
                            {editingAccount ?
                                <div>
                                    <Button onClick={() => setEditingAccount(false)}>Cancel</Button>
                                    <Col><b>First Name</b></Col>
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
                                    <Button onClick={() => clickedApply()}>Apply Changes</Button>
                                </div>
                                :
                                <div>
                                    <Col>Name: {user.FirstName} {user.LastName}</Col>
                                    <Col>Email: {user.Email}</Col>
                                    <Col>Shipping Address: {user.shipAddress}</Col>
                                    <Button onClick={() => setEditingAccount(true)}>Edit Account</Button>
                                </div>
                            }
                            </ListGroup.Item>
                        </div>
                        : null} 
                    <h3>Add Item</h3>
                    <ListGroup.Item><Button href="/admin/additem">Add Item</Button></ListGroup.Item>
                    
                    <h3>Orders</h3>
                    <ListGroup.Item>
                    <DropdownButton variant="outline-dark" title="Sort">
                    <Dropdown.Item onClick={() => sortHighToLow()}>Sort from $$$ to $</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortLowToHigh()}>Sort from $ to $$$</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByDate()}>Sort by Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => sortByCustomer()}>Sort by Customer</Dropdown.Item>
                    </DropdownButton>
                    </ListGroup.Item>
                    {orders === null ?
                        <p>No orders</p>
                        :
                        <Col>
                        <Table striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>User ID</th>
                                    <th>Order Date</th>
                                    <th>Order Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => {
                                    return (
                                        <tr key={order.OrderID}>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderID}</button></td>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderUserID}</button></td>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderDate}</button></td>
                                            <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>${order.OrderTotal}</button></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                        </Col>
                    }
                    
                    <ListGroup.Item>
                    <div >
                        <h3>Discount Codes</h3>
                    </div>
                    {addingCode ?
                        <div>
                            <div>
                                <input placeholder="Code" onChange={(e) => { setDisCode(e.target.value) }}></input>
                                <input placeholder="Multiplier" onChange={(e) => { setMult(e.target.value) }}></input>
                            </div>
                            <Button onClick={addCode}>Add Code</Button>
                        </div>
                        :
                        <div>
                            {codes === null ?
                                <p>Loading Codes...</p>
                                :
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Mult</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {codes.map((code) => {
                                            return (
                                                <tr key={code.dCode}>
                                                    <td>{code.dCode}</td>
                                                    <td>{code.mul}</td>
                                                    <td><Button variant="danger" onClick={() => clickedDelete(code.dCode)}>Delete</Button></td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            }
                            <Button onClick={function () { setAddingCode(true); }}>Add discount code</Button>
                        </div>
                    }
                    </ListGroup.Item>
                    </ListGroup>
                </div>
            }
        </Card>
        </admindashboard>
    )
}