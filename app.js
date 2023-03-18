const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv/config");

const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(errorHandler);

const api = process.env.API_URL;

const usersRouter = require("./routers/users");
const categoriesRouter = require("./routers/categories");
const productsRouter = require("./routers/products");
const ordersRouter = require("./routers/orders");

//Routers
app.use(`${api}/users`, usersRouter);
app.use(`${api}/categories`, categoriesRouter);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/orders`, ordersRouter);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "DinoShop",
  })
  .then(() => {
    console.log("Database Connection is ready!");
  })
  .catch((err) => {
    console.log(err);
  });

//Middleware
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running http://localhost:3000");
});
