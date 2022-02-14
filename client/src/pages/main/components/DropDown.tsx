import { useState } from "react"
import "../css/DropDown.css"
import TextInput from "./TextInput"
type DropDownProps = {
  title: string
  memberList: string[]
  returnValue: (member: string[]) => void
}

function DropDown({ title, memberList, returnValue }: DropDownProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentName, setCurrentName] = useState("")

  // 드롭다운 활성 상태 토글
  const dropDownToggle = () => {
    setIsActive(!isActive)
  }

  // 아이템이 클릭됨을 감지
  const itemClick = (item: string) => {
    setCurrentName(item)
    setIsActive(!isActive)
    returnValue([item])
  }

  return (
    <div className="menu-container">
      <TextInput
        title={title}
        initialText={currentName}
        returnValue={(parameter) => returnValue([parameter])}
      />
      <button onClick={dropDownToggle}>
        <h3>{currentName == "" ? "선택해주세요." : currentName}</h3>
      </button>
      <div className={`menu ${isActive ? "active" : "inactive"}`}>
        {isActive &&
          memberList.map((item) => {
            return (
              <li key={item} style={{ height: "250px", border: "1px solid black" }}>
                <div onClick={() => itemClick(item)}>{item}</div>
              </li>
            )
          })}
      </div>
    </div>
  )
}

export default DropDown
