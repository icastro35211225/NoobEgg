import React, { useState, useEffect } from "react";
import "../App.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "./upload.css";

// var mysql = require('mysql');
// var con = mysql.createConnection({
//     host: "database-2.cfjbivvdnqqy.us-east-1.rds.amazonaws.com",
//     user: "admin",
//     password: "uiMasterPass"
// });

// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected");
// })

export default function AddItem(props) {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const [previewFile, setPreviewFile] = useState("");
  const [message, setMessage] = useState("");

  async function changePrice(price) {
    return price.toFixed(2);
  }

  async function addProduct() {
    console.log(imgPath);
    Axios.post("https://api-noobegg.up.railway.app/api/additem", {
      name: name,
      desc: desc,
      price: price,
      quantity: quantity,
      imgPath: imgPath,
    }).then((response) => {
      //never returs error message for input, only for syntax. This breaks page
      if (response.data.statusText != "OK") {
        setErrMsg(response.data.err);
      }
    });
    navigate("/");
    console.log("DONE");
  }

  return (
    <additem>
      <h2>Add an Item</h2>

      <label for="name">
        <b>Item Name</b>
      </label>
      <input
        type="text"
        placeholder="Name"
        name="name"
        required
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>

      <label for="desc">
        <b>Description</b>
      </label>
      <input
        type="text"
        placeholder="Description"
        name="desc"
        required
        onChange={(e) => {
          setDesc(e.target.value);
        }}
      ></input>

      <label for="price">
        <b>Price</b>
      </label>
      <input
        type="text"
        placeholder="00.00"
        name="price"
        required
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>

      <label for="quantity">
        <b>Item Quantity</b>
      </label>
      <input
        type="text"
        placeholder="Item Quantity"
        name="quantity"
        required
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      ></input>

      <label for="imgPath">
        <b>Image</b>
      </label>
      <input
        type="text"
        placeholder="Product Image URL"
        name="image"
        required
        onChange={(e) => {
          setImgPath(e.target.value);
        }}
      ></input>

      <button onClick={() => addProduct()}>Add Item</button>
      <h3>{errMsg}</h3>
    </additem>
  );
}
