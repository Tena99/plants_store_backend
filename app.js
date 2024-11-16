require("dotenv").config();
const express = require("express");
const cors = require("cors");
const users_route = require("./routes/users_route");
const products_route = require("./routes/products_route");
const auth_route = require("./routes/auth_route");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("assets/images"));

app.get("/", async (request, response) => {
  response.send("Welcome to the Plantopia server!");
});

app.use("/users", users_route);
app.use("/products", products_route);
app.use("/auth", auth_route);

app.get("*", (_, response) => {
  response
    .status(404)
    .json({ message: "The route does not exist. Please try another one." });
});

const server = app.listen(port, () =>
  console.log(`Express app listening on port ${port}!`)
);

server.headersTimeout = 120 * 1000;
