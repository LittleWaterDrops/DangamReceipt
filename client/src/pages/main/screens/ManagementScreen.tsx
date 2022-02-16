import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteCardUseDataWithNumber, getCardUseData } from "../api/API"
import Button from "../components/Button"
import Table from "../components/Table"
import { CardUseDataModel } from "../models/CardUseDataModel"

const initialData: CardUseDataModel = {} as CardUseDataModel

// 오브젝트가 비어있음을 확인
const isEmpty = (object: any) => {
  return !Object.keys(object).length
}

function ManagementScreen() {
  const [cardUseData, setCardUseData] = useState([initialData])
  const [selectedNumber, setSelectedNumber] = useState(Number)

  // selectedNumber 초기화
  useEffect(() => {
    setSelectedNumber(cardUseData[0].No)
  }, [cardUseData])

  // 카드 사용 내역 데이터 호출
  useEffect(() => {
    getCardUseData().then((cardUseData) => {
      setCardUseData(cardUseData)
    })
  }, [])

  // 데이터 삭제 함수
  const dataDelete = () => {
    console.log("delete" + selectedNumber)
    deleteCardUseDataWithNumber(selectedNumber)
  }

  return (
    <div>
      <nav>
        <Link to="/">메인 페이지로</Link>
      </nav>
      {!isEmpty(cardUseData[0]) && (
        <>
          <Table
            items={cardUseData}
            getSelectedNumber={(parameter: number) => setSelectedNumber(parameter)}
          />
          <Link to={`/addData/${selectedNumber}`}>
            <Button text={"수정"} onClicked={() => {}} />
          </Link>
          <Button
            text={"삭제"}
            onClicked={() => {
              dataDelete()
            }}
          />
        </>
      )}
    </div>
  )
}

export default ManagementScreen
