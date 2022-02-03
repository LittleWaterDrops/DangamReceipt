import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"

const router = express.Router()

router.get("/", (request: Request, response: Response) => {
  DBConnection.connect()
  response.send("hello world!")
})

router.get("/getMemberList/", (request: Request, response: Response) => {
  DBConnection.query("SELECT * FROM DGmembers", (result?: any) => {
    response.send(result)
  })
})

export default router
