import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios';
import Header from "./components/Header";
//import Input from "./components/Input";
// TEST IVAN
//comment

function App() {

  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemList, setItemlist] = useState([]);
  const [newDescription, setNewDescription] = useState("");

  //ec2-3-93-234-9.compute-1.amazonaws.com
  //localhost

  useEffect(()=> {
    Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
      console.log(response.status)
      setItemlist(response.data);
      //console.log(response.data);
    })
  }, [])

  const submitItem = () => {
    Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
      itemName: itemName, 
      itemDescription: itemDescription
    });

      setItemlist([...itemList, 
        {itemName: itemName, itemDescription: itemDescription},
      ]);
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
    <div className="App">
      <Header></Header>

      <div className="form">
        <label>Item Name</label>
        <input type="text" name="itemName" onChange={(e)=> {
          setItemName(e.target.value)
        }}/>
        <label>Item Description</label>
        <input type="text" name="description" onChange={(e)=> {
          setItemDescription(e.target.value)
        }}/>

        <button onClick={submitItem}>Submit</button>
        {/* <Input></Input> INPUT COMPONENT DOES NOT WORK*/}

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
            <button>Add to Cart</button>
          </div>
          );
        })}
      </div> 
    </div>
  );
}

export default App;