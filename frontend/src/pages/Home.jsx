import React from 'react'
import MainBanner from '../components/MainBanner'
import Category from '../components/Category'
import BestSellar from '../components/BestSellar'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Category/>
      <BestSellar/>
    </div>
  )
}

export default Home
