import React, { useState, useEffect } from "react";
import Axios from "axios";
import Product from "./Product";
import SearchBar from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  ListGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

export default function Home(props) {
  const [itemID, setItemID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemList, setItemlist] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [greeting, setGreeting] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [count, setCount] = useState(1);
  const [user, setUser] = useState();
  const [stockErrMsg, setStockErrMsg] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    Axios.get("https://api-noobegg.up.railway.app/api/get").then((response) => {
      setItemlist(response.data);
      setFilteredList(response.data);
    });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setIsAdmin(userInfo.isAdmin);
      setLoginStatus(true);
      setUser(userInfo);
    }
  }, []);

  const Filter = (event) => {
    const targetVal = event.target.value;

    setSearchWord(targetVal);
  };

  const submitItem = () => {
    Axios.post("https://api-noobegg.up.railway.app/api/insert", {
      itemName: itemName,
      itemDescription: itemDescription,
      itemID: itemID,
    });

    setItemlist([
      ...itemList,
      {
        ProductName: itemName,
        itemDescription: itemDescription,
        itemID: itemID,
      },
    ]);
  };

  const deleteReview = (item) => {
    Axios.delete(`https://api-noobegg.up.railway.app/api/delete/${item}`);
  };

  const updateItem = (item) => {
    Axios.put("https://api-noobegg.up.railway.app/api/update", {
      itemName: item,
      itemDescription: newDescription,
    });

    setNewDescription("");
  };

  const sortHighToLow = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return b.ProductPrice - a.ProductPrice;
    });
    setItemlist(sortedProducts);
  };

  const sortLowToHigh = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return a.ProductPrice - b.ProductPrice;
    });
    setItemlist(sortedProducts);
  };

  const sortQuantity = () => {
    const sortedProducts = [...itemList].sort((a, b) => {
      return b.ProductStock - a.ProductStock;
    });
    setItemlist(sortedProducts);
  };

  return (
    <home>
      <SearchBar placeholder="Search items..." />
      <Row>
        <h1>Products</h1>
        <Col>
          <DropdownButton variant="light" title="Sort">
            <Dropdown.Item variant="dark" onClick={() => sortQuantity()}>
              Sort by Availability
            </Dropdown.Item>
            <Dropdown.Item variant="dark" onClick={() => sortHighToLow()}>
              Sort from $$$ to $
            </Dropdown.Item>
            <Dropdown.Item variant="dark" onClick={() => sortLowToHigh()}>
              Sort from $ to $$$
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>

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
            <Product key={product.ProductID} product={product}></Product>;
            return (
              <div className="card">
                <div className="product-info">
                  <div className="imageDiv">
                    <img
                      id="proImg"
                      src={product.ProductImage}
                      className="product-info-proImg"
                    ></img>
                  </div>
                  <button
                    className="productButton align-self-end"
                    onClick={() =>
                      navigate("/productscreen", {
                        state: { id: product.ProductID },
                      })
                    }
                  >
                    <h2>{product.ProductName}</h2>
                  </button>
                  <h4>${product.ProductPrice}</h4>
                </div>
              </div>
            );
          })}
        </div>
        <p>{stockErrMsg}</p>
      </main>
    </home>
  );
}
