//Node JS for the beckend side
//Backend Server with express
const express = require("express"); //require=include (library)
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");

app.use(cors());
app.options("*", cors());

//Middleware- checking everything going to the server before it get executed
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt()); //server is secure based on the token
app.use(errorHandler);

//Routes
const categoriesRoute = require("./routes/categories");
const usersRoute = require("./routes/users");
const productrsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");

const api = process.env.API_URL; //this verible reads from the .env

app.use(`${api}/categories`, categoriesRoute);
app.use(`${api}/products`, productrsRoute);
app.use(`${api}/users`, usersRoute);
app.use(`${api}/orders`, ordersRoute);

//Connect to the database in mongoDB
//connect the eshop beckend application to the DB in the cloud
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "eshop-database",
  })
  .then(() => {
    console.log("Database Connection is ready...");
  })
  .catch((err) => {
    console.log(err);
  });

//The port is 3000 and the seconde part in the listen commend ()={} is what will be executed when will be succsesful  creation of the server
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
