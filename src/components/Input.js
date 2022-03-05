import React, { useState, useEffect } from "react";
import Axios from 'axios';

export default function Input(props) {

    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemList, setItemlist] = useState([]);

    useEffect(()=> {
        Axios.get('http://localhost:3001/api/get').then((response)=> {
          setItemlist(response.data);
          //console.log(response.data);
        })
      }, [])

    const submitItem = () => {
        Axios.post('http://localhost:3001/api/insert', {
          itemName: itemName, 
          itemDescription: itemDescription
        });
    
          setItemlist([...itemList, 
            {itemName: itemName, itemDescription: itemDescription},
          ])
      };

    return (
        <input>
            <label>Item Name</label>
            <input type="text" name="itemName" onChange={(e)=> {
                setItemName(e.target.value)
            }}/>
            <label>Item Description</label>
            <input type="text" name="description" onChange={(e)=> {
                setItemDescription(e.target.value)
            }}/>

            <button onClick={submitItem}>Submit</button>
        </input>
    )
}