import React, { useEffect, useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import { Convert, ReceiptModel } from "../models/ReceiptModel"
import Calendar from "react-calendar"
import ToggleButton from "../components/ToggleButton"
import { getMemberList } from "../api/API"
import DropDown from "../components/DropDown"
// import SampleModel from "../models/SampleModel.json"

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
const initialData: ReceiptModel = { isProved: true } as ReceiptModel

function MainScreen() {
  const [receiptData, setReceiptData] = useState(initialData)
  const [member, setMember] = useState([""])

  useEffect(() => {
    getMemberList().then((memberList) => {
      let memberArray: string[] = []
      for (const index in memberList) {
        memberArray.push(memberList[index].name)
      }
      setMember(memberArray)
    })
  }, [])

  console.log(receiptData)

  return (
    <div>
      <Calendar
        onChange={(parameter: Date) => setReceiptData({ ...receiptData, receiptDate: parameter })}
      />
      <TextInput
        title="사용처"
        returnValue={(parameter) => setReceiptData({ ...receiptData, paymentPlace: parameter })}
      />
      <TextInput
        title="내용"
        returnValue={(parameter) => setReceiptData({ ...receiptData, content: parameter })}
      />
      <TextInput
        title="금액"
        inputType={"number"}
        returnValue={(parameter) => {
          // 텍스트를 숫자로 변환, 빈 텍스트인 경우 0으로 반환
          var parsedParameter = parseInt(parameter)
          parsedParameter = isNaN(parsedParameter) ? 0 : parsedParameter

          setReceiptData({ ...receiptData, paidAmount: parsedParameter })
        }}
      />
      <DropDown
        title="사용자"
        memberList={member}
        setMember={(parameter) => setReceiptData({ ...receiptData, payer: parameter })}
      />
      <ToggleButton
        onClicked={(parameter) => setReceiptData({ ...receiptData, isProved: parameter })}
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
    console.log("failed - ", e)
  }
}

export default MainScreen
