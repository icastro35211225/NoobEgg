import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';

export default function ShoppingCart(props) {

    const [itemList, setItemlist] = useState([]);
    const [user, setUser] = useState();

    useEffect(()=> {

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
          setUser(userInfo);
        }

        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getCart',
            { userID: userInfo.UserID }
        ).then((response)=> {
          setItemlist(response.data);
        })
        
      }, [])

    return (
        <shoppingcart>
            <h2>Shopping Cart</h2>
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
            </div>
        </shoppingcart>
    )
}