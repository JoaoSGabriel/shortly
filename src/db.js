import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const connection = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "123456",
  database: process.env.DATABASE_URL,
});
console.log(connection.database);

export default connection;
