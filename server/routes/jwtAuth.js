const router = require("express").Router();
const pool = require("../db");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.sendStatus(400);
    return;
  }
  res.send({ userId: 0 });
});

module.exports = router;
