import express from "express";
import db from "../dbConnection";
const router = express();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.sendStatus(400);
    return;
  }

  try {
    //database quries

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send("Server Error");
    db.end();
    return;
  }
});

export default router;
