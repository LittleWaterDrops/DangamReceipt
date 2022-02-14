import React from "react"
import { Route, Routes } from "react-router-dom"
import "./App.css"
import MainScreen from "./pages/main/screens/MainScreen"
import ManagementScreen from "./pages/main/screens/ManagementScreen"

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/manage" element={<ManagementScreen />} />
      </Routes>
    </div>
  )
}

export default App
