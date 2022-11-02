    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const app = express();
    const mysql = require('mysql');
    const res = require('express/lib/response');
    const { Axios } = require('axios');

    const db = mysql.createPool({
        host: 'database-2.cnlcd2wsscz0.us-east-1.rds.amazonaws.com',
        user: 'admin',
        password: 'swemaster',
        database: 'crud',
    });

    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/', (req, res) => res.send("Your are accessing uthriftsa's server. :)"));

    app.get('/api/get', (req, res) => {

        //EXAMPLE SELECT
        const sqlSelect = "SELECT * FROM Products";
        db.query(sqlSelect, (err, result) => {
            res.send(result);
        });
    })

    app.post('/api/insert', (req, res) => {

        const itemName = req.body.itemName;
        const itemID = req.body.itemID;
        const itemDescription = req.body.itemDescription;
        //const itemImage = req.body.itemImage;
        //const itemStock = req.body.itemStock;
        console.log(itemName);
        //EXAMPLE INSERT
        //const sqlInsert = "INSERT INTO items (ProductPrice, ProductDesc, ProductImage, ProductStock) VALUES (?, ?, ?, ?);";
        //db.query(sqlInsert, [item, itemDescription, itemImage, itemStock], (err, result) => {
        const sqlInsert = "INSERT INTO products (ProductID, ProductDesc, ProductName) values (?, ?, ?)";
        db.query(sqlInsert, [itemID, itemDescription, itemName], (err, res) => {
            if (err) throw err;
            else { console.log(res); }
        });
    });

    app.post('/api/signup', (req, res) => {

        const fName = req.body.fName;
        const lName = req.body.lName;
        const email = req.body.email;
        const password = req.body.password;

        const sqlInsert = "INSERT INTO users (FirstName, LastName, Email, Pass, Username) VALUES (?, ?, ?, ?, ?);";
        db.query(sqlInsert, [fName, lName, email, password, email], (err, result) => {
            if (err) throw err;
            else console.log(result);
        });
    });

    app.delete('/api/delete/:itemName', (req, res) => {
        const name = req.params.itemName;
        const sqlDelete = "DELETE FROM items WHERE ProductName = ?";

        db.query(sqlDelete, name, (err, result) => {
            if (err) console.log(err);
        })
    })

    app.post('/api/login', (req, res) => {
        //res.send({message: "This works"});

        const email = req.body.email;
        const password = req.body.password;

        const sqlSelect = "SELECT * FROM users WHERE Username = ? AND Pass = ?";
        db.query(sqlSelect, [email, password], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                res.send({ message: "Wrong email/password!" });
            }
        });
    });

    app.post('/api/additem', (req, res) => {
        const name = req.body.name;
        const desc = req.body.desc;
        const price = req.body.price;
        const quantity = req.body.quantity;
        const imgPath = req.body.imgPath;

        const sqlInsertItem = "INSERT INTO products (ProductName, ProductDesc, ProductPrice, ProductStock, ProductImage) VALUES (?, ?, ?, ?, ?);";
        db.query(sqlInsertItem, [name, desc, price, quantity, imgPath], (err, result) => {
            if (err) {
                res.send({ err: err });
            }
            if (result.length > 0) {
                res.send(result);
            }
        });
    });

    app.post('/api/cart', (req, res) => {
        const cartItems = req.body.cartItems;
        sqlGet = 'select * from Products where ProductID = ?';
        products = []
        for (i = 0; i < cartItems.lenght; i++) {
            db.query(sqlGet, proID, (err, result) => {
                if (err) {
                    console.log(err);
                }
                if (result.length > 0) {
                    products.push(result);
                    console.log(result);
                }
            })
        }
        res.send(products);
    });

    app.listen(3000, () => {
        console.log("Running on port 3000");
    });