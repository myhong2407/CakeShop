const express = require("express");
const cors = require("cors");
const accountsRouter = require("./app/routes/account.route");
const productsRouter = require("./app/routes/product.route");
const cartsRouter = require("./app/routes/cart.route");
const categoriesRouter = require("./app/routes/category.route");
const ordersRouter = require("./app/routes/order.route");

const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.static('public')); 
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application."});
});

app.use("/api/account", accountsRouter);
app.use("/api/admin/products", productsRouter); 
app.use("/api/admin/categories", categoriesRouter); 

app.use("/api/carts", cartsRouter);
app.use("/api/orders", ordersRouter);


//handle 404 respone
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;