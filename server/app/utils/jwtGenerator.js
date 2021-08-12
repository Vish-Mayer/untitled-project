import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtGenerator = user_id => {
  const payload = {
    user_id: user_id
  };
  return jsonwebtoken.sign(payload, process.env.jwtSecret, {
    expiresIn: "1hr"
  });
};

export default jwtGenerator;
