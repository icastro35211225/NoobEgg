import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';
import { useNavigate, Redirect, Navigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import { Button, Card, Col, Row, Badge, Toast, ToastContainer } from "react-bootstrap";

export default function ShoppingCart(props) {

    const [checkoutComplete, setCheckout] = useState(false);
    const [itemList, setItemlist] = useState(null);
    const [user, setUser] = useState();
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [stockErrMsg, setStockErrMsg] = useState("");
    const [pS, setpS] = useState("");
    const [order, setOrder] = useState(null);
    var pStr = "";
    let navigate = useNavigate();
    //Discount codes
    const [userCode, setUserCode] = useState();
    const [validCode, setValidCode] = useState(false);
    const [codes, setCodes] = useState(null);
    const [errShow, setErrShow] = useState(false);

    const postOrder = async () => {
        let tempOrder = await Axios.post('http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/addToOrders',
            {
                userID: user.UserID,
                shipping: user.shipAddress,
                products: pS,
                subtotal: subtotal,
                tax: tax,
                total: total
            }
        );
        //console.log(tempOrder.data);
        (async () => await getUserOrders(user.UserID))();
        //await setOrder(tempOrder.data[tempOrder.data.length - 1]);
    }

    const getUser = async () => {
        const userInfo = JSON.parse(await localStorage.getItem("userInfo"));
        //console.log(userInfo)
        if (userInfo) {
            await setUser(userInfo);
        }
    }

    const getCart = async () => {
        let tempCart = await Axios.post('http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/getCart', { userID: user.UserID });
        //console.log(tempCart.data);
        if (tempCart.data.message != null) {
            //console.log(response.data.message);
        }
        else {
            //console.log(tempCart.data);
            var subt = 0;
            for (let i = 0; i < tempCart.data.length; i++) {
                subt += (tempCart.data[i].ProductPrice * tempCart.data[i].qty);
                //console.log(i)
                if (i < (tempCart.data.length - 1)) {
                    pStr += tempCart.data[i].ProductID + ":" + tempCart.data[i].qty + ",";
                    //console.log(pStr)
                    setpS(pStr);
                }
                else {
                    pStr += tempCart.data[i].ProductID + ":" + tempCart.data[i].qty;
                    // console.log("In else")
                    // console.log(pStr)
                    setpS(pStr);
                }
            }
            setItemlist(tempCart.data);
            setSubtotal(parseFloat((subt).toFixed(2)));
            var ttax = (subt * 0.0825).toFixed(2);
            setTax(parseFloat(ttax));
            var ttotal = parseFloat(subt) + parseFloat(ttax);
            setTotal(parseFloat(ttotal.toFixed(2)));
        }
    }

    const getUserOrders = async (uID) => {
        let orders = await Axios.get(`http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/getUserOrders/${uID}`);
        console.log(orders.data)
        await setOrder(orders.data[orders.data.length - 1]);
    }

    const getCodes = async () => {
        let tempCodes = await Axios.get('http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/getCodes');
        await setCodes(tempCodes.data);
    }

    const deleteItem = async (itemID) => {
        console.log(itemID)
        let message = await Axios.delete(`http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/deleteItem/${itemID}/${user.UserID}`);
        console.log(message.data.message);
        setItemlist(null);
        await getCart();
    }

    const goBack = () => {
        setCheckout(false);
        window.location.reload(false);
    }

    const clickedDelete = (pID) => {
        (async () => await deleteItem(pID))();
    }

    useEffect(() => {
        getUser();
        getCodes();
    }, [])

    //Make remove from cart function

    const checkout = async () => {
        //For debugging: checking if info beign send to database is correct
        // console.log(itemList.length)
        // console.log(user.UserID);
        // console.log(user.shipAddress);
        // console.log("Items: " + pS);
        // console.log(subtotal);
        // console.log(tax);
        // console.log(total);

        //Recheck stock of items to make sure they are still in stock
        for (let i = 0; i < itemList.length; i++) {
            //console.log(itemList[i].ProductName);
            Axios.post('http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/getProduct',
                { id: itemList[i].ProductID }
            ).then((response) => {
                //console.log(response);
                // console.log(response.data[0].ProductID);
                // console.log(response.data[0].ProductName);
                // console.log(response.data[0].ProductStock);
                if (itemList[i].qty > response.data[0].ProductStock) {
                    setStockErrMsg("Sorry, we dont have that many " + response.data[0].ProductName + "(s) available. Please check available stock and change your order accordingly.");
                    return;
                }
            })
        }

        //Post to orders table WORKS-------
        (async () => await postOrder())();

        //Update product stock
        for (let i = 0; i < itemList.length; i++) {
            Axios.put("http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/updateProductStock",
                {
                    productID: itemList[i].ProductID,
                    newStock: itemList[i].qty
                }
            )
        }

        //Clear cart WORKS
        Axios.delete(`http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/clearCart/${user.UserID}`);

        //Send them to order summary page w/ order id, ONLY RELOADING PAGE NOW
        //navigate('/');
        //setCheckout(true);
        //return navigate('/');
    }

    const applyCode = (code) => {
        let newSubtotal = subtotal - (subtotal * code.mul);
        setSubtotal(parseFloat(newSubtotal.toFixed(2)));
        var ttax = (newSubtotal * 0.0825).toFixed(2);
        setTax(parseFloat(ttax));
        var ttotal = parseFloat(newSubtotal) + parseFloat(ttax);
        setTotal(parseFloat(ttotal.toFixed(2)));
        setValidCode(true);
    }

    const checkCode = () => {
        for (let i = 0; i < codes.length; i++) {
            if (userCode === codes[i].dCode) {
                console.log("code " + userCode + " in disCodes with " + codes[i].mul);
                applyCode(codes[i]);
                return;
            }
        }
        setErrShow(true);
    }

    useEffect(() => {
        if (order === null) return;
        setCheckout(true);
    }, [order])

    useEffect(() => {
    }, [itemList])

    useEffect(() => {
        if (!user) return;
        (async () => await getCart())();
    }, [user])

    return (
        <shoppingcart>
            <ToastContainer className="p-3" position={'bottom-start'} >
                <Toast show={errShow} onClose={() => setErrShow(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">The code typed in is not valid.</Toast.Body>
                </Toast>
            </ToastContainer>
            <Row>
                {checkoutComplete ?
                    <div>
                        <Button variant="success" onClick={goBack}>Back to Cart</Button>
                        <OrderSummary orderID={order.OrderID} />
                    </div>
                    :
                    <div>
                        {/* <Button variant="outline-secondary" onClick={goBack}>Back to Cart</Button> */}
                        <h2>Shopping Cart</h2>
                        <p>{stockErrMsg}</p>
                        {itemList !== null ?
                            <div>
                                {itemList.map((product) => {
                                    return (
                                        <Card key={product.productID}>
                                            <Card.Body>
                                                <Col><img id="proImg" className="product-info-proImg" src={product.ProductImage}></img></Col>
                                                <Col><h2>{product.ProductName}</h2></Col>
                                                <Col>${product.ProductPrice}</Col>
                                                <Col>Amount: {product.qty}</Col>
                                                <Col><Button variant="danger" onClick={() => { clickedDelete(product.ProductID) }}>Delete Item</Button></Col>
                                            </Card.Body>
                                        </Card>
                                    )
                                }
                                )}
                                <Col>
                                    <Card>
                                        <Card.Body>
                                            <Col><h2>Discount Code</h2></Col>
                                            {validCode ?
                                                <Col><Badge bg="success">Code {userCode} applied.</Badge></Col>
                                                :
                                                <div>
                                                    <Col><input onChange={(e) => { setUserCode(e.target.value) }} placeholder="Code"></input></Col>
                                                    <Col><Button variant="secondary" onClick={() => { checkCode() }}>Apply Code</Button></Col>
                                                </div>
                                            }

                                        </Card.Body>
                                    </Card>
                                    <Card>
                                        <Col><h2>Summary</h2></Col>
                                        <Col><p>Subtotal: ${subtotal}</p></Col>
                                        <Col><p>Tax: ${tax}</p></Col>
                                        <Col><p>Order Total: ${total}</p></Col>
                                        <Col><Button variant="success" onClick={() => { checkout() }}>Complete purchase</Button></Col>
                                    </Card>
                                </Col>
                            </div>
                            :
                            <h3>Your cart is empty!</h3>
                        }
                    </div>
                }
            </Row >
        </shoppingcart >
    )
}