const router = require("express").Router();
const pool = require("../dbConnection");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.sendStatus(400);
    return;
  } else {
    res.send({ userId: 0 });
  }
});

module.exports = router;
