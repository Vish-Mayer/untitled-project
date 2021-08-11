import express from "express";
import jwtGenerator from "./utils/jwtGenerator.js";
import validateCredentials from "../../middleware/validateCredentials.js";
import getUserByMail from "./database-queries/user.js";
import createUser from "./database-queries/createUser.js";

const router = express();

router.post("/register", validateCredentials, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await getUserByMail(email);

    if (user.rows.length !== 0) {
      return res.status(401).send({ msg: "User already exists" });
    }

    const newUser = await createUser(name, email, password);

    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send("Server Error");
    return;
  }
});

export default router;
