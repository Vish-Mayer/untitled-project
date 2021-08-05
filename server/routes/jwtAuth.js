const router = require("express").Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  res.send({});
});

module.exports = router;
