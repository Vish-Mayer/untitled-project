import express from "express";
import dbConnection from "../dbConnection";
const router = express();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.sendStatus(400);
    return;
  }

  try {
    const user = await dbConnection.query(
      "SELECT * FROM users WHERE user_email = $1",
      [email]
    );

    if (user.rows.length !== 0) {
      return res.status(401).send("user already exists");
    }

    res.json(user.rows);
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send("Server Error");
    db.end();
    return;
  }
});

export default router;
