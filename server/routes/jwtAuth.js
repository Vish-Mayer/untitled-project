const router = require("express").Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  const { password } = req.body;
  if (!password) {
    res.sendStatus(400);
    return;
  }
  res.send({ userId: 0 });
});

module.exports = router;
