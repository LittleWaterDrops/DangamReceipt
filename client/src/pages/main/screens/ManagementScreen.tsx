import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCardUseData } from "../api/API"
import FlatList from "../components/FlatList"
import { CardUseDataModel } from "../models/CardUseDataModel"

const initialData: CardUseDataModel = {} as CardUseDataModel

function ManagementScreen() {
  const [cardUseData, setCardUseData] = useState([initialData])

  useEffect(() => {
    getCardUseData().then((cardUseData) => {
      setCardUseData(cardUseData)
    })
  }, [])

  return (
    <div>
      <nav>
        <Link to="/">메인 페이지로</Link>
      </nav>
      {!isEmpty(cardUseData[0]) && <FlatList items={cardUseData} />}
    </div>
  )
}

const isEmpty = (object: any) => {
  return !Object.keys(object).length
}

export default ManagementScreen
