import React from 'react'
import MainBanner from '../components/MainBanner'
import Category from '../components/Category'
import BestSellar from '../components/BestSellar'
import Banner from '../components/Banner'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner/>
      <Category/>
      <BestSellar/>
      <Banner/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home
