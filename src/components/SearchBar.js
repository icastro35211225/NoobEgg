import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'; 

function SearchBar({placeholder}) { 
    const [itemList, setItemlist] = useState([]);

    useEffect(()=> {
        Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
          setItemlist(response.data);
        }) 
    }, []) 

    return ( 
        <div className="searchbar"> 
            <div className="input">
                <input type="text" placeholder={placeholder} /> 
            </div> 
            <div className="output"></div> 
        </div>
    )
} 

export default SearchBar