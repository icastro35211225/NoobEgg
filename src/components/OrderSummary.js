import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Col, ListGroup} from "react-bootstrap";

export default function OrderSummary(props) {

    const navigate = useNavigate();
    const orderID = props.orderID;

    const [user, setUser] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [loginStatus, setLoginStatus] = useState('');
    const [order, setOrder] = useState(null);
    const [orderProducts, setOrderProducts] = useState([]);
    const [orderUser, setOrderUser] = useState(null);
    let orderProds = [];

    const getOrderUser = async (uID) => {
        let oUser = await Axios.get(`api-noobegg.up.railway.app/api/getUser/${uID}`);
        //console.log(oUser.data[0]);
        await setOrderUser(oUser.data[0]);
    }

    const getOrder = async() =>{
        let ord = await Axios.get(`api-noobegg.up.railway.app/api/getOrder/${orderID}`);
        //console.log(ord.data[0]);
        await setOrder(ord.data[0]);
    }

    //TODO: find a way to display the number of items per product
    const getProducts = async() =>{
        let prodArr = order.Products.split(",");
        for(let i = 0; i < prodArr.length; i++){
            let currProd = prodArr[i].split(":");
            //console.log("Product ID: " + currProd[0] + " Product Amount: " + currProd[1]);
            let currProdObj = await Axios.post('api-noobegg.up.railway.app/api/getProduct', {id: currProd[0]});
            //console.log(response.data[0]);
            orderProds.push(currProdObj.data[0]);
            
        }
        await setOrderProducts(orderProds);
        //console.log(orderProducts);
    }

    useEffect(()=> {

        //get user info
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            //console.log(userInfo)
          setUser(userInfo);
        }
        //get order 
        (async () => await getOrder())()
    }, [])

    useEffect(() => {
        //console.log("In use effect to get order user");
        if(order === null) return;
        //console.log(order);
        (async () => await getOrderUser(order.OrderUserID))() 
        //getOrderUser(order.OrderUserID);
    }, [order])

    useEffect(() => {
        if(order === null) return;
        (async () => await getProducts(order.OrderUserID))()
        //console.log(orderProducts);
    }, [order]);

    useEffect(() => {
        if(orderUser == null) return;
        //console.log(orderUser);
    }, [orderUser])

    return (
        <ordersummary>
            <div>
                <Card>
                
                
                <h1>Order Summary</h1>
                { orderUser ?
                    <div>
                        <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item><Col><p>Order Number: {orderID}</p></Col></ListGroup.Item>
                        
                        <ListGroup.Item>
                            <p>Name: {orderUser.FirstName} {orderUser.LastName}</p>
                            <p>Shipping Address: {orderUser.shipAddress}</p>
                            <p>Order Date: {order.OrderDate}</p>
                        </ListGroup.Item>
                        
                        <div>
                        {orderProducts ? 
                            <div>
                                <Col><h4>Products Ordered</h4></Col>
                                <div>
                                    {orderProducts.map((product) => { 
                                        return(
                                            <ListGroup.Item>
                                            <div key={product}>
                                                <h5>Product Name: {product.ProductName}</h5>
                                                <img id="proImg" src={product.ProductImage} className="product-info-proImg"></img>
                                                <p>Price: ${product.ProductPrice}</p>
                                            </div>
                                            </ListGroup.Item>
                                        );
                                    })}
                                </div>
                                
                                <h6>Subtotal: ${order.OrderSubtotal}</h6>
                                <h6>Tax: ${order.OrderTax}</h6>
                                <ListGroup.Item><h5><strong>Total: ${order.OrderTotal}</strong></h5>
                               </ListGroup.Item>
                                </div>
                            : 
                            <h5>Loading Products...</h5>
                            
                        }
                        </div>
                        </ListGroup></Card.Body>
                    </div>
                    :
                    <h1>Loading Order Summary...</h1>
                }
                {/* <img src="https://www.seekpng.com/png/detail/6-60874_grey-t-shirt-png-vector-royalty-free-length.png"></img> */}
                
                </Card>
            </div>
        </ordersummary>
    )
}