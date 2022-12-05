# NoobEgg Ecommerce Site
Site was repopused from another group project linked [here](https://github.com/jvliov/SWE-Project-Client). This group project focused mainly on the UI, so it is not all functional. The ecommerce site allowed users to create accounts, sign in, view items, add items to their cart, delete items from cart, and chckout. The actual functionality of checking out is not made, since this was a school project for educational purposes. Functionality for admins were added as well, allowing for creation, deletion, and modifying of products, viewing of all orders, etc.
## Notes
The backend API was and Database schemas were not saved, so they had to be made from scratch.

#  Homepage
![homepage](https://iili.io/HCvh16J.md.png)

# Log In Page
![login page](https://iili.io/HCvhLMu.md.png)

# Account Dashboard
![account dashboard](https://iili.io/HCvjKKJ.md.png)

# Database
We vhose a MySQL database that was hosted on AWS RDS. We had 5 tables: Users, Products, Orders, Codes, and Cart.
## Users
+-------------+--------------+------+-----+---------+----------------+
| Field       | Type         | Null | Key | Default | Extra          |
+-------------+--------------+------+-----+---------+----------------+
| UserID      | int          | NO   | PRI | NULL    | auto_increment |
| FirstName   | varchar(32)  | YES  |     | NULL    |                |
| LastName    | varchar(32)  | YES  |     | NULL    |                |
| Email       | varchar(128) | YES  |     | NULL    |                |
| Pass        | varchar(32)  | YES  |     | NULL    |                |
| shipAddress | varchar(128) | YES  | MUL | NULL    |                |
| isAdmin     | tinyint(1)   | YES  |     | 0       |                |
| Username    | varchar(32)  | YES  |     | NULL    |                |
+-------------+--------------+------+-----+---------+----------------+
## Products
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| ProductID    | int          | NO   | PRI | NULL    | auto_increment |
| ProductName  | varchar(64)  | YES  | MUL | NULL    |                |
| ProductDesc  | varchar(128) | YES  |     | NULL    |                |
| ProductPrice | float        | YES  | MUL | NULL    |                |
| ProductStock | int          | YES  |     | NULL    |                |
| ProductImage | varchar(128) | YES  | MUL | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
## Orders
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| OrderID     | int          | NO   | PRI | NULL              | auto_increment                                |
| OrderUserID | int          | YES  | MUL | NULL              |                                               |
| shipAddress | varchar(128) | YES  | MUL | NULL              |                                               |
| Products    | varchar(256) | YES  |     | NULL              |                                               |
| subtotal    | float        | YES  |     | NULL              |                                               |
| tax         | float        | YES  |     | NULL              |                                               |
| OrderTotal  | float        | YES  |     | NULL              |                                               |
| OrderDate   | timestamp    | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
## Discount Codes
+--------+-------------+------+-----+---------+----------------+
| Field  | Type        | Null | Key | Default | Extra          |
+--------+-------------+------+-----+---------+----------------+
| codeID | int         | NO   | PRI | NULL    | auto_increment |
| dCode  | varchar(32) | YES  |     | NULL    |                |
| mul    | float       | YES  |     | NULL    |                |
+--------+-------------+------+-----+---------+----------------+
## Cart
+--------------+--------------+------+-----+---------+----------------+
| Field        | Type         | Null | Key | Default | Extra          |
+--------------+--------------+------+-----+---------+----------------+
| cartID       | int          | NO   | PRI | NULL    | auto_increment |
| UserID       | int          | NO   | MUL | NULL    |                |
| ProductID    | int          | YES  | MUL | NULL    |                |
| ProductName  | varchar(128) | YES  | MUL | NULL    |                |
| ProductPrice | float        | YES  | MUL | NULL    |                |
| ProductImage | varchar(128) | YES  | MUL | NULL    |                |
| quantity     | int          | YES  |     | NULL    |                |
+--------------+--------------+------+-----+---------+----------------+
