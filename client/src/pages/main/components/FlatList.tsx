import { CardUseDataModel } from "../models/CardUseDataModel"
import TextInput from "../components/TextInput"

type FlatListProps = {
  items: CardUseDataModel[]
}

function Item(item: CardUseDataModel) {
  return (
    <TextInput title={JSON.stringify(item.No)} initialText={item.구분} returnValue={() => {}} />
  )
}

function FlatList({ items }: FlatListProps) {
  return (
    <ul>
      {items.map((item: CardUseDataModel) => (
        <Item
          No={item.No}
          일자={item.일자}
          구분={item.구분}
          사용처={item.사용자}
          내용={item.내용}
          금액={item.금액}
          사용자={item.사용자}
          비고={item.비고}
        />
      ))}
    </ul>
  )
}

export default FlatList
