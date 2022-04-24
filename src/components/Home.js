import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Product from "./Product";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Button } from "react-bootstrap";

export default function Home(props) {
  const [itemID, setItemID] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemList, setItemlist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [newDescription, setNewDescription] = useState('');
  const [greeting, setGreeting] = useState('');
  const [isAdmin, setIsAdmin] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [count, setCount] = useState(1);
  const [user, setUser] = useState();
  const [stockErrMsg, setStockErrMsg] = useState("");
  let navigate = useNavigate();


  useEffect(() => {
    Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response) => {
      setItemlist(response.data);
      setFilteredList(response.data);
      //console.log(itemList);
    })
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setGreeting("Hello, " + userInfo.FirstName);
      setIsAdmin(userInfo.isAdmin);
      setLoginStatus(true);
      setUser(userInfo);
    }
  }, [])

      const Filter = (event) => { 
      const targetVal = event.target.value; 

      setSearchWord(targetVal); 
  
      /* if (targetVal === "") { 
        setFilteredList(itemList); 
      } 
  
      else { 
        const filterNew = itemList.filter((product) => { 
          return product.ProductName.toUpperCase().includes(targetVal.toUpperCase()); 
        }); 
  
        setFilteredList(filterNew); 
      } */ 
    }; 

  const submitItem = () => {
    Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
      itemName: itemName,
      itemDescription: itemDescription,
      itemID: itemID

    });

    setItemlist([...itemList,
    { ProductName: itemName, itemDescription: itemDescription, itemID: itemID },
    ])
    //window.location.reload(false);
  };

  const deleteReview = (item) => {
    Axios.delete(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/delete/${item}`);
  }

  const updateItem = (item) => {
    Axios.put("http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/update", {
      itemName: item,
      itemDescription: newDescription
    });

    setNewDescription("");
  }

  const sortHighToLow = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return b.ProductPrice - a.ProductPrice
    })
    setItemlist(sortedProducts);
  }

  const sortLowToHigh = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return a.ProductPrice - b.ProductPrice
    })
    setItemlist(sortedProducts);
  }

  const sortQuantity = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return b.ProductStock - a.ProductStock
    })
    setItemlist(sortedProducts);
  }

  return (
    <home>
      {/* <SearchBar placeholder="Search items..." />  */}
      <div className="searchbar">
        <input type="text" placeholder="Search items..." onChange={Filter} />
      </div>
      <h1>Products</h1>
      <h2>{greeting}</h2>
      <Row>
      <Col><Button variant="dark" onClick={() => sortQuantity()}>Sort by Availability</Button></Col>
      <Col><Button variant="dark" onClick={() => sortHighToLow()}>Sort $$$</Button></Col>
      <Col><Button variant="dark" onClick={() => sortLowToHigh()}>Sort $</Button></Col>
      </Row>
      {/* <label>Item Name</label>

          <input type="text" name="itemName" onChange={(e)=> {
            setItemName(e.target.value)
          }}/>
          <label>Item Description</label>
          <input type="text" name="description" onChange={(e)=> {
            setItemDescription(e.target.value)
          }}/>



          <button onClick={submitItem}>Submit</button>

          <button onClick={submitItem}>Submit</button> */}


      <main>
        <div className="products">
          {/* {itemList.filter((product) => {
          if (searchWord == "") {
            return product
          } else if (product.ProductName.toUpperCase().includes(searchWord.toUpperCase())) {
            return product
          }
        }.map((product) => { */}
          {itemList.map((product) => {
            <Product key={product.ProductID} product={product}></Product>
            return (
              <div className="card">
                <div className="product-info">
                  <img id="proImg" src={product.ProductImage}></img>
                  <button className="productButton" onClick={() => navigate("/productscreen", { state: { id: product.ProductID } })}><h1>{product.ProductName}</h1></button>
                  {/* <Link to={`/product/${product._id}`}>
                      <img src={product.image} alt={product.name} />
                      <h1>{product.ProductName}</h1>
                    </Link> */}
                  <p>{product.ProductDesc}</p>
                  <p><strong>${product.ProductPrice}</strong> </p>
                  <p>Stock: {product.ProductStock}</p>
                  {/* <button onClick={()=> {deleteReview(product.ProductName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e)=> {
                setNewDescription(e.target.value)
              }}></input>
              <button onClick={()=> {updateItem(product.ProductName)}}>Update</button> */}
                </div>
              </div>
            );

          })}
        </div>

        {/* <button onClick={()=> {deleteReview(val.name)}}>Delete</button>
          <input type="text" id="updateInput" onChange={(e)=> {
            setNewDescription(e.target.value)
          }}></input>
          <button onClick={()=> {updateItem(val.desc)}}>Update</button> */}
        <p>{stockErrMsg}</p>

      </main>

      {/* <div className="upload test">
            
          </div> */}
    </home>
  )
}

