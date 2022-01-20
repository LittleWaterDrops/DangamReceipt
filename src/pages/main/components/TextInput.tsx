import React, { useState } from "react"
type TextInputProps = {
  title: string
  returnValue: (text: string) => void
}

function TextInput({ title, returnValue }: TextInputProps) {
  const [text, setText] = useState("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const handleBlur = () => {
    returnValue(text)
  }
  return (
    <div>
      <h3>{title}</h3>
      <input onChange={onChange} onBlur={handleBlur} />
    </div>
  )
}

export default TextInput
