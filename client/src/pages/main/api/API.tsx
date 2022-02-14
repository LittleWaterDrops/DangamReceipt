import axios from "axios"
import { ReceiptModel } from "./../../../pages/main/models/ReceiptModel"

// 멤버 리스트 관련
export async function getMemberList() {
  return (await axios.get("http://localhost:3001/getMemberList")).data
}

// 구분 관련
export async function getUsageList() {
  return (await axios.get("http://localhost:3001/getUsageList")).data
}

// 전체 데이터 관련
export async function insertCardUseData(resultData: ReceiptModel) {
  return await axios.post("http://localhost:3001/insertCardUseData", resultData)
}
