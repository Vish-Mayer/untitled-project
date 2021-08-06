import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const Pool = pg.Pool;

const enviroment = () => {
  if (process.env.NODE_ENV === "test") {
    return "pocket_caddy_test";
  } else {
    return "pocket_caddy";
  }
};

const pool = new Pool({
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: enviroment()
});

export default pool;
