const router = require("express").Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
