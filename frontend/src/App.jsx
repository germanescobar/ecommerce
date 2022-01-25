import React from "react"
import { Routes, Route } from "react-router-dom"

const Home = React.lazy(() => import("./pages/Home"))
const NewProduct = React.lazy(() => import("./pages/NewProduct"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/new" element={<NewProduct />} />
    </Routes>
  )
}

export default App
