import connection from "../dbConnection";

const getUser = async email => {
  const user = await connection.query(
    `SELECT * 
      FROM users 
      WHERE user_email = $1`,
    [email]
  );
  return user;
};

export default getUser;
