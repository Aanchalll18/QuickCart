import {  createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import { toast } from "react-hot-toast";
import axios from 'axios'


axios.defaults.withCredentials=true;
axios.defaults.baseURL=import.meta.env.VITE_BACKEND_URL;

export const AppContext=createContext();

export const AppContextProvider=({children})=>{


    const curreny=import.meta.VITE_CURRENCY;

    const navigate=useNavigate();
    const [user,setUser]=useState(true);
    const [isSeller,setIsSeller]=useState(false)
    const [showUserLogin,setShowUserLogin]=useState(false)
    const [products,setProducts]=useState([])
    const [cartItem,setCartItem]=useState({})
    const [searchQuery,setSearchQuery]=useState({})

    // const fetchSeller=async()=>{
    //     try {
    //         const {data}=await axios.get('/api/seller/sellerAuth');
    //         if(data.success){
    //             setIsSeller(true)
    //         }else{
    //             setIsSeller(false)
    //         }
    //     } catch (error) {
    //         setIsSeller(false)
    //     }
    // }

    const fetchSeller = async () => {
        try {
            const { data } = await axios.get('/api/seller/sellerAuth', {
                withCredentials: true // ✅ This tells browser to send cookies
            });
            setIsSeller(data.success);
        } catch (error) {
            setIsSeller(false);
        }
    };
    

    const fetchProducts=async()=>{
        setProducts(dummyProducts)
    }

    useEffect(()=>{
        fetchSeller()
        fetchProducts()
        console.log(dummyProducts)
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
            if(cartData[itemId]===0){
                delete cartData[itemId]
            }
        }
        toast.success("Removed from cart")
        setCartItem(cartData)
    }

    const getCartCount=()=>{
        let totalcount=0;
        for(const item in cartItem){
            totalcount+=cartItem[item]
        }
        return totalcount;
    }

    const getCartAmount=()=>{
        let totamt=0;
        for(const items in cartItem){
            let itemInfo=products.find((product)=>product._id === items)
            if(cartItem[items]>0){
                totamt+=itemInfo.offerPrice* cartItem[items]
            }
        }
        return Math.floor(totamt*100)/100;
    }

    const value={ 
        navigate,
        user,setUser,
        setIsSeller,isSeller,showUserLogin,setShowUserLogin,
        setProducts,products,
        curreny,addToCart,
        updateCart,deleteCart,
        cartItem,
        searchQuery,setSearchQuery,
        getCartAmount,getCartCount,axios
    }

 
    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}