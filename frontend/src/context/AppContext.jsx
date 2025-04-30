import {  createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";

export const AppContext=createContext();

export const AppContextProvider=({children})=>{


    const curreny=import.meta.VITE_CURRENCY;

    const navigate=useNavigate();
    const [user,setUser]=useState(true);
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])

    const fetchProducts=async()=>{
        setProducts(dummyProducts)
    }

    useEffect(()=>{
        setProducts()
    },[])

    const value={ 
        navigate,
        user,setUser,
        setIsSeller,isSeller,showUserLogin,setShowUserLogin,
        setProducts,products,
        curreny
    }
    
    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}