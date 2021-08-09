import express from "express";
import dbConnection from "../../dbConnection";
import jwtGenerator from "../../utils/jwtGenerator";
import bcryptGenerator from "../../utils/bcryptGenerator";

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

    const bcryptPassword = await bcryptGenerator(password);

    const newUser = await dbConnection.query(
      "INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send("Server Error");
    db.end();
    return;
  }
});

export default router;
