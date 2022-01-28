import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"

const router = express.Router()

router.get("/", (request: Request, response: Response) => {
  response.send("hello, world")

  DBConnection.connect()

  DBConnection.select()
  // DBConnection.update()
  // DBConnection.update2()
  // DBConnection.end()
})

router.get("/hello/", (request: Request, response: Response) => {
  response.send("kaka world!")
})

export default router
