import React, { useState } from "react"
import { Convert } from "../models/ReceiptModel"
import SampleModel from "../models/SampleModel.json"

const receiptModel = Convert.toReceiptModel(JSON.stringify(SampleModel))

type MainScreenProps = {
  onSubmit: (form: { name: string; description: string }) => void
}

function MainScreen() {
  const [form, setForm] = useState({
    name: "",
    description: "",
  })
  const { name, description } = form

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setForm({
      name: "",
      description: "",
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={name} onChange={onChange} />
      <input name="description" value={name} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  )
}

export default MainScreen
