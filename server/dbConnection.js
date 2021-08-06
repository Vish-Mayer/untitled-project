import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const Pool = pg.Pool;

const pool = new Pool({
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE
});

export default pool;
