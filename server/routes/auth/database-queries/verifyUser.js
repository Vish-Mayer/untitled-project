import dbConnection from "../../../dbConnection";

const authorizeUser = async user_id => {
  await dbConnection.query(
    "UPDATE users SET user_verified = TRUE where user_id = $1",
    [user_id]
  );
};

export default authorizeUser;
