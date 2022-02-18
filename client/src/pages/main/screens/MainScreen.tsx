import { useState } from "react"
import { Link } from "react-router-dom"
import Button from "../components/Button"
import styles from "../css/MainScreen.module.css"

function MainScreen() {
  const [addDataHovered, setAddDataHovered] = useState(false)
  const [manageHovered, setManageHovered] = useState(false)

  return (
    <div className={styles.container}>
      <h1 className={styles.welcomeText}>환영합니다!</h1>
      <Link to="/addData">
        <Button
          text={"데이터 추가 페이지"}
          className={addDataHovered ? styles.linkTextHovered : styles.linkText}
          onClicked={() => {}}
          onHovered={(isHovered: boolean) => {
            setAddDataHovered(isHovered)
          }}
        />
      </Link>
      <Link to="/manage">
        <Button
          text={"데이터 관리 페이지"}
          className={manageHovered ? styles.linkTextHovered : styles.linkText}
          onClicked={() => {}}
          onHovered={(isHovered: boolean) => {
            setManageHovered(isHovered)
          }}
        />
      </Link>
    </div>
  )
}

const foo = StyleSheet
export default MainScreen
