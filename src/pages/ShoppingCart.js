import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';

export default function ShoppingCart(props) {
  
  let cartIDs = localStorage.getItem("cartIDs");
  const cart = [];
  const [cartList, setCartList] = useState('');

    // const getCart = ()=> {
    //   Axios.post("http://localhost:3001/api/cart", {
    //     cartIDs: cartIDs
    //   }).then((response) => {
    //     console.log(response);
    //     if(response.data.message){
    //       console.log(response.data.message);
    //     }else{
    //       cart = response.data;
    //     }
    //   });
    // };

    function getCart() {
      Axios.post("http://localhost:3000/api/cart", {
            cartIDs: cartIDs
          }).then((response) => {
            console.log(response);
            if(response.data.message){
              console.log(response.data.message);
            }else{
              cart = response.data;
              console.log(cart);
            }
          });
    }

    //console.log(cart);
    

    return (
        <shoppingcart>

            <h2>Shopping Cart</h2>
        </shoppingcart>
    )
}