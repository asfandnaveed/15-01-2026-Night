const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();


app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "corvit_15_02_2026",

});

db.connect((err) => {

    if (err) {
        console.log("Connection Error !!");
    } else {
        console.log("Connection Success !!");
    }

});

// localhost:3000/api/products
app.get('/api/products', (req, res) => {

    const sql = "SELECT * FROM products";

    db.query(sql, (err, result) => {

        if (err) {

            res.json({
                status: false,
                message: "Unable to Fetch Products !!"
            });

        } else {
            res.json({
                status: true,
                message: "Products Data ! ",
                products: result
            });
        }

    });

});

app.get('/api/product/detail/:id', (req, res) => {

    const productID = req.params.id;

    const sql = "SELECT * FROM products WHERE id=?";

    db.query(sql, [productID], (err, result) => {

        if (err) {

            res.json({
                status: false,
                message: "Unable to Fetch Product Detail !!"
            });

        } else {
            res.json({
                status: true,
                message: "Product Detail ! ",
                product: result[0]
            });
        }
    });
});


app.post('/api/user/login', (req, res) => {

    const { email, pass } = req.body;

    const sql = "SELECT * FROM users WHERE email=?";

    db.query(sql, [email], (err, result) => {

        if (err) {
            return res.json({
                status: false,
                message: "Unable to login !!"
            });
        }

        if (result.length == 0) {
            return res.json({
                status: false,
                message: "User is not registered !!"
            });
        }

        const user = result[0];

        if (user.password != pass) {
            return res.json({
                status: false,
                message: "Inavlid Password !!"
            });
        }

        res.json({
            status: true,
            message: "User Login with Success !!",
            user:user
        });

    });
});




// localhost:3000
const PORT = 3000;
app.listen(PORT, () => {

    console.log("Server is Running  !! ");
});