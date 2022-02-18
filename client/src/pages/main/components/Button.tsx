type TextInputProps = {
  text: string
  onClicked: () => void
  onHovered: (isHovered: boolean) => void
  className?: string
}

function Button({ text, onClicked, onHovered, className }: TextInputProps) {
  const buttonClicked = () => {
    onClicked()
  }
  return (
    <button
      onClick={buttonClicked}
      onMouseEnter={() => onHovered(true)}
      onMouseLeave={() => onHovered(false)}
      className={className}
    >
      {text}
    </button>
  )
}

export default Button
