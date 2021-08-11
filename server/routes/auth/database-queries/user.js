import connection from "../../../dbConnection.js";

export const getUserByMail = async email => {
  const user = await connection.query(
    `SELECT * 
      FROM users 
      WHERE user_email = $1`,
    [email]
  );
  return user;
};

export default getUserByMail;
