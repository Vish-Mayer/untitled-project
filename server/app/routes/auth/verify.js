import express from "express";
import authorize from "../../middleware/authorize.js";

const router = express();

router.get("/verify", authorize, (req, res) => {
  try {
    res.status(200).send({ verified: true, msg: "Valid token" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
