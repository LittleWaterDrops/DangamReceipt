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

router.get("/getUsageList/", (request: Request, response: Response) => {
  DBConnection.query("SELECT * FROM usageList", (result?: any) => {
    response.send(result)
  })
})

router.post("/addUsage/", (request: Request, response: Response) => {
  const usage = request.body.data

  DBConnection.query(
    "INSERT INTO usageList (`usage`) values(?)",
    (result?: any) => {
      response.send(result)
    },
    [usage]
  )
})

export default router
