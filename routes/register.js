const express = require("express");
const registerRouter = express.Router();
const path = require("path");

registerRouter.use(express.static(path.join(__dirname, "../public")));

registerRouter.get("/", async (req, res) => {
  res.sendFile("register.html", { root: path.join(__dirname, "../public") });
});

module.exports = registerRouter;
