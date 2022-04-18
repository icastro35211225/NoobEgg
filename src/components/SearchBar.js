import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'; 

function SearchBar({placeholder}) { 
    const [itemList, setItemlist] = useState([]);
    const [filteredList, setFilteredList] = useState([]); 

    useEffect(()=> {
        Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
          setItemlist(response.data);
        }) 
    }, []) 

    const Filter = (event) => { 
        const targetVal = event.target.value; 

        if (targetVal === "") { 
            setFilteredList([]); 
        } 
        else { 
            const filterNew = itemList.filter((product) => { 
                return product.ProductName.toUpperCase().includes(targetVal.toUpperCase()); 
            }); 

            setFilteredList(filterNew); 
        } 
    }; 

    return ( 
        <div className="searchbar"> 
            <div className="input">
                <input type="text" placeholder={placeholder} onChange={Filter} /> 
            </div> 
            {filteredList.length > 0 && ( 
                <div className="output">
                    {filteredList.slice(0, 10).map((product) => { 
                        return ( 
                            <a className="product" target="_blank"> 
                                <p>{product.ProductName}</p> 
                            </a> 
                        ); 
                    })}
                </div> 
            )} 
        </div>
    )
} 

export default SearchBar