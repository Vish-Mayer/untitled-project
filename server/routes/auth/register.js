import express from "express";
import jwtGenerator from "./utils/jwtGenerator";
import validateCredentials from "../middleware/validateCredentials";
import getUser from "./database-queries/getUser";
import createUser from "./database-queries/createUser";

const router = express();

router.post("/register", validateCredentials, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await getUser(email);

    if (user.rows.length !== 0) {
      return res.status(401).send({ msg: "User already exists" });
    }

    const newUser = await createUser(name, email, password);

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
