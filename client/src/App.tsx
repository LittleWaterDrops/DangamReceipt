import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./pages/main/components/Header"
import AddDataScreen from "./pages/main/screens/AddDataScreen"
import MainScreen from "./pages/main/screens/MainScreen"
import ManagementScreen from "./pages/main/screens/ManagementScreen"

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/addData" element={<AddDataScreen />} />
        <Route path="/manage" element={<ManagementScreen />} />
        <Route path="/addData/:dataNumber" element={<AddDataScreen />} />
      </Routes>
    </div>
  )
}

export default App
