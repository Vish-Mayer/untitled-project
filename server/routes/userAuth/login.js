import express from "express";

const router = express();

router.post("/SignIn", async (req, res) => {
  res.sendStatus(200);
});

export default router;
