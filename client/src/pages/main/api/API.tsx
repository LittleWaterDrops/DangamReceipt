import axios from "axios"

// 멤버 리스트 관련
export async function getMemberList() {
  return (await axios.get("http://localhost:3001/getMemberList")).data
}

// 구분 관련
export async function getUsageList() {
  return (await axios.get("http://localhost:3001/getUsageList")).data
}

export async function addUsage(postData: { data: any }) {
  return await axios.post("http://localhost:3001/addUsage", postData)
}
