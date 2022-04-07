import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function Home(props) {

  async function addToCart(proID) {
    let cartIDs = [];
    if (localStorage.getItem("cartIDs")) {
      cartIDs = JSON.parse(localStorage.getItem("cartIDs"));
    }
    var index = cartIDs.findIndex(id => id.ProductID === proID);
    if(index != -1){
      const qty = cartIDs[index]["QTY"];
      cartIDs[index].QTY = qty + 1;
      localStorage.setItem("cartIDs", JSON.stringify(cartIDs));
    } else{
      cartIDs.push({ "ProductID": proID, "QTY": 1});
      localStorage.setItem("cartIDs", JSON.stringify(cartIDs));
    }
    console.log(cartIDs);
  }

  async function emptyCart(){
    localStorage.removeItem("cartIDs");
  }

    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemList, setItemlist] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [greeting, setGreeting] = useState('');
    const [isAdmin, setIsAdmin] = useState('');

    useEffect(()=> {
        Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
          setItemlist(response.data);
          //console.log(response.data);
        })
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
          setGreeting("Hello, " + userInfo.fName);
          setIsAdmin(userInfo.isAdmin);
        }
      }, [])

    const submitItem = () => {
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
          itemName: itemName, 
          itemDescription: itemDescription,
          itemID: itemID
        });
    
          setItemlist([...itemList, 
            {itemName: itemName, itemDescription: itemDescription, itemID: itemID},
          ])
      };

      const deleteReview = (item) => {
        Axios.delete(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/delete/${item}`);
    
        // setItemlist([...itemList, 
        //   {itemName: itemName, itemDescription: itemDescription},
        // ]); TRYING TO UPDATE THE LIST WITHOUT HAVING TO REFRESH PAGE
        
      }
    
      const updateItem = (item) => {
        Axios.put("http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/update", {
          itemName: item, 
          itemDescription: newDescription
        });
        
        setNewDescription("");
    
      }

    return (
        <home>
          <h1>{greeting}</h1>
            <label>Item ID</label>
            <input type="text" name="itemID" onChange={(e)=> {
              setItemID(e.target.value)
            }}></input>
            <label>Item Name</label>
        <input type="text" name="itemName" onChange={(e)=> {
          setItemName(e.target.value)
        }}/>
        <label>Item Description</label>
        <input type="text" name="description" onChange={(e)=> {
          setItemDescription(e.target.value)
        }}/>

        <button onClick={submitItem}>Submit</button>
        

        {itemList.map((val)=> {
          return (
          <div className="card">
            <h1>{val.itemName}</h1>
            <p>{val.itemDescription}</p>

            <button onClick={()=> {deleteReview(val.itemName)}}>Delete</button>
            <input type="text" id="updateInput" onChange={(e)=> {
              setNewDescription(e.target.value)
            }}></input>
            <button onClick={()=> {updateItem(val.itemName)}}>Update</button>
            <button onClick={() => {addToCart(val.itemID)}}>Add to Cart</button>
          </div>
          );
        })}
        <div>
          <button onClick={()=> emptyCart()}>Empty Cart</button>
        </div>
        </home>
    )
}