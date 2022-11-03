import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'; 
import { Card, Col } from "react-bootstrap";

function SearchBar({placeholder}) { 

    let navigate = useNavigate();
    const [allItems, setAllItems] = useState([]);
    const [filteredList, setFilteredList] = useState([]); 

    useEffect(()=> {
        Axios.get('http://ec2-54-159-102-47.compute-1.amazonaws.com:3001/api/get').then((response)=> {
          setAllItems(response.data);
        }) 
    }, []) 

    const Filter = (event) => { 
        const searchWord = event.target.value; 
        // const filteredList = []; 

        if (searchWord === "") { 
            setFilteredList([]); 
            // filteredList = allItems; 
        } 
        else { 
            const filterNew = allItems.filter((product) => { 
                return product.ProductName.toUpperCase().includes(searchWord.toUpperCase()); 
            }); 

            setFilteredList(filterNew); 

            /* filteredList = allItems.filter((product) => { 
                return product.ProductName.toUpperCase().includes(searchWord.toUpperCase()); 
            }) */
        } 

        // NOTE: this probably doesn't even work anyway, need to use set function
        // currentList = filteredList; 
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
                            <Card className="product" target="_blank"> 
                                <Col><button className="productButton" onClick={() => navigate("/productscreen", { state: { id: product.ProductID } })}><h5>{product.ProductName}</h5></button></Col> 
                            </Card> 
                        ); 
                    })}
                </div> 
            )}
        </div> 
    )
} 

export default SearchBar