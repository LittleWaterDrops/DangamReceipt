import { useState } from "react"
import "../css/ToggleButton.css"

type TextInputProps = {
  onClicked: (isTrue: boolean) => void
}

function ToggleButton({ onClicked }: TextInputProps) {
  const [isTrue, setIsTrue] = useState(true)

  const text = isTrue ? "증빙 완료" : "증빙 안함"

  const buttonClicked = () => {
    setIsTrue(!isTrue)
    onClicked(!isTrue)
  }
  return (
    <div>
      <h3>증빙여부</h3>
      <div className={isTrue ? "proved-text" : "unproved-text"} onClick={buttonClicked}>
        {text}
      </div>
    </div>
  )
}

export default ToggleButton
