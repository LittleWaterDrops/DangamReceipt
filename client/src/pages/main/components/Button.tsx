type TextInputProps = {
  text: string
  onClicked: () => void
}

function Button({ text, onClicked }: TextInputProps) {
  const buttonClicked = () => {
    onClicked()
  }
  return <button onClick={buttonClicked}>{text}</button>
}

export default Button
