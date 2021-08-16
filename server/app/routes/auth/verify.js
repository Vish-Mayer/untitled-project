import express from "express";
import jwtGenerator from "../../utils/jwtGenerator.js";
import { alreadyExists, authenticateUser } from "../../models/user.js";
import authorize from "../../middleware/authorize.js";

const router = express();

router.get("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
