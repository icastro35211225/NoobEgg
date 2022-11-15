import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./upload.css"

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

    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imgPath, setImgPath] = useState('');
    const [errMsg, setErrMsg] = useState('');

    const [previewFile, setPreviewFile] = useState('');
    const [message, setMessage] = useState('');
    //const [path, setPath] = useState('');
        
        //FOR TESTING
        // console.log(name);
        // console.log(desc);
        // console.log(price);
        // console.log(quantity);
        // console.log(imgPath);

        //HAVE TO CHECK INPUT HERE BC SQL DEFAUTS WRONG VALUES
        async function addProduct() {
            
            // const image = 'images/null.png';
            // const sqlInsertItem = "INSERT INTO products (ProductName, ProductDesc, ProductPrice, ProductStock, ProductImage) VALUES (?, ?, ?, ?, ?);";
            // con.query(sqlInsertItem, [name, desc, price, quantity, imgPath], (err, result) => {
            //     if (err) throw err;
            //     if (result.length > 0) {
            //         console.log(result);
            //     }
            // });
            
        }
    
    async function show(){
        const file = document.querySelector('input[type=file]').files;
        await setImgPath("http://ec2-52-23-224-166.compute-1.amazonaws.com:8888/" + file[0].name);  
        const url = URL.createObjectURL(new Blob(file));
        setPreviewFile(url);
    }

    async function uploadFiles(){
        const data = new FormData();
        const file = document.querySelector('input[type=file]').files[0];
        data.append("file", file);
        await Axios.post('http://ec2-52-23-224-166.compute-1.amazonaws.com:3001/api/upload', data)
            .then((res) => {
                if(res.statusText == "OK"){
                    setMessage("Yay! Image Uploaded!");
                    //console.log("mssg: " + message);
                } else if (res.status == 500) {
                setMessage("OOF! Something went wrong");
                return res;
                }
                setImgPath("http://ec2-52-23-224-166.compute-1.amazonaws.com:8888/" + file.name);
                document.getElementById('message').hidden = false;
                console.log(res);
            });
        }

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

            <label for="quantity"><b>Item Quantity</b></label>
            <input type="text" placeholder="Item Quantity" name="quantity" required onChange={(e)=> {
                setQuantity(e.target.value)
            }}></input>

            <label for="imgPath"><b>Image</b></label>
            {/* <input type="text" placeholder="Image Path" name="imgPath" required onChange={(e)=> {
                setImgPath(e.target.value)
            }}></input> */}
            <div>
                <input name="files" type="file" onChange={show}/>
                        <p></p>
                        <div>
                            <img id="preview" src={previewFile}></img>
                            <p id="message" hidden>{message}</p>
                        </div>
            </div>
            <button onClick={() => addProduct()}>Add Item</button>
            <h3>{errMsg}</h3>

        </additem>
    )
}