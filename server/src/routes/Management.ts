import { ReceiptModel } from "./../../../client/src/pages/main/models/ReceiptModel"
import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"

const router = express.Router()

router.get("/getCardUseData/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.USE_DATA}`, (result?: any) => {
    response.send(result)
  })
})

export default router
