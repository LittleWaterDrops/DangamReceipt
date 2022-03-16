import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteCardUseDataWithNumber, getCardUseData, downloadXSLX } from "../api/API"
import Button from "../components/Button"
import Table from "../components/Table"
import { CardUseDataModel } from "../models/CardUseDataModel"
import fileDownload from "js-file-download"

const initialData: CardUseDataModel = {} as CardUseDataModel

// 오브젝트가 비어있음을 확인
export const isEmpty = (object: any) => {
  return !Object.keys(object).length
}

function ManagementScreen() {
  const [cardUseData, setCardUseData] = useState([initialData])
  const [selectedNumber, setSelectedNumber] = useState(Number)
  const [isInit, setIsInit] = useState(false)
  // selectedNumber 초기화
  useEffect(() => {
    setSelectedNumber(cardUseData[0].No)
  }, [cardUseData])

  // 카드 사용 내역 데이터 호출
  useEffect(() => {
    getCardUseData().then((cardUseData) => {
      setCardUseData(cardUseData)
      setIsInit(true)
    })
  }, [isInit])

  // 데이터 삭제 함수
  const dataDelete = () => {
    console.log("delete" + selectedNumber)
    deleteCardUseDataWithNumber(selectedNumber)
    setIsInit(false)
  }

  return (
    <div>
      <nav>
        <Link to="/">메인 페이지로</Link>
      </nav>
      {isInit && (
        <>
          <Table
            items={cardUseData}
            getSelectedNumber={(parameter: number) => setSelectedNumber(parameter)}
          />
          <Link to={`/addData/${selectedNumber}`}>
            <Button
              text={"수정"}
              onClicked={() => {}}
              onHovered={function (isHovered: boolean): void {}}
            />
          </Link>
          <Link to={`/manage`}>
            <Button
              text={"삭제"}
              onClicked={() => {
                dataDelete()
              }}
              onHovered={function (isHovered: boolean): void {}}
            />
          </Link>
          <Button
            text={"엑셀 파일 다운로드"}
            onClicked={() => {
              downloadXSLX().then((result) => {
                console.log(result)
                fileDownload(result.data, "test_python.py")
              })
            }}
            onHovered={function (isHovered: boolean): void {}}
          />
        </>
      )}
    </div>
  )
}

export default ManagementScreen
