import React from 'react';
import ProductCart from './ProductCart';
import { useAppContext } from '../context/AppContext';

const BestSellar = () => {
  const { products } = useAppContext();
  console.log(products);

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium mb-4">Best Seller</p>
      <div className="flex flex-wrap gap-4">
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCart key={product._id || index} product={product} />
        ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellar;
