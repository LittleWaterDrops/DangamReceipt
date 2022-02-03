import React from "react"
import { useState } from "react"
import "../css/DropDown.css"
type DropDownProps = {
  title: string
  memberList: string[]
  setMember: (member: string[]) => void
}

function DropDown({ title, memberList, setMember }: DropDownProps) {
  const dropDownRef = React.createRef<HTMLElement>()
  const [isActive, setIsActive] = useState(false)
  const [currentName, setCurrentName] = useState("")

  const dropDownToggle = () => {
    setIsActive(!isActive)
  }

  const itemClick = (item: string) => {
    setCurrentName(item)
    setIsActive(!isActive)
    setMember([item])
  }

  return (
    <div className="menu-container">
      <h3>{title}</h3>
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
