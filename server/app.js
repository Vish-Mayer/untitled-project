import express from "express";
const app = express();
import cors from "cors";
import authRoutes from "./routes/jwtAuth";

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use("/auth", authRoutes);

export default app;
