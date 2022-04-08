import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

export default function Product(props) {

    const navigate = useNavigate();

    const {product} = props; 

    return (
            // <div key={product.productID} className="card">
            //   <h1>{product.name}</h1>
            //   <p>{product.desc}</p>
            //   <p>{product.price}</p>
            //   <p>Stock: {product.quantity}</p>

            //   {/* <button onClick={()=> {deleteReview(val.name)}}>Delete</button>
            //   <input type="text" id="updateInput" onChange={(e)=> {
            //     setNewDescription(e.target.value)
            //   }}></input>
            //   <button onClick={()=> {updateItem(val.desc)}}>Update</button> */}
            //   <button>Go to Page</button>
            // </div>
            <h1>{product.name}</h1>
    );
}