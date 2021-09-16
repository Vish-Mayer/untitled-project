import express from "express";
import { getUserById } from "../models/user.js";
import { createClub } from "../models/club.js";
import { createUserClub } from "../models/userClub.js";
import validateNewClub from "../middleware/validateNewClub.js";

const router = express();

router.get("/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  const user = await getUserById(user_id);
  const userClubs = await user.clubs();
  res.status(200).send(userClubs);
  try {
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/new/:user_id", validateNewClub, async (req, res) => {
  const { name, type, average } = req.body;
  const user_id = req.params.user_id;
  try {
    if (user_id) {
      const club = await createClub(name, type, average);
      await createUserClub(user_id, club.id);

      return res.json({ type: "success", msg: "club added" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

export default router;
