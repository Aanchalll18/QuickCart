import React from 'react'
import { useAppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'

const ProductCategory = () => {
    const {products}=useAppContext()
    const {category}=useParams()

    const searchCategory=categories.find((item)=>item.path.toLowerCase()=== category)

  return (
    <div>
      
    </div>
  )
}

export default ProductCategory
