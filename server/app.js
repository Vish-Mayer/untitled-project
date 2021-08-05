const express = require("express");
const app = express();
const cors = require("cors");
const authRoutes = require("./routes/jwtAuth");
const pool = require("./dbConnection").default;

app.use(express.json());
app.use(cors());

//ROUTES

//register and login routes

app.use("/auth", authRoutes);

module.exports = app;
