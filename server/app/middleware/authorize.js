import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const authorize = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(403)
      .json({ verified: false, msg: "authorization denied" });
  }

  try {
    const verify = jwt.verify(token, process.env.jwtSecret);

    req.user_id = verify.user_id;
    next();
  } catch (err) {
    res.status(401).json({ verified: false, msg: "Token is not valid" });
  }
};
export default authorize;
