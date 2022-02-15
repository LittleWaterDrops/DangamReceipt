import { CardUseDataModel } from "../models/CardUseDataModel"
import { useTable } from "react-table"
import { useMemo, useState } from "react"

type TableProps = {
  items: CardUseDataModel[]
  getSelectedNumber: (selectedNumber: number) => void
}

// 테이블 헤더 정의
const COLUMNS = [
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
]

function Table({ items, getSelectedNumber }: TableProps) {
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => items, [])

  const [selectedIndex, setSelectedIndex] = useState(Number)

  // 테이블에 필요한 프로퍼티 정의
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    // @ts-ignore
    columns,
    data,
  })

  // 라디오 버튼 및 데이터가 클릭되었을 시 동작
  const rowClicked = (dataIndex: number, dataNumber: number) => {
    setSelectedIndex(dataIndex)
    getSelectedNumber(dataNumber)
  }

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
            <tr
              onClick={() => {
                rowClicked(row.index, row.values.No)
              }}
              {...row.getRowProps()}
            >
              <td>
                <input
                  type={"radio"}
                  onChange={() => {
                    rowClicked(row.index, row.values.No)
                  }}
                  checked={row.index === selectedIndex}
                />
              </td>
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
