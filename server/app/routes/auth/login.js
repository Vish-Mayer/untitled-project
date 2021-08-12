import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
import { alreadyExists, authenticateUser } from "../../models/user.js";

const router = express();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await alreadyExists(email);

    if (!user) {
      return res.status(401).json({ msg: "Incorrect Email or Password" });
    }

    const authenticatedUser = await authenticateUser(email, password);

    if (!authenticatedUser) {
      return res.status(401).json({ msg: "Incorrect Email or Password" });
    }

    const verified = await authenticatedUser.verified(authenticatedUser.id);

    if (!verified) {
      return res.status(401).json({
        msg:
          "Please check your email and click on the link to verify your account"
      });
    }

    const token = jwtGenerator(authenticatedUser.id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.sendStatus(500).json("Server Error");
    return;
  }
});

export default router;
