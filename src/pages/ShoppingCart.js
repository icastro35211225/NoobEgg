import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';
import { useNavigate, Redirect, Navigate } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";

export default function ShoppingCart(props) {

    const [checkoutComplete, setCheckout] = useState(false);
    const [itemList, setItemlist] = useState([]);
    const [user, setUser] = useState();
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [stockErrMsg, setStockErrMsg] = useState("");
    const [pS, setpS] = useState("");
    const [orderID, setOrderID] = useState();
    var pStr = "";
    let navigate = useNavigate();

    useEffect(()=> {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            //console.log(userInfo)
          setUser(userInfo);
        }

        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getCart',
            { userID: userInfo.UserID }
        ).then((response)=> {
            //console.log(response.data.message);
            if(response.data.message != null){
                //console.log(response.data.message);

            }
            else{ 
                //console.log(response.data);
                var subt = 0;
                for(let i = 0; i < response.data.length; i++){
                    subt += (response.data[i].ProductPrice * response.data[i].qty);
                    //console.log(i)
                    if(i < (response.data.length-1) ){
                        pStr += response.data[i].ProductID + ":" + response.data[i].qty + ",";
                        //console.log(pStr)
                        setpS(pStr);
                    }
                    else{
                        pStr += response.data[i].ProductID + ":" + response.data[i].qty;
                        // console.log("In else")
                        // console.log(pStr)
                        setpS(pStr);
                    }
                }
                setItemlist(response.data);
                setSubtotal(parseFloat((subt).toFixed(2)));
                var ttax = (subt * 0.0825).toFixed(2);
                setTax(parseFloat(ttax));
                var ttotal = parseFloat(subt) + parseFloat(ttax);
                setTotal(parseFloat(ttotal.toFixed(2)));
            }
        })
      }, [])

    //Make remove from cart function

    const checkout = () => {
        //For debugging: checking if info beign send to database is correct
        console.log(itemList.length)
        console.log(user.UserID);
        console.log(user.shipAddress);
        console.log("Items: " + pS);
        console.log(subtotal);
        console.log(tax);
        console.log(total);

        //Recheck stock of items to make sure they are still in stock
        for(let i = 0; i < itemList.length; i++){
            console.log(itemList[i].ProductName);
            Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct',
                {id: itemList[i].ProductID}
            ).then((response)=> {
                //console.log(response);
                // console.log(response.data[0].ProductID);
                // console.log(response.data[0].ProductName);
                // console.log(response.data[0].ProductStock);
            if(itemList[i].qty > response.data[0].ProductStock){
                setStockErrMsg("Sorry, we dont have that many " + response.data[0].ProductName + "(s) available. Please check available stock and change your order accordingly.");
                return;
            }      
              })
        }

        //Post to orders table WORKS-------
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/addToOrders',
            {
                userID: user.UserID,
                shipping: user.shipAddress,
                products: pS,
                subtotal: subtotal,
                tax: tax,
                total: total
            }
        ).then((response) => {
            //setOrderID(response.data[0].OrderID);
            console.log(response);
        });

        //Update product stock
        for(let i = 0; i < itemList.length; i++){
            Axios.put("http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/updateProductStock",
                {
                    productID: itemList[i].ProductID,
                    newStock: itemList[i].qty
                }
            )
        }

        //Clear cart WORKS
        Axios.delete(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/clearCart/${user.UserID}`);

        //Send them to order summary page w/ order id, ONLY RELOADING PAGE NOW
        //navigate('/');
        setCheckout(true);
        //return navigate('/');
    }

    return (
        <shoppingcart>
            {checkoutComplete ?
                    <OrderSummary orderID={19} />
                : 
                <div>
                    <h2>Shopping Cart</h2>
                    <p>{stockErrMsg}</p>
                    {itemList.length != 0 ?
                        <div>
                        {itemList.map((product)=> {
                            return(
                                <div className="cart_card">
                                <h1>{product.ProductName}</h1>
                                <p>IMAGE {product.ProductImage}</p>
                                <p>${product.ProductPrice}</p>
                                <p>Amount: {product.qty}</p>
                                </div>
                            )
                        }
                        )}
                        <p>____________________________________________________________</p>
                        <h3>Summary</h3>
                        <p>Subtotal: ${subtotal}</p>
                        <p>Tax: ${tax}</p>
                        <p>Order Total: ${total}</p>
                        <button onClick={checkout}>Complete purchase</button>
                        </div>
                    : 
                        <h3>Your cart is empty!</h3>
                    }
                </div>
            }
        </shoppingcart>
    )
}