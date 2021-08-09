import express from "express";
const app = express();
import cors from "cors";
import register from "./routes/userAuth/register";
import login from "./routes/userAuth/login";

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use("/auth", [register, login]);

export default app;
