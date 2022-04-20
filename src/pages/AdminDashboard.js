import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Axios from 'axios';
import '../App.css';
import OrderSummary from "../components/OrderSummary";


export default function AdminDashboard(props) {

    const [user, setUser] = useState();
    const [acctInfo, setAcctInfo] = useState("");
    const [codes, setCodes] = useState(null);
    const [addingCode, setAddingCode] = useState(false);
    const [orders, setOrders] = useState(null);
    const [orderID, setOrderID] = useState(null);
    const [viewingOrder, setViewingOrder] = useState(false);

    const goBack = () => {
        setViewingOrder(false);
        //window.location.reload(false);
    }

    const getCodes = async () => {
        let tempCodes = await Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getCodes');
        await setCodes(tempCodes.data);
    }

    const showOrder = (id) => {
        setOrderID(id);
        setViewingOrder(true);
    }

    const addCode = async () => {
        setAddingCode(false);
    }

    const getOrders = async () => {
        let tempOrders = await Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getAllOrders');
        await setOrders(tempOrders.data);
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            setUser(userInfo);
            console.log(user);
        }

        (async () => await getOrders())()

    }, [])

    useEffect(() => {
        if (codes === null) return;

    }, [codes])

    useEffect(() => {

    }, [viewingOrder])

    return (
        <admindashboard>
            {viewingOrder ?
                <div>
                    <button onClick={goBack}>Back to Dashboard</button>
                    <OrderSummary orderID={orderID} />
                </div>
                :
                <div>
                    <h2>Admin Dashboard</h2>
                    {user ?
                        <div>
                            <h3>Account Details</h3> <button>Edit Account</button>
                            <p>Name: {user.FirstName} {user.LastName}</p>
                            <p>Email: {user.Email}</p>
                            <p>Shipping Address: {user.shipAddress}</p>
                        </div>
                        : null}
                    <p>____________________________________________________________</p>
                    <Link to="/admin/additem">Add Item </Link>
                    <p>____________________________________________________________</p>
                    <h3>Orders</h3>
                    {orders === null ?
                        <p>No orders</p>
                        :
                        // <div>
                        //     {orders.map((order) => { 
                        //         return(
                        //             <div key={order}>
                        //                 <button className="orderBtns" onClick={() => showOrder(order.OrderID)}>{order.OrderID} {order.OrderUserID} {order.OrderDate} ${order.OrderTotal}</button>
                        //             </div>
                        //         );
                        //     })}
                        // </div>
                        <table>
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Order Date</th>
                                <th>Order Total</th>
                            </tr>
                            {orders.map((order) => {
                                return (
                                    <tr key={order.orderID}>

                                        <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderID}</button></td>
                                        <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderUserID}</button></td>
                                        <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>{order.OrderDate}</button></td>
                                        <td><button className="tableButton" onClick={() => showOrder(order.OrderID)}>${order.OrderTotal}</button></td>
                                        
                                        {/* <button className="orderBtns" onClick={() => showOrder(order.OrderID)}>{order.OrderID} {order.OrderUserID} {order.OrderDate} ${order.OrderTotal}</button> */}
                                    </tr>
                                );
                            })}
                        </table>
                    }
                    <p>____________________________________________________________</p>
                    <div id="discountwrapper">
                        <h3>Discount Codes</h3>
                    </div>
                    {addingCode ?
                        <div>
                            <div>
                                <input placeholder="Code"></input>
                                <input placeholder="Multiplier"></input>
                            </div>
                            <button onClick={addCode}>Add Code</button>
                        </div>
                        :
                        <button onClick={function () { setAddingCode(true); }}>Add discount code</button>
                    }
                </div>
            }
        </admindashboard>
    )
}