// import express from "express";
// import jwtGenerator from "../../utils/jwtGenerator.js";
// import jwt from "jsonwebtoken";

// const router = express();

// router.post("/confirmation/", async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.params.token, process.env.jwtSecret);
//     const connection = await dbConnection.query(
//       "UPDATE users SET user_verified = TRUE WHERE user_id = $1",
//       [decoded.user_id]
//     );
//     res.sendStatus("account has been verified");
//   } catch (error) {
//     res.sendStatus(500).send("Server Error");
//     return;
//   }
// });

// export default router;
