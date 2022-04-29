import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import '../App.css';
import { Badge, Button, Card, Col, ListGroup, Row, ButtonGroup, InputGroup, ToastContainer, Toast } from "react-bootstrap";
import { Helmet } from "react-helmet-async";


export default function ProductScreen(props) {

    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [count, setCount] = useState(1);
    const location = useLocation();
    //console.log(location);
    const [user, setUser] = useState(null);
    const [product, setProduct] = useState(null);
    const [stockErrMsg, setStockErrMsg] = useState("");
    const [successShow, setSuccessShow] = useState(false);
    const [errShow, setErrShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
    //Editing product
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [editingProduct, setEditingProduct] = useState(false);


    const getUser = async () => {
        const userInfo = JSON.parse(await localStorage.getItem("userInfo"));
        if (userInfo) {
            setIsAdmin(userInfo.isAdmin);
            setUser(userInfo);
            setLoginStatus(true);
        }
    }

    const getProduct = async (ID) => {
        let tempProd = await Axios.post('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/getProduct', { id: ID });
        //console.log(oUser.data[0]);
        setProduct(tempProd.data[0]);
        setName(tempProd.data[0].ProductName);
        setDesc(tempProd.data[0].ProductDesc);
        setPrice(tempProd.data[0].ProductPrice);
        setQuantity(tempProd.data[0].ProductStock);
    }

    const updateProduct = async () => {
        let response = await Axios.put('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/updateProduct',
            {
                id: product.ProductID,
                name: name,
                desc: desc,
                price: price,
                stock: quantity
            });
        getProduct(location.state.id)
    }

    const deleteProduct = async () => {
        let response = await Axios.delete(`http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/deleteProduct/${product.ProductID}`);
    }

    const deleteInstanceCart = async () => {
        let res = await Axios.delete(`http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/delinstscart/${product.ProductID}`)
    }

    useEffect(() => {
        getUser();
        (async () => await getProduct(location.state.id))();
    }, [])

    const postProd = async () => {
        let res = await Axios.post('http://ec2-3-82-174-68.compute-1.amazonaws.com:3000/api/addToCart',
            {
                userID: user.UserID,
                productID: product.ProductID,
                productName: product.ProductName,
                productPrice: product.ProductPrice,
                productImage: product.ProductImage,
                amount: count
            }
        );
        console.log(res);
    }

    const addToCart = () => {
        if (count > product.ProductStock) {
            setStockErrMsg("Sorry, we dont have that many " + product.ProductName + "(s) available.");
            setErrShow(true);
        } else {
            postProd();
            setStockErrMsg("Added " + product.ProductName + " to cart!");
            setSuccessShow(true);
        }
    }

    const clickedApply = () => {
        (async () => await updateProduct())();
        setEditingProduct(false);
    }

    const clickedDelete = () => {
        let answer = window.confirm("Are you sure you want to delete this item?")
        console.log(answer)
        if (answer) {
            (async () => await deleteInstanceCart())();
            (async () => await deleteProduct())();
            // delete all instances of product
            navigate("/");
        }
        else {
        }
    }

    const handleSubOne = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleAddOne = () => {
        setCount(count + 1);
    };

    return (
        <productscreen>
            <ToastContainer className="p-3" position={'top-end'} >
                <Toast show={errShow} onClose={() => setErrShow(false)} bg={'danger'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Error: Not enough stock</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{stockErrMsg}</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position={'top-end'} >
                <Toast show={successShow} onClose={() => setSuccessShow(false)} bg={'success'} delay={5000} autohide>
                    <Toast.Header >
                        <strong className="me-auto">Success!</strong>
                    </Toast.Header>
                    <Toast.Body className="text-white">{stockErrMsg}</Toast.Body>
                </Toast>
            </ToastContainer>
            {!editingProduct ?
                <div>
                    {/* <h1>Product Name: {product.ProductName}</h1> */}
                    {product === null ?
                        <h1>Loading Product...</h1>
                        :
                        <div>
                            <Row>
                                <Col md={4}><img className="img-large"
                                    src={product.ProductImage}></img></Col>
                                <Col md={3}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <Helmet>
                                                <title>{product.ProductName}</title>
                                            </Helmet>
                                            <h1>{product.ProductName}</h1>
                                        </ListGroup.Item>
                                        <ListGroup.Item>Price: ${product.ProductPrice}</ListGroup.Item>
                                        <ListGroup.Item>
                                            Description:
                                            <p>{product.ProductDesc}</p>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col md={4}>
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
                                                                <Badge bg="danger">Currently Out of Stock</Badge>
                                                            )}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                                {loginStatus ?
                                                    <div>
                                                        {product.ProductStock > 0 ?
                                                            <div>
                                                                {isAdmin ?
                                                                    null
                                                                    :
                                                                    <ListGroup.Item>
                                                                        <Row>
                                                                            <Col>Quantity:</Col>
                                                                            <Col>
                                                                                <ButtonGroup aria-label="Basic example">
                                                                                    <Button variant="secondary" onClick={() => { handleSubOne() }}>-</Button>
                                                                                    <InputGroup>
                                                                                        <InputGroup.Text id="btnGroupAddon">{count}</InputGroup.Text>
                                                                                    </InputGroup>
                                                                                    <Button variant="secondary" onClick={() => { handleAddOne() }}>+</Button>
                                                                                </ButtonGroup>
                                                                            </Col>
                                                                        </Row>
                                                                    </ListGroup.Item>
                                                                }
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </div>
                                                    :
                                                    null
                                                }
                                                {product.ProductStock > 0 && (
                                                    <ListGroup.Item>
                                                        <div className="d-grid" ref={ref}>
                                                            {loginStatus ?
                                                                <div>
                                                                    {isAdmin ?
                                                                        <Button size="sm" onClick={() => { setEditingProduct(true) }}>Edit Product</Button>
                                                                        :
                                                                        <Button variant="primary" onClick={() => { addToCart() }}>Add to Cart</Button>
                                                                    }
                                                                </div>
                                                                :
                                                                <Button variant="primary" onClick={() => { addToCart() }} disabled>
                                                                    Log In to Add to Cart
                                                                </Button>
                                                            }
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
                </div>
                :
                <div>
                    <h2>Edit "{product.ProductName}"</h2>

                    <label for="name"><b>Item Name</b></label>
                    <input type="text" placeholder="Name" name="name" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}></input>

                    <label for="desc"><b>Description</b></label>
                    <input type="text" placeholder="Description" name="desc" value={desc} onChange={(e) => {
                        setDesc(e.target.value)
                    }}></input>

                    <label for="price"><b>Price</b></label>
                    <input type="text" placeholder="00.00" name="price" value={price} onChange={(e) => {
                        setPrice(e.target.value)
                    }}></input>

                    <label for="quantity"><b>Item Quanity</b></label>
                    <input type="text" placeholder="Item Quantity" name="quantity" value={quantity} onChange={(e) => {
                        setQuantity(e.target.value)
                    }}></input>

                    <Button onClick={() => { clickedDelete() }} variant="danger">Delete Product</Button>
                    <Button onClick={() => { setEditingProduct(false) }}>Cancel</Button>
                    <Button onClick={() => { clickedApply() }}>Apply Changes</Button>
                </div>
            }
        </productscreen>
    )
}
