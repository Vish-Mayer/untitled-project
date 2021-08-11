import doenv from "dotenv";
import express from "express";
import cors from "cors";
import register from "./routes/auth/register.js";
import dbConnection from "./dbConnection.js";
import login from "./routes/auth/login.js";
import jwt from "jsonwebtoken";
doenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use("/auth", [register, login]);

app.get("/auth/confirmation/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.jwtSecret);
    console.log(decoded);
    await dbConnection.query(
      "UPDATE users SET user_verified = TRUE where user_id = $1",
      [decoded.user_id]
    );
    const user = await getUserByMail(decoded.user_id);
    res.send(`${user.rows[0].user_name} has been verified`);
  } catch (error) {
    res.send(error);
  }
  return;
});

export default app;
