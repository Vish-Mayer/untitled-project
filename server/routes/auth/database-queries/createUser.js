import connection from "../../../dbConnection";
import bcryptGenerator from "../utils/bcryptGenerator";

const createUser = async (name, email, password) => {
  const bcryptPassword = await bcryptGenerator(password);

  const user = await connection.query(
    "INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bcryptPassword]
  );
  return user;
};

export default createUser;
