import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const SellerLogin = () => {

    const {navigate,setIsSeller,isSeller}=useAppContext()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

    const onSubmitHandler=async(()=>{
        e.preventDefault();
        setIsSeller(true)
    })

    useEffect(()=>{
        if(isSeller){
            navigate("/seller")
        }
    },[isSeller])

  return !isSeller &&(
   <form onSubmit={onSubmitHandler}>

   </form>
  )
}

export default SellerLogin
