const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db").default;

//middleware

app.use(express.json());
app.use(cors());

//routes

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
