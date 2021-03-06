import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { deleteCardUseDataWithNumber, getCardUseData, downloadXSLX } from "../api/API"
import Button from "../components/Button"
import Table from "../components/Table"
import { CardUseDataModel } from "../models/CardUseDataModel"
import fileDownload from "js-file-download"
import Popup from "../components/Popup"
import "reactjs-popup/dist/index.css"
import styles from "../css/ManagementScreen.module.css"

const initialData: CardUseDataModel = {} as CardUseDataModel
const LAST_MONTH = new Date().getMonth()

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
    setSelectedNumber(cardUseData[0]?.No)
  }, [cardUseData])

  // 카드 사용 내역 데이터 호출
  useEffect(() => {
    getCardUseData().then((cardUseData) => {
      console.log(cardUseData)

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
      {isInit && (
        <>
          <Table
            items={cardUseData}
            getSelectedNumber={(parameter: number) => setSelectedNumber(parameter)}
          />
          <div>
            <Link to={`/addData/${selectedNumber}`} style={{ textDecoration: "none" }}>
              <Button
                text={"수정"}
                className={styles.button}
                onClicked={() => {}}
                onHovered={function (isHovered: boolean): void {}}
              />
            </Link>
            <Popup
              trigger={
                <Link to={`/manage`} style={{ textDecoration: "none" }}>
                  <Button
                    text={"삭제"}
                    className={styles.button}
                    onClicked={() => {}}
                    onHovered={function (isHovered: boolean): void {}}
                  />
                </Link>
              }
              title={"삭제 경고"}
              content={"정말 삭제하시겠습니까?"}
              twoButton={true}
              buttonFunction={function (): void {
                dataDelete()
                window.location.reload()
              }}
            ></Popup>
            <Button
              text={"엑셀 파일 다운로드"}
              className={styles.button}
              onClicked={() => {
                downloadXSLX().then((result) => {
                  console.log(result)
                  fileDownload(result.data, `${LAST_MONTH}월_기술본부_법인카드사용내역서.xlsx`)
                })
              }}
              onHovered={function (isHovered: boolean): void {}}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default ManagementScreen
