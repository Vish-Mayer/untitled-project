import dotenv from "dotenv";
dotenv.config();

const authorize = async (req, res, next) => {
  const token = req.params.token;
  // console.log(token);

  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
export default authorize;
