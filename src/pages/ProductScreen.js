import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../App.css';
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";


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
        let tempProd = await Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/getProduct', { id: ID });
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
        <div>
          {/* <h1>Product Name: {product.ProductName}</h1> */}
          <Row>
            <Col md={6}>{product.ProductImage}</Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{product.ProductName}</h1>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.ProductPrice}</ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>{product.ProductDesc}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>${product.ProductPrice}</Col>
                    </Row>
                    </ListGroup.Item>
                    
                    <ListGroup.Item>
                    <Row>
                        <Col md={6}><img className="img-large"
                            src="https://i.pinimg.com/originals/c4/96/9a/c4969aaedbc096c09b35e31abd11e2ec.png"></img></Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1>{product.ProductName}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>Price: ${product.ProductPrice}</ListGroup.Item>
                                <ListGroup.Item>
                                    Description:
                                    <p>{product.ProductDesc}</p>
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <Card.Body>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>${product.ProductPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>
                                                    {product.ProductStock > 0 ? (
                                                        <Badge bg="success">In Stock</Badge>
                                                    ) : (
                                                        <Badge bg="danger">Out of Stock</Badge>
                                                    )}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                        {product.ProductStock > 0 && (
                                            <ListGroup.Item>
                                                <div className="d-grid">
                                                    <Button variant="primary">
                                                        Add to Cart
                                                    </Button>
                                                </div>

                                            </ListGroup.Item>
                                        )}


                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>

            }
        </productscreen>
    )
}
