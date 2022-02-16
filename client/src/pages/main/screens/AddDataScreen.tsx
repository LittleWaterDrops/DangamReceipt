import { useEffect, useState } from "react"
import Button from "../components/Button"
import TextInput from "../components/TextInput"
import { Convert, ReceiptModel } from "../models/ReceiptModel"
import "react-calendar/dist/Calendar.css"
import ToggleButton from "../components/ToggleButton"
import { getCardUseDataByNumber, getMemberList, getUsageList, insertCardUseData } from "../api/API"
import DropDown from "../components/DropDown"
import ChipSelector from "../components/ChipSelector"
import { Link, Params, useParams } from "react-router-dom"
import { CardUseDataModel } from "../models/CardUseDataModel"
import Calendar from "../components/Calendar"

const initialData: ReceiptModel = { isProved: true } as ReceiptModel

function AddDataScreen() {
  const [receiptData, setReceiptData] = useState(initialData)
  const [member, setMember] = useState([""])
  const [usage, setUsage] = useState([""])
  const [isInit, setIsInit] = useState(false)
  const routerParameter = useParams()

  useEffect(() => {
    //수정 화면에서 변수가 넘어왔을 경우, 화면 컴포넌트의 초깃값 정의
    if (routerParameter.dataNumber && isInit === false) {
      getCardUseDataByNumber(routerParameter.dataNumber).then((dataInfo: CardUseDataModel[]) => {
        const dataByNumber = dataInfo[0]

        const attendantsArray = dataByNumber.비고.split(", ")

        const data: ReceiptModel = {
          receiptDate: dataByNumber.일자,
          usageList: [dataByNumber.구분],
          paymentPlace: dataByNumber.사용처,
          content: dataByNumber.내용,
          paidAmount: dataByNumber.금액,
          payer: [dataByNumber.사용자],
          attendants: attendantsArray,
          isProved: true,
        }
        setReceiptData(data)
        setIsInit(true)
      })
    } else {
      setIsInit(true)
    }
  }, [routerParameter])

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
      {isInit && (
        <>
          <nav>
            <Link to="/">메인 페이지로</Link>
          </nav>
          <Calendar
            initialText={routerParameter.dataNumber ? receiptData.receiptDate : ""}
            returnValue={(parameter) => setReceiptData({ ...receiptData, receiptDate: parameter })}
          />
          <DropDown
            title="구분"
            initialText={routerParameter.dataNumber ? receiptData.usageList[0] : ""}
            memberList={usage}
            returnValue={(parameter) => setReceiptData({ ...receiptData, usageList: parameter })}
          />
          <TextInput
            title="사용처"
            initialText={routerParameter.dataNumber ? receiptData.paymentPlace : ""}
            returnValue={(parameter) => setReceiptData({ ...receiptData, paymentPlace: parameter })}
          />
          <TextInput
            title="내용"
            initialText={routerParameter.dataNumber ? receiptData.content : ""}
            returnValue={(parameter) => setReceiptData({ ...receiptData, content: parameter })}
          />
          <TextInput
            title="금액"
            initialText={routerParameter.dataNumber ? JSON.stringify(receiptData.paidAmount) : ""}
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
            initialText={routerParameter.dataNumber ? receiptData.payer[0] : ""}
            memberList={member}
            returnValue={(parameter) => setReceiptData({ ...receiptData, payer: parameter })}
          />
          <ChipSelector
            title="비고"
            initialSelectedMember={routerParameter.dataNumber ? receiptData.attendants : []}
            memberList={member}
            setMember={(parameter) => setReceiptData({ ...receiptData, attendants: parameter })}
          />
          <ToggleButton
            onClicked={(parameter) => setReceiptData({ ...receiptData, isProved: parameter })}
          />
          <Button text="등록" onClicked={() => SubmitData(receiptData, routerParameter)} />
        </>
      )}
    </div>
  )
}

function SubmitData(dataToSubmit: ReceiptModel, routerParameter: Readonly<Params<string>>) {
  try {
    Convert.receiptModelToJson([dataToSubmit])

    console.log(routerParameter)

    insertCardUseData(dataToSubmit)
    alert("success")
  } catch (e: any) {
    alert("failed - " + e)
  }
}

export default AddDataScreen
