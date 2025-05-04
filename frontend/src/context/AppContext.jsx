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

    const fetchUser=async()=>{
        try {
            const {data}=await axios.get('/api/user/isAuth');

            if(data.success){
                setUser(data.user)
                setCartItem(data.user.cartItem)
                // toast.success(data.message)
            }
        } catch (error) {
            setUser(null)
            // toast.error(error.message)
        }
    }
    

    const fetchProducts=async()=>{
        try {
            const {data}=await axios.get('/api/product/list')
            if(data.success){
                setProducts(data.products)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
           console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchUser()
        fetchSeller()
        fetchProducts()
        // console.log(dummyProducts)
    },[])
    
    // useEffect(()=>{
    //     const updateCart=async()=>{
    //         try {
    //             const {data}=await axios.post('/api/cart/update',{cartItem})
    //             if(data.success){
    //                 toast.error(data.message)
    //             }
    //         } catch (error) {
    //             toast.error(error.message)
    //         }
    //     }
    //     if(user){
    //         updateCart()
    //     }
    // },[cartItem])

    useEffect(() => {
        const updateCart = async () => {
            try {
                const { data } = await axios.post('/api/cart/update', { cartItem });
                if (data.success) {
                    toast.error(data.message); // ❌ This line is confusing (why toast.error on success?)
                }
            } catch (error) {
                toast.error(error.message);
            }
        };
    
        if (user) {
            updateCart();
        }
    }, [cartItem]);
    

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
        getCartAmount,getCartCount,
        axios,fetchProducts,
        fetchUser
    }

 
    return <AppContext.Provider value={value}>
       {children} 
    </AppContext.Provider>
}

export const useAppContext=()=>{
    return useContext(AppContext)
}