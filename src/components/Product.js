import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css';

export default function Product(props) {

    const product = product.find((x) => {
        return x._id === props.match.params.id;
    }); 
    const navigate = useNavigate();

    //const {product} = props; 
    
    return (
        //productid 
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
            <div>
        <Link to="/">Back to results</Link>
        <div className='row top'>
            <div className='col-1'>
                <ul>
                    <li>
                    <h1>{product.name}</h1>
                    </li>
                    <li>Price: ${product.price}</li>
                    <li> Description: 
                        <p>{product.description}</p>
                    </li>
                </ul>
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                            <div className='row'>
                                <div>Price: </div>
                                <div className='price'>${product.price}</div>
                            </div>
                        </li>
                        <li>
                            <div className='row'>
                                <div>Status: </div>
                                <div> 
                                    {product.countInStock>0? <span className='success'>In Stock</span>:
                                    <span className='error'>Unavailable</span>}
                                </div>
                            </div>
                        </li>
                        <li>
                          <button className='primary block'>Add to Cart</button>  
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    );
}