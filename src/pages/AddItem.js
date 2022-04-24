import React, { useState, useEffect } from "react";
import '../App.css';
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./upload.css"


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
            Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/additem', {
                name: name,
                desc: desc, 
                price: price,
                quantity: quantity,
                imgPath: imgPath
                }).then((response) => {
                    //never returs error message for input, only for syntax. This breaks page 
                    // if(response.data.statusText != "OK"){
                    //     setErrMsg(response.data.err);
                    // }
                });
                //navigate('/');    
                console.log("DONE");            
        }
    
    async function show(){
        const file = document.querySelector('input[type=file]').files;  
        const url = URL.createObjectURL(new Blob(file));
        setPreviewFile(url);
    }

    async function uploadFiles(){
        const data = new FormData();
        const file = document.querySelector('input[type=file]').files[0];
        data.append("file", file);
        await Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/upload', data)
            .then((res) => {
                if(res.statusText == "OK"){
                    setMessage("Yay! Image Uploaded!");
                    //console.log("mssg: " + message);
                } else if (res.status == 500) {
                setMessage("OOF! Something went wrong");
                return res;
                }
                setImgPath("http://ec2-3-93-234-9.compute-1.amazonaws.com:8888/" + file.name);
                document.getElementById('message').hidden = false;
                console.log(res);
            });
    }
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

            <label for="quantity"><b>Item Quanity</b></label>
            <input type="text" placeholder="Item Quantity" name="quantity" required onChange={(e)=> {
                setQuantity(e.target.value)
            }}></input>

            <label for="imgPath"><b>Image</b></label>
            {/* <input type="text" placeholder="Image Path" name="imgPath" required onChange={(e)=> {
                setImgPath(e.target.value)
            }}></input> */}
            <div>
                <input name="files" type="file" onChange={show}/>
                        <button type="submit" onClick={() => uploadFiles()}>Upload</button>
                        <p>Make sure to upload image first before adding item. (someone PLZ center this or some message like this) Also that the file should be less than equal to 100KB</p>
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