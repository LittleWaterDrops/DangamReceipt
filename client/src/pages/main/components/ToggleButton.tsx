import { useState } from "react"
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
      <button onClick={buttonClicked}>{text}</button>
    </div>
  )
}

export default ToggleButton
