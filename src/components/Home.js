import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Product from "./Product";
import SearchBar from "./SearchBar"; 
import { Link, useNavigate } from "react-router-dom";

export default function Home(props) {
    const [itemID, setItemID] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [itemList, setItemlist] = useState([]);
    const [newDescription, setNewDescription] = useState('');
    const [greeting, setGreeting] = useState('');
    const [isAdmin, setIsAdmin] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [count, setCount] = useState(1);
    const [user, setUser] = useState();
    const [stockErrMsg, setStockErrMsg] = useState("");
    let navigate = useNavigate();


    useEffect(()=> {
        Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
          setItemlist(response.data);
          //console.log(itemList);
        })
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
          setGreeting("Hello, " + userInfo.FirstName);
          setIsAdmin(userInfo.isAdmin);
          setLoginStatus(true);
          setUser(userInfo);
        }  
      }, [])

    const submitItem = () => {
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
          itemName: itemName, 
          itemDescription: itemDescription,
          itemID: itemID

        });
    
          setItemlist([...itemList, 
            {ProductName: itemName, itemDescription: itemDescription, itemID: itemID},
          ])
          //window.location.reload(false);
      };

      const addToCart = (id) => {
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct',
            {id: id}
          ).then((response)=> {
          // console.log(user.id);
          // console.log(response);
          // console.log(response.data[0].ProductID);
          // console.log(response.data[0].ProductName);
          // console.log(response.data[0].ProductPrice);
          // console.log(response.data[0].ProductImage);
          // console.log(count);
          if(count > response.data[0].qty){
            setStockErrMsg("Sorry, we dont have that many " + response.data[0].ProductName + "(s) available.");
          } else { 

            Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/addToCart',
                {
                  userID: user.UserID,
                  productID: response.data[0].ProductID,
                  productName: response.data[0].ProductName,
                  productPrice: response.data[0].ProductPrice,
                  productImage: response.data[0].ProductImage,
                  amount: count
                }
            )
            setStockErrMsg("Added \"" + response.data[0].ProductName + "\" to cart!"); 
          }
          
        })

        // Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/insert', {
        //   itemName: itemName,
        //   itemDescription: itemDescription
        // });
      }

      const deleteReview = (item) => {
        Axios.delete(`http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/delete/${item}`);

        //window.location.reload(false);
        
      }
    
      const updateItem = (item) => {
        Axios.put("http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/update", {
          itemName: item, 
          itemDescription: newDescription
        });
        
        setNewDescription("");
    
      }

      //ALL NUMS ARE CHANGED BC I ONLY HAVE ONE COUNT AT THE TOP OF THIS CODE
      //THIS WONT BE AN ISSUE WHEN WE HAVE A PRODUCT PAGE SINCE THERE WILL ONLY BE ONE PRODUCT
      //SAME WITH ERROR MESSAGE
      const handleSubOne = () => {
        if(count > 1){
          setCount(count - 1);
        }
      };
    
      const handleAddOne = () => {
        setCount(count + 1);
      };

    return (
        <home>
          <SearchBar placeholder="Search items..." /> 
          <h1>Products</h1>
          <h2>{greeting}</h2>
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
            {itemList.map((product)=> {
              <Product key={product.ProductID}product={product}></Product>
              return(
                <div className="card">
                  <div className="product-info">  
                    <Link to={`/product/${product._id}`}>
                      {/* <img src={product.image} alt={product.name} /> */}
                      <h1>{product.ProductName}</h1>
                    </Link>
                    <img id="proImg" src={product.ProductImage}></img>
                    <p>{product.ProductDesc}</p>
                    <p><strong>${product.ProductPrice}</strong> </p>
                    <p>Stock: {product.ProductStock}</p>
              {/* <button onClick={()=> {deleteReview(product.ProductName)}}>Delete</button>
              <input type="text" id="updateInput" onChange={(e)=> {
                setNewDescription(e.target.value)
              }}></input>
              <button onClick={()=> {updateItem(product.ProductName)}}>Update</button> */}
                  </div>
                { loginStatus ? 
              <div>
                <p>Amount: {count}</p>
                <button onClick={handleSubOne}>-1</button>
                <button onClick={handleAddOne}>+1</button>
                <button onClick={function(){addToCart(product.ProductID);}}>Add To Cart</button> 
              </div>
                : null 
                }
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
}//onClick={addToCart(product.id)}