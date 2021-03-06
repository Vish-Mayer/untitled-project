import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
import validateCredentials from "../../middleware/validateCredentials.js";
import { alreadyExists, createUser } from "../../models/user.js";
import sendVerification from "../../utils/nodeMailer.js";

const router = express();

router.post("/register", validateCredentials, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await alreadyExists(email);

    if (user) {
      return res
        .status(401)
        .send({ type: "error", msg: "User already exists" });
    }

    const newUser = await createUser(name, email, password);

    const token = jwtGenerator(newUser.id);

    await sendVerification(newUser.email, token);

    return res.status(200).send({
      type: "success",
      name: "new account verification",
      msg: "Account successfully created!",
      description: `Before logging in, please verify your account by clicking on the link sent to ${newUser.email}`
    });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).send("Server Error");
    return;
  }
});

export default router;
