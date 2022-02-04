export type ChipProps = {
  index: number
  isSelected: boolean
  name: string
  itemClicked: () => void
}

function Chip({ isSelected, name, itemClicked }: ChipProps) {
  const buttonClicked = () => {
    itemClicked()
  }
  return (
    <div style={{ backgroundColor: isSelected ? "blue" : "red" }}>
      <button onClick={buttonClicked}>{name}</button>
    </div>
  )
}

export default Chip
