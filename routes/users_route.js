const { Router } = require("express");
const connect = require("../lib/connect");
const User = require("../modules/users");
const Product = require("../modules/products");
const route = Router();

route.get("/", async (request, response) => {
  await connect();

  const result = await User.find({});
  response.json({ result });
});

route.get("/:userId", async (request, response) => {
  await connect();

  const { userId } = request.params;
  const result = await User.findOne({ _id: userId }).populate("cart.product");

  response.json(result);
});

module.exports = route;
