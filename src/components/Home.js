import React, { useState, useEffect } from "react";
import Axios from 'axios';
import Product from "./Product";

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
    const [loginStatus, setLoginStatus] = useState('');
    const [count, setCount] = useState(1);
    const [user, setUser] = useState();
    const [stockErrMsg, setStockErrMsg] = useState("");


    useEffect(()=> {
        Axios.get('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/get').then((response)=> {
          setItemlist(response.data);
          //console.log(itemList);
        })
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
          setGreeting("Hello, " + userInfo.fName);
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
            {itemName: itemName, itemDescription: itemDescription, itemID: itemID},
          ])
          //window.location.reload(false);
      };

      const addToCart = (id) => {
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct',
            {id: id}
          ).then((response)=> {
          console.log(user.id);
          console.log(response.data[0].productID);
          console.log(response.data[0].name);
          console.log(response.data[0].price);
          console.log(response.data[0].imgPath);
          console.log(count);
          if(count > response.data[0].quantity){
            setStockErrMsg("Sorry, we dont have that many " + response.data[0].name + "(s) available.");
          } else { 

            Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/addToCart',
                {
                  userID: user.id,
                  productID: response.data[0].productID,
                  productName: response.data[0].name,
                  productPrice: response.data[0].price,
                  productImage: response.data[0].imgPath,
                  amount: count
                }
            )

            setStockErrMsg("Added " + response.data[0].name + " to cart!"); 
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

          <label>Item Name</label>

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

        
          <div>
          {itemList.map((product)=> {
            //<Product key={product.productID} product={product} />
            // })
            return(
          <div className="card">
          <h1>{product.name}</h1>
          <p>{product.desc}</p>
          <p>${product.price}</p>
          <p>Stock: {product.quantity}</p>


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

          {/* <button onClick={()=> {deleteReview(val.name)}}>Delete</button>
          <input type="text" id="updateInput" onChange={(e)=> {
            setNewDescription(e.target.value)
          }}></input>
          <button onClick={()=> {updateItem(val.desc)}}>Update</button> */}
          { loginStatus ? 
            <div>
              <p>Amount: {count}</p>
              <button onClick={handleSubOne}>-1</button>
              <button onClick={handleAddOne}>+1</button>
              <button onClick={function(){addToCart(product.productID);}}>Add To Cart</button> 
            </div>
            : null 
          }
          <p>{stockErrMsg}</p>
          </div>
        </home>
    )
}//onClick={addToCart(product.id)}