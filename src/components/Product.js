import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

export default function Product(props) {

    //const product = product.find((x) => {
       // return x._id === props.match.params.id;
    //}); 

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [count, setCount] = useState(1);
    const {product} = props; 
    const handleSubOne = () => {
        if(count > 1){
          setCount(count - 1);
        }
      };
    
      const handleAddOne = () => {
        setCount(count + 1);
      };
      const addToCart = (id) => {
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct',
            {id: id}
          ).then((response)=> {
          // console.log(user.id);
          // console.log(response);
          // console.log(response.data[0].ProductID);
          // console.log(response.data[0].ProductName);
          // console.log(response.data[0].ProductPrice);
          // console.log(response.data[0].ProductImage);
          // console.log(count);
          if(count > response.data[0].qty){
            setStockErrMsg("Sorry, we dont have that many " + response.data[0].ProductName + "(s) available.");
          } else { 

            Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/addToCart',
                {
                  userID: user.UserID,
                  productID: response.data[0].ProductID,
                  productName: response.data[0].ProductName,
                  productPrice: response.data[0].ProductPrice,
                  productImage: response.data[0].ProductImage,
                  amount: count
                }
            )
            setStockErrMsg("Added \"" + response.data[0].ProductName + "\" to cart!"); 
          }
          
        })

        // Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
        //   itemName: itemName,
        //   itemDescription: itemDescription
        // });
      }
     const [user, setUser] = useState();
    const [stockErrMsg, setStockErrMsg] = useState("");
    
    return (
        <p>hey</p>
    )
}
