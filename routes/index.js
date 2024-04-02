const { Router } = require("express");
const users_route = require("./users_route");
const products_route = require("./products_route");

const route = Router();

route.use("/users", users_route);
route.use("/products", products_route);

route.get("/", async (request, response) => {
  response.send("Welcome!");
});

module.exports = route;
