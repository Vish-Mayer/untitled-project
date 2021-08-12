import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const Pool = pg.Pool;

const enviroment = () => {
  if (process.env.NODE_ENV === "test") {
    return process.env.TEST_DATABASE;
  } else {
    return process.env.DEVELOPMENT_DATABASE;
  }
};

const pool = new Pool({
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: enviroment()
});

export default pool;
