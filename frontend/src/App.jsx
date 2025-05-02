import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import {Toaster} from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProduct from './pages/AllProduct'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import CartPage from './pages/CartPage'

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller")

  const {showUserLogin}=useAppContext()
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login/> : null}
      
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProduct/>}/>
          <Route path='/products/:category' element={<ProductCategory/>}/>
          <Route path='/products/:category/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<CartPage/>}/>
        </Routes>
      </div>
      {!isSellerPath && <Footer/>}

      <Toaster position="top-center" />
    </div>
  )
}

export default App
