const { Router } = require("express");
const connect = require("../lib/connect");
const Product = require("../modules/products");
const route = Router();

route.get("/", async (request, response) => {
  await connect();

  const result = await Product.find({ featured: false });
  response.json({ result });
});

route.get("/special", async (request, response) => {
  await connect();

  const result = await Product.find({ featured: true });
  response.json({ result });
});

route.post("/category", async (request, response) => {
  await connect();

  let { category } = request.body;
  console.log(category);

  const result = await Product.find({ category });
  console.log(result);

  response.json({ result });
});

route.get("/:productId", async (request, response) => {
  await connect();

  const { productId } = request.params;
  const result = await Product.findOne({ _id: productId });

  response.json(result);
});

module.exports = route;
