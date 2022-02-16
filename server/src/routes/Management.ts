import express, { Request, Response } from "express"
import DBConnection from "../db/DBConnection"
import DBTables from "../db/DBTables"
import { CardUseDataModel } from "./../../../client/src/pages/main/models/CardUseDataModel"

const router = express.Router()

router.get("/getCardUseData/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.USE_DATA}`, (result?: any) => {
    response.send(result)
  })
})
router.get("/getCardUseData/:dataNumber", (request: Request, response: Response) => {
  DBConnection.query(
    `SELECT * FROM ${DBTables.USE_DATA} WHERE NO = ${request.params.dataNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.get("/getCardUseDataByNumber/", (request: Request, response: Response) => {
  DBConnection.query(`SELECT * FROM ${DBTables.USE_DATA} WHERE NO = ${request}`, (result?: any) => {
    response.send(result)
  })
})

router.post("/deleteCardUseDataWithNumber/", (request: Request, response: Response) => {
  DBConnection.query(
    `DELETE FROM ${DBTables.USE_DATA} WHERE No = ${request.body.deleteNumber}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

router.post("/updateCardUseDataWithNumber/", (request: Request, response: Response) => {
  const requestBody: CardUseDataModel = request.body

  const result = [
    requestBody.일자,
    requestBody.사용처,
    requestBody.내용,
    requestBody.금액,
    requestBody.사용자,
    requestBody.비고,
    requestBody.No,
  ]

  DBConnection.query(
    `UPDATE ${DBTables.USE_DATA} SET
    일자 =  ${result[0]},
    구분 = ${result[1]},
    사용처 = ${result[2]},
    내용 = ${result[3]},
    금액 = ${result[4]},
    사용자 = ${result[5]},
    비고 = ${result[6]}
    WHERE No = ${result[7]}`,
    (result?: any) => {
      response.send(result)
    }
  )
})

export default router
