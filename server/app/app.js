import doenv from "dotenv";
import express from "express";
import cors from "cors";
import dbConnection from "./dbConnection.js";
import login from "./routes/auth/login.js";
import verify from "./routes/auth/verify.js";
import register from "./routes/auth/register.js";
import jwt from "jsonwebtoken";

import dashboard from "./routes/dashboard.js";

doenv.config();

const app = express();

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use("/auth", [register, login, verify]);

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

app.use("/dashboard", dashboard);
export default app;
