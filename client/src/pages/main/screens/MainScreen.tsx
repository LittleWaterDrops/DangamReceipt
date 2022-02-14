import { Link } from "react-router-dom"

function MainScreen() {
  return (
    <div>
      <nav>
        <Link to="/addData">데이터 추가 페이지로</Link>
      </nav>
      <nav>
        <Link to="/manage">데이터 관리 페이지로</Link>
      </nav>
    </div>
  )
}
export default MainScreen
