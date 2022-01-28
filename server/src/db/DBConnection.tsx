import dotenv from "dotenv"
import path from "path/posix"
import mysql from "mysql"

// DB 환경 구성
dotenv.config({
  path: path.resolve(process.cwd(), "src", "config", ".env"),
})
const currentEnv: NodeJS.ProcessEnv = process.env
const createConnection: mysql.Connection = mysql.createConnection({
  host: currentEnv.DB_HOST,
  port: parseInt(currentEnv.DB_PASSWORD || ""),
  user: currentEnv.DB_USER,
  password: currentEnv.DB_PASSWORD,
  database: currentEnv.DB_DATABASE,
  multipleStatements: JSON.parse(currentEnv.DB_MULTIPLE_STATEMENTS || ""),
})

// DB 컨트롤
const DBControl = {
  connect: () => {
    createConnection.connect((error) => {
      if (error) {
        console.log("error when connecting to db:", error)
      }
    })
  },

  end: () => {
    createConnection.end((error) => {
      if (error) {
        console.log("error when ending to db:", error)
      }
    })
  },

  select: () => {
    createConnection.query("SHOW TABLES", function (error, results, fields) {
      if (error) {
        console.log("error when query", error)
      }
      console.log(results)
    })
  },

  update: () => {
    createConnection.query(
      "ALTER USER 'root'@'localhost' IDENTIFIED BY 'dg1q2w#E'",
      function (error, results, fileds) {
        if (error) {
          console.log("error when query", error)
        }
        console.log("---------1")

        console.log(results)
      }
    )
  },
  update2: () => {
    createConnection.query("FLUSH PRIVILEGES", function (error, results, fileds) {
      if (error) {
        console.log("error when query", error)
      }
      console.log("---------2")
      console.log(results)
    })
  },
}

export default DBControl
