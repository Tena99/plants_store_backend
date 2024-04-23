const { Router } = require("express");
const connect = require("../lib/connect");
const Product = require("../modules/products");
const route = Router();

route.get("/", async (request, response) => {
  await connect();

  const result = await Product.find({});
  response.json({ result });
});

route.get("/special", async (request, response) => {
  await connect();

  const result = await Product.find({ featured: true });
  response.json({ result });
});

route.get("/:productId", async (request, response) => {
  await connect(); 

  const { productId } = request.params;
  const result = await Product.findOne({ _id: productId });

  response.json(result);
});

module.exports = route;
