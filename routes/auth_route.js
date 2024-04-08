const { Router } = require("express");
const connect = require("../lib/connect");
const User = require("../modules/users");
const route = Router();

route.post("/", async (request, response) => {
  await connect();

  const { email, password } = request.body;

  try {
    const [user] = await User.find({ email, password });

    if (user) {
      response.json({
        id: user._id,
        email: user.email,
        nickname: user.nickname,
        phone: user.phone,
        imgUrl: user.imageUrl,
      });
    } else {
      response.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = route;
