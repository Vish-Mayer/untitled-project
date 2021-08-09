import express from "express";
import dbConnection from "../../dbConnection";
import jwtGenerator from "./utils/jwtGenerator";
import bcryptGenerator from "./utils/bcryptGenerator";
import validateCredentials from "../middleware/validateCredentials";
import getUser from "../../database-queries/getUser";

const router = express();

router.post("/register", validateCredentials, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await getUser(email);

    if (user.rows.length !== 0) {
      return res.status(401).send({ msg: "User already exists" });
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
