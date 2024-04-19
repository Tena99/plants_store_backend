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

route.get("/:userId/cart", async (request, response) => {
  await connect();

  const { userId } = request.params;
  const result = await User.findOne({ _id: userId }).populate("cart.product");

  response.json(result.cart);
});

route.post("/:userId/cart", async (request, response) => {
  await connect();

  const { userId } = request.params;
  const { productId } = request.body;

  try {
    const user = await User.findById(userId);
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $inc: { inStock: -1 } },
      { new: true }
    );

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    // Check if the product already exists in the user's cart
    const existingProduct = user.cart.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      // If the product already exists, increment its amount
      existingProduct.amount += 1;
    } else {
      // If the product doesn't exist, add it to the cart
      user.cart.push({ product: productId, amount: 1 });
    }
    await user.save();

    response.json(user);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});

route.delete("/:userId/cart/:productId", async (request, response) => {
  try {
    await connect();

    const { userId, productId } = request.params;

    if (!userId || !productId) {
      return response
        .status(400)
        .json({ error: "User ID or Product ID is missing" });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: { product: productId } } },
      { new: true }
    );

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    response.json(user);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal server error" });
  }
});

module.exports = route;
