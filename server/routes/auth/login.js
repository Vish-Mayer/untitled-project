import express from "express";
import getUser from "./database-queries/getUser";
import bcrypt from "bcrypt";
import jwtGenerator from "./utils/jwtGenerator";

const router = express();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUser(email);

    if (user.rows.length === 0) {
      return res.status(401).json({ msg: "Incorrect Email or Password" });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Incorrect Email or Password");
    }

    const token = jwtGenerator(user.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).json("Server Error");
    return;
  }
});

export default router;
