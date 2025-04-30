// import React from 'react'
// import ProductCart from './ProductCart'

// const BestSellar = () => {
//   return (
//     <div className='mt-16'>
//       <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
//       <div>
//         <ProductCart/>
//       </div>
//     </div>
//   )
// }

// export default BestSellar
import React from 'react'
import ProductCart from './ProductCart'
import { dummyProducts } from '../assets/assets';  // Import the products

const BestSellar = () => {
  // You can choose any product from dummyProducts, for example:
  const bestSeller = dummyProducts[0];  // For a single best-selling product
  
  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div>
        <ProductCart products={bestSeller} />  {/* Pass the product to ProductCart */}
      </div>
    </div>
  )
}

export default BestSellar
