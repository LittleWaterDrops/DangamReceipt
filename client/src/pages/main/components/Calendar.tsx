import moment from "moment"
import { useEffect, useState } from "react"
import ReactCalendar from "react-calendar"
import "react-calendar/dist/Calendar.css"

type CalendarProps = {
  initialText: string | Date
  returnValue: (date: string) => void
}

function Calendar({ initialText, returnValue }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState("")

  // 수정 화면에서 넘어온 날짜 정의
  useEffect(() => {
    if (initialText) {
      setSelectedDate(moment(initialText).format("YYYY-MM-DD"))
    }
  }, [initialText])

  return (
    <>
      <h3>{selectedDate ? "선택된 날짜: " + selectedDate : "날짜를 선택해주세요."}</h3>
      <ReactCalendar
        value={new Date(initialText)}
        onChange={(parameter: Date) => returnValue(moment(parameter).format("YYYY-MM-DD"))}
      />
    </>
  )
}

export default Calendar
