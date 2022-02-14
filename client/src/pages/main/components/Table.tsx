import { CardUseDataModel } from "../models/CardUseDataModel"
import { useTable } from "react-table"
import { useMemo } from "react"
type TableProps = {
  items: CardUseDataModel[]
}

function Table({ items }: TableProps) {
  const columns = useMemo(
    () => [
      {
        Header: "No",
        accessor: "No",
      },
      {
        Header: "일자",
        accessor: "일자",
      },
      {
        Header: "구분",
        accessor: "구분",
      },
      {
        Header: "사용처",
        accessor: "사용처",
      },
      {
        Header: "내용",
        accessor: "내용",
      },
      {
        Header: "금액",
        accessor: "금액",
      },
      {
        Header: "사용자",
        accessor: "사용자",
      },
      {
        Header: "비고",
        accessor: "비고",
      },
    ],
    []
  )

  const data = useMemo(() => items, [])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // @ts-ignore
    columns,
    data,
  })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr onClick={() => console.log(row.values)} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table

/*

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
*/
