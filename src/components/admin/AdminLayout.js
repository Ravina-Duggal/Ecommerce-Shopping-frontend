import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
export default function AdminLayout(){
    const authenticate=sessionStorage.getItem("authenticate")
    const user_type=sessionStorage.getItem("user_type")
    const navigate=useNavigate()
    useEffect(()=>{
        if(!authenticate){
            navigate("/login",{state:{message:"Please Login to access the page"}})
        }
        if(user_type!=1|| user_type!="1"){
            sessionStorage.clear()
            setTimeout(()=>{
                navigate("/login",{state:{message:"You cannot access this page"}})
            },1000)
        }
    },[])
   
   return(
    <>
        <Header/>
        <Outlet/>
        <Footer/>
        <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            />
    </>
   )
}