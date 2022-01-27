import dotenv from "dotenv"
import path from "path/posix"
import mysql from "mysql"

dotenv.config({
  path: path.resolve(process.cwd(), "config", ".env"),
})

const currentEnv: NodeJS.ProcessEnv = process.env

const connection: any = mysql.createConnection({
  host: currentEnv.DB_HOST,
  port: JSON.parse(currentEnv.DB_PASSWORD || ""),
  user: currentEnv.DB_USER,
  password: currentEnv.DB_PASSWORD,
  database: currentEnv.DB_DATABASE,
  multipleStatements: JSON.parse(currentEnv.DB_MULTIPLE_STATEMENTS || ""),
})

module.exports(connection)
