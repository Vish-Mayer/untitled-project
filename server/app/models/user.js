import connection from "../dbConnection.js";
import bcryptGenerator from "../utils/bcryptGenerator.js";
import bcrypt from "bcrypt";
import { conditionalExpression } from "@babel/types";

export class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
  getPassword = async () => {
    const user = await connection.query(
      `SELECT user_password 
        FROM users 
        WHERE user_id = $1`,
      [this.id]
    );
    return user.rows[0].user_password;
  };
  verified = async () => {
    const user = await connection.query(
      `SELECT user_verified 
        FROM users 
        WHERE user_id = $1`,
      [this.id]
    );
    return user.rows[0].user_verified;
  };
}

export const createUser = async (name, email, password) => {
  const bcryptPassword = await bcryptGenerator(password);

  const user = await connection.query(
    "INSERT INTO users(user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, bcryptPassword]
  );
  const new_user = new User(
    user.rows[0].user_id,
    user.rows[0].user_name,
    user.rows[0].user_email
  );
  return new_user;
};

export const alreadyExists = async email => {
  const result = await connection.query(
    `SELECT * 
      FROM users 
      WHERE user_email = $1`,
    [email]
  );
  if (result.rows.length) {
    return true;
  } else {
    return false;
  }
};

export const authenticateUser = async (email, password) => {
  const user = await connection.query(
    `SELECT * 
      FROM users 
      WHERE user_email = $1`,
    [email]
  );

  const validPassword = await bcrypt.compare(
    password,
    user.rows[0].user_password
  );

  if (validPassword) {
    const new_user = new User(
      user.rows[0].user_id,
      user.rows[0].user_name,
      user.rows[0].user_email
    );
    return new_user;
  }
};
