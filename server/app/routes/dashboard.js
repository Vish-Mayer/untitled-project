import express from "express";
import authorize from "../middleware/authorize.js";
import dbconnection from "../dbConnection.js";
import { getUserById } from "../models/user.js";

const router = express();

router.post("/", authorize, async (req, res) => {
  try {
    const user = await getUserById(req.user_id);
    return res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
