import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../App.css';
import { Card } from "react-bootstrap";

export default function Product(props) {

  const productID = props.productID;
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const [user, setUser] = useState();
  const [product, setProduct] = useState(null);


  const getProduct = async (ID) => {
    let tempProd = await Axios.post('https://api-noobegg.up.railway.app/api/getProduct', { id: ID });
    //console.log(oUser.data[0]);
    await setProduct(tempProd.data[0]);
  }

  useEffect(() => {
    (async () => await getProduct(location.state.id))()
  })


  return (
    <product>
      <Card>
        <Link to={`/product/${product.productID}`}>
          {/* img */}
        </Link>
        <Card.Body>
          <Link to={`/product/${product.productID}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </product>
  )
}
