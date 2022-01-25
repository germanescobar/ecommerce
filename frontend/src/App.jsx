import React from "react"
import { Routes, Route } from "react-router-dom"

const Home = React.lazy(() => import("./pages/Home"))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mercadopago/success" element={<h1>Success</h1>} />
      <Route path="/mercadopago/failure" element={<h1>Failure</h1>} />
      <Route path="/mercadopago/pending" element={<h1>Pending</h1>} />
    </Routes>
  )
}

export default App
