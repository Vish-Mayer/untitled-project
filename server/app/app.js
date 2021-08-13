import doenv from "dotenv";
import express from "express";
import cors from "cors";
import register from "./routes/auth/register.js";
import dbConnection from "./dbConnection.js";
import login from "./routes/auth/login.js";
import jwt from "jsonwebtoken";
import authorise from "./middleware/authorize.js";
// import { verifyAccount } from "./models/createUser.js/";
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
    await dbConnection.query(
      "UPDATE users SET user_verified = TRUE WHERE user_id = $1",
      [decoded.user_id]
    );
    res.send("account has been verified");
  } catch (error) {
    res.send(error);
  }
  return;
});

export default app;
