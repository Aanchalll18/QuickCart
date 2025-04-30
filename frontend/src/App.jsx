import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")

  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </div>

      {/* ToastContainer should be placed once at root level */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
