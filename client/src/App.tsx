import React from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import AddDataScreen from "./pages/main/screens/AddDataScreen"
import MainScreen from "./pages/main/screens/MainScreen"
import ManagementScreen from "./pages/main/screens/ManagementScreen"

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/addData" element={<AddDataScreen />} />
        <Route path="/manage" element={<ManagementScreen />} />
      </Routes>
    </div>
  )
}

export default App
