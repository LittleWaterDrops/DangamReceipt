import React, { useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import { Convert, ReceiptModel } from "../models/ReceiptModel"
import SampleModel from "../models/SampleModel.json"

// const receiptModel = Convert.toReceiptModel(JSON.stringify(SampleModel))
// const receivedData: Array<ReceiptModel> = SampleModel

/**
  receiptDate: Date 일자
  usageList: string[] 구분
  paymentPlace: string 사용처
  content:string 내용
  paidAmount: number 금액
  payer: string[] 사용자
  attendants: string[] 비고
  isProved: boolean 증빙
 */
const initialData: ReceiptModel = {} as ReceiptModel

function MainScreen() {
  const [receiptData, setReceiptData] = useState(initialData)

  return (
    <div>
      <TextInput
        title="사용처"
        returnValue={(parameter) => setReceiptData({ ...receiptData, paymentPlace: parameter })}
      />
      <TextInput
        title="내용"
        returnValue={(parameter) => setReceiptData({ ...receiptData, content: parameter })}
      />
      <Button text="등록" onClicked={() => SubmitData(receiptData)} />
    </div>
  )
}

function SubmitData(dataToSubmit: ReceiptModel) {
  try {
    Convert.receiptModelToJson([dataToSubmit])
    console.log("success")
  } catch (e: any) {
    console.log("failed")
    console.log(e)
  }
}

export default MainScreen
