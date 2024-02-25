const { use } = require("bcrypt/promises");
const express = require("express");
const userRouter = express.Router();
const path = require("path");

userRouter.use(express.static(path.join(__dirname, "../public")));

userRouter.get("/", (req, res) => {
  const userEmail = req.query.email;
  res.render("user", { user: `Welcome ${userEmail}` });
});

module.exports = userRouter;
