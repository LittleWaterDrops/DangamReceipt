import { useEffect, useState } from "react"
import "../css/ChipSelector.css"
import Chip, { ChipProps } from "./Chip"
type ChipSelectorProps = {
  title: string
  memberList: string[]
  setMember: (member: string[]) => void
}

function ChipSelector({ title, memberList, setMember }: ChipSelectorProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentChips, setCurrentChips] = useState<ChipProps[]>([])

  // 칩 리스트 초기화
  useEffect(() => {
    const chipInitList = memberList.map((item, index) => {
      return {
        index: index,
        isSelected: false,
        name: item,
        itemClicked: () => null,
      }
    })
    setCurrentChips(chipInitList)
  }, [memberList])

  // 선택된 칩들 데이터에 전달
  useEffect(() => {
    let chipsNameArray = []
    for (const index in currentChips) {
      currentChips[index].isSelected && chipsNameArray.push(currentChips[index].name)
    }

    setMember(chipsNameArray)
  }, [currentChips])

  // 칩 리스트를 보일지 결정
  const chipSelectorToggle = () => {
    setIsActive(!isActive)
  }

  // 선택된 칩 상태 변경
  const itemSelectStateToggle = (index: number) => {
    let chipsArray = [...currentChips]
    chipsArray[index].isSelected = !chipsArray[index].isSelected

    setCurrentChips(chipsArray)
  }

  const selectedChips = currentChips.filter((item) => item.isSelected === true)

  return (
    <div className="menu-container">
      <h3>{title}</h3>
      <button onClick={chipSelectorToggle}>
        <h3>
          {selectedChips.length === 0
            ? "선택해주세요."
            : selectedChips.flatMap((item) => item.name).join()}
        </h3>
      </button>
      <div className={`menu ${isActive ? "active" : "inactive"}`}>
        {currentChips &&
          currentChips.map((item) => {
            return (
              <Chip
                index={item.index}
                key={item.index}
                isSelected={item.isSelected}
                name={item.name}
                itemClicked={() => itemSelectStateToggle(item.index)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default ChipSelector
