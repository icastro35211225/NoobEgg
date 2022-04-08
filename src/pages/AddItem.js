import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function AddItem(props) {
 
    let navigate = useNavigate();

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const addProduct = () => {
        
        //FOR TESTING
        // console.log(name);
        // console.log(desc);
        // console.log(price);
        // console.log(quantity);
        // console.log(imgPath);

        //HAVE TO CHECK INPUT HERE BC SQL DEFAUTS WRONG VALUES

        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/additem', {
          name: name,
          desc: desc,
          price: price,
          quantity: quantity,
          imgPath: imgPath
        }).then((response) => {
            //never returs error message for input, only for syntax. This breaks page 
            // if(response.data.err){
            //     setErrMsg(response.data.err);
            // }
        });

        //navigate('/');
    };
    
    return (
        <additem>
            <h2>Add an Item</h2>

            <label for="name"><b>Item Name</b></label>
            <input type="text" placeholder="Name" name="name" required onChange={(e)=> {
                setName(e.target.value)
            }}></input>

            <label for="desc"><b>Description</b></label>
            <input type="text" placeholder="Description" name="desc" required onChange={(e)=> {
                setDesc(e.target.value)
            }}></input>

            <label for="price"><b>Price</b></label>
            <input type="text" placeholder="00.00" name="price" required onChange={(e)=> {
                setPrice(e.target.value)
            }}></input>

            <label for="quantity"><b>Item Quanity</b></label>
            <input type="text" placeholder="Item Quantity" name="quantity" required onChange={(e)=> {
                setQuantity(e.target.value)
            }}></input>

            <label for="imgPath"><b>Image Path</b></label>
            <input type="text" placeholder="Image Path" name="imgPath" required onChange={(e)=> {
                setImgPath(e.target.value)
            }}></input>

            <button onClick={addProduct}>Add Item</button>
            <h3>{errMsg}</h3>

        </additem>
    )
}