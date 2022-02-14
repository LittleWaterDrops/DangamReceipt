import { ReceiptModel } from "./../../../client/src/pages/main/models/ReceiptModel"
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
  DBConnection.query("SELECT * FROM card_usage_statement", (result?: any) => {
    response.send(result)
  })
})

router.post("/insertCardUseData/", (request: Request, response: Response) => {
  const requestBody: ReceiptModel = request.body

  const reuslt = [
    requestBody.receiptDate,
    requestBody.usageList[0],
    requestBody.paymentPlace,
    requestBody.content,
    requestBody.paidAmount,
    requestBody.payer[0],
    requestBody.attendants.join(),
  ]

  DBConnection.query(
    "INSERT INTO DGcard_copy (`일자`,`구분`,`사용처`,`내용`,`금액`,`사용자`,`비고`) values(?)",
    (result?: any) => {
      response.send(result)
    },
    [reuslt]
  )
})

/* 삽입문, 현재 쓰이지 않음
router.post("/addUsage/", (request: Request, response: Response) => {
  const usage = request.body.data

  DBConnection.query(
    "INSERT INTO card_usage_statement (`usage`) values(?)",
    (result?: any) => {
      response.send(result)
    },
    [usage]
  )
})
*/

export default router
