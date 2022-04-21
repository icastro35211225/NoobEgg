import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../App.css';

export default function ProductScreen(props) { 

  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [count, setCount] = useState(1);
  const location = useLocation();
  console.log(location);
  const [user, setUser] = useState();
  const [product, setProduct] = useState(null);


  const getProduct = async (ID) => {
    let tempProd = await Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct', {id: ID});
    //console.log(oUser.data[0]);
    await setProduct(tempProd.data[0]);
}

  useEffect(() => {
    (async () => await getProduct(location.state.id))()
  })


  return (
    <productscreen>
      {product === null ?
        <h1>Loading Product...</h1>
        :
        <h1>Product Name: {product.ProductName}</h1>
      }
    </productscreen>
  )
}
