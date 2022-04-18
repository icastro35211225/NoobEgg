import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'; 

function SearchBar({placeholder, data}) { 
    return ( 
        <div className="searchbar"> 
            <div className="input">
                <input type="text" /> 
            </div> 
            <div className="output"></div> 
        </div>
    )
} 

export default SearchBar