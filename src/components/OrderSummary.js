import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
        let oUser = await Axios.get(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getUser/${uID}`);
        //console.log(oUser.data[0]);
        await setOrderUser(oUser.data[0]);
    }

    const getOrder = async() =>{
        let ord = await Axios.get(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getOrder/${orderID}`);
        //console.log(ord.data[0]);
        await setOrder(ord.data[0]);
    }

    //TODO: find a way to display the number of items per product
    const getProducts = async() =>{
        let prodArr = order.Products.split(",");
        for(let i = 0; i < prodArr.length; i++){
            let currProd = prodArr[i].split(":");
            //console.log("Product ID: " + currProd[0] + " Product Amount: " + currProd[1]);
            let currProdObj = await Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct', {id: currProd[0]});
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
                <h1>Order Summary</h1>
                <p>____________________________________________________________</p>
                { orderUser ?
                    <div>
                        <p>Order Number: {orderID}</p>
                        <div>
                            <p>Name: {orderUser.FirstName} {orderUser.LastName}</p>
                            <p>Shipping Address: {orderUser.shipAddress}</p>
                        </div>
                        <div>
                        {orderProducts ? 
                            <div>
                                <h4>Products Ordered</h4>
                                <div>
                                    {orderProducts.map((product) => { 
                                        return(
                                            <div key={product}>
                                                <p>Product Name: {product.ProductName}</p>
                                                <p>IMAGE</p>
                                                <p>Price: ${product.ProductPrice}</p>
                                                <h6>____________________________________________________________________________________</h6>
                                            </div>
                                        );
                                    })}
                                </div>
                                <p>Subtotal: ${order.OrderSubtotal}</p>
                                <p>Tax: ${order.OrderTax}</p>
                                <p>Total: ${order.OrderTotal}</p>
                            </div>
                            : 
                            <h5>Loading Products...</h5>
                        }
                        </div>
                    </div>
                    :
                    <h1>Loading Order Summary...</h1>
                }
                {/* <img src="https://www.seekpng.com/png/detail/6-60874_grey-t-shirt-png-vector-royalty-free-length.png"></img> */}
            </div>
        </ordersummary>
    )
}