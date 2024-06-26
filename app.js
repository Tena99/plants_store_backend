require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);
app.use("/images", express.static("assets/images"));

app.get("*", (request, response) => {
  response
    .status(404)
    .json({ message: "The route does not exist. Please try another one." });
});

const server = app.listen(port, () =>
  console.log(`Express app listening on port ${port}!`)
);

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;
