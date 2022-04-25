import React, { useState, useEffect } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes, Link, useNavigate } from "react-router-dom";
//import Axios from 'axios';
//import Header from "./components/Header";
import Home from "./components/Home";
import Signup from './pages/Signup';
import Login from './pages/Login';
//import Footer from './components/Footer';
import AddItem from './pages/AddItem';
import ShoppingCart from './pages/ShoppingCart';
import Product from "./components/Product";
//import Upload from "./pages/Upload"
import Dashboard from "./pages/Dashboard";
import SearchBar from "./components/SearchBar"; 
import AdminDashboard from "./pages/AdminDashboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import ProductScreen from "./pages/ProductScreen";
import { Navbar, Container, Dropdown, DropdownButton, Nav, NavDropdown, Card, Form, FormControl } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
const user = <FontAwesomeIcon icon={faUser} />;
const cart = <FontAwesomeIcon icon={faCartShopping} />;


function App() {

  const [token, setToken] = useState();

  let navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    if (localStorage.getItem("userInfo") != null) {
      setLoggedIn(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setIsAdmin(userInfo.isAdmin);
      setGreeting("Hello, " + userInfo.FirstName);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload(false);
  }

  return (
    <div className="App">
      <style type="text/css">
    {`
    .Navbar, .navbar-nav {
      background-color: #ffdef2;
      color: black;
      &:hover {
        color: white;
      }
    }
    `}
  </style>
      <div className="d-flex flex-column site-container">
      <Navbar className="Navbar" variant="light" >
        <Container>
          <Nav.Item>
          <Navbar.Brand href="/"><big>UThriftSA</big></Navbar.Brand>
          </Nav.Item>
          <Navbar.Toggle id="basic-navbar-nav"/>
          {/* <Form className="d-flex">
          {/* <SearchBar placeholder="Search items..." currentList={itemList}/>  */}
          {/* <FormControl type="search" placeholder="Search" className="me-2" aria-label="Search"/>
          </Form> */} 
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          {loggedIn ?
            <div>
              <div>
                {isAdmin ?
                  <div>
                    <Nav>
                    <Nav.Item><p className="text-center mt-2" >{greeting}</p></Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/admindashboard">Admin Dashboard</Nav.Link>
                    {/* <Link to="/upload">Image Upload</Link> */}</Nav.Item>
                    <Nav.Item>
                    <Nav.Link href="/login" onClick={logout}>Log Out</Nav.Link>
                    </Nav.Item>
                    </Nav>
                  </div>
                  :
                  <Nav>
                    <Nav.Item><p className="text-center mt-2" >{greeting}</p></Nav.Item>
                    <Nav.Item>
                      <Nav.Link href="/cart">{cart}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <NavDropdown align="end" title={user} id="basic-nav-dropdown">
                      <NavDropdown.Item href="/dashboard">User Dashboard</NavDropdown.Item>
                      <NavDropdown.Item href="/login" onClick={logout}>Log Out</NavDropdown.Item>
                    </NavDropdown>
                    </Nav.Item>
                  </Nav>
                }
              </div>
            </div>
              :

              <Nav>
                <NavDropdown title={user} id="basic-nav-dropdown">
                    <NavDropdown.Item href="/login">Log in</NavDropdown.Item>
                    <NavDropdown.Item href="/signup">Sign Up </NavDropdown.Item>
                </NavDropdown>
              </Nav>

          } 
        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </div>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/additem" element={<AddItem />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/productscreen" element={<ProductScreen />} />
          {/* <Route path="/upload" element={<Upload />} /> */}
          <Route path="/product" element={<Product />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
        </Routes>
      </Container>
      <Card.Footer className="row center">ALL RIGHTS RESERVED</Card.Footer>
    </div>
  );
}

export default App;