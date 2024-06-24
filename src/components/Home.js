import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
export default function Home(){
   
   
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