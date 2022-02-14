import { useEffect, useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import { Convert, ReceiptModel } from "../models/ReceiptModel"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import ToggleButton from "../components/ToggleButton"
import { getMemberList, getUsageList, insertCardUseData } from "../api/API"
import DropDown from "../components/DropDown"
import ChipSelector from "../components/ChipSelector"
import moment from "moment"

const initialData: ReceiptModel = { isProved: true } as ReceiptModel

function MainScreen() {
  const [receiptData, setReceiptData] = useState(initialData)
  const [member, setMember] = useState([""])
  const [usage, setUsage] = useState([""])

  useEffect(() => {
    // 멤버 리스트 초기화
    getMemberList().then((memberList) => {
      let memberArray: string[] = []
      for (const index in memberList) {
        memberArray.push(memberList[index].name)
      }
      setMember(memberArray)
    })

    // 비고 리스트 초기화
    getUsageList().then((usageList) => {
      let usageArray: string[] = []
      for (const index in usageList) {
        usageArray.push(usageList[index].usage)
      }
      setUsage(usageArray)
    })
  }, [])

  console.log(receiptData)

  return (
    <div>
      <Calendar
        onChange={(parameter: Date) =>
          setReceiptData({ ...receiptData, receiptDate: moment(parameter).format("YYYY-MM-DD") })
        }
      />
      <DropDown
        title="구분"
        memberList={usage}
        returnValue={(parameter) => setReceiptData({ ...receiptData, usageList: parameter })}
      />
      <TextInput
        title="사용처"
        initialText=""
        returnValue={(parameter) => setReceiptData({ ...receiptData, paymentPlace: parameter })}
      />
      <TextInput
        title="내용"
        initialText=""
        returnValue={(parameter) => setReceiptData({ ...receiptData, content: parameter })}
      />
      <TextInput
        title="금액"
        initialText=""
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
        returnValue={(parameter) => setReceiptData({ ...receiptData, payer: parameter })}
      />
      <ChipSelector
        title="비고"
        memberList={member}
        setMember={(parameter) => setReceiptData({ ...receiptData, attendants: parameter })}
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

    insertCardUseData(dataToSubmit)
    console.log("success")
  } catch (e: any) {
    console.log("failed - ", e)
  }
}

export default MainScreen
