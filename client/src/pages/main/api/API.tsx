import axios from "axios"

export async function getMemberList() {
  return (await axios.get("http://localhost:3001/getMemberList")).data
}
