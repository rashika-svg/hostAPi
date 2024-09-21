require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connect");
const app = express();

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/product");

app.get("/", (req, res) => {
    res.send("Hi, I am live");
});

//middleware or to set router
app.use("/api/products", products_routes);

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(PORT, () => {
            console.log(`${PORT} Yes I'm connected`);
        })
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
    }
};

start();