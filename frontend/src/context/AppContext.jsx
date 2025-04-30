import {  createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext=createContext();

export const AppContextProvider=({children})=>{


    const curreny=import.meta.VITE_CURRENCY;

    const navigate=useNavigate();
    const [user,setUser]=useState(true);
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])
    const [cartItem,setCartItem]=useState({})

    const fetchProducts=async()=>{
        setProducts(dummyProducts)
    }

    useEffect(()=>{
        fetchProducts()
    },[])
    

    const addToCart=(itemId)=>{
        let cartData=structuredClone(cartItem);

        if(cartData[itemId]){
            cartData[itemId] +=1;
        }
        else{
            cartData[itemId]=1
        }
        setCartItem(cartData);
        toast.success("Added to Cart")
    }
    const updateCart=(itemId,quantity)=>{
        let cartData=structuredClone(cartItem)
        cartData[itemId]=quantity;
        setCartItem(cartData)
        toast.success("Cart Updated")
    }
    const deleteCart=(itemId)=>{
        let cartData=structuredClone(cartItem);
        if(cartData){
            cartData[itemId] -=1;
            if(cartData[cartItem]===0){
                delete cartData[cartItem]
            }
        }
        toast.success("Removed from cart")
        setCartItem(cartData)
    }

    const value={ 
        navigate,
        user,setUser,
        setIsSeller,isSeller,showUserLogin,setShowUserLogin,
        setProducts,products,
        curreny,addToCart,
        updateCart,deleteCart,
        cartItem
    }

 
    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}