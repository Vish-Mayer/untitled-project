import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
import { alreadyExists, authenticateUser } from "../../models/user.js";

const router = express();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await alreadyExists(email);

    if (!user) {
      return res
        .status(401)
        .json({ type: "error", msg: "Incorrect Email or Password" });
    }

    const authenticatedUser = await authenticateUser(email, password);

    if (!authenticatedUser) {
      return res
        .status(401)
        .json({ type: "error", msg: "Incorrect Email or Password" });
    }

    const verified = await authenticatedUser.verified();

    if (!verified) {
      return res.status(401).json({
        type: "success",
        msg:
          "Please check your email and click on the link to verify your account"
      });
    }

    const token = jwtGenerator(authenticatedUser.id);

    res.json({ type: "success", token: token });
  } catch (error) {
    res.sendStatus(500);
    return;
  }
});

export default router;
