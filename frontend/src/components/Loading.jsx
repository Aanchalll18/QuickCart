import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'

const Loading = () => {
    const {navigate}=useAppContext()
    let {search}= useLocation()
    const query=new URLSearchParams(search)
    const nextUrl=query.get('next' );

    useEffect(()=>{
        if(nextUrl){
            setTimeout(()=>{
                navigate(`/${nextUrl}`)
            },3000)
        }
    },[nextUrl])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div
        className='animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-blue-500'
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loading
