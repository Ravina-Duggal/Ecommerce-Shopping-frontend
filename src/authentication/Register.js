import Header from "../layouts/Header"
import Footer from "../layouts/Footer"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import apiServices from "../Services/apiServices"
import { useState } from "react"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify"
import { ClipLoader } from "react-spinners"
export default function Register(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const [name, setName]=useState()
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            name:name,
            email:email,
            password:password
        }
        apiServices.register(data).then((result)=>{
            if(result.data.success){
                toast.success(result.data.message)
                let data1={
                    email:email,
                    password:password
                }
                apiServices.login(data1).then((res)=>{
                    if(res.data.success){
                        sessionStorage.setItem("user_id", res.data.data._id)
                        sessionStorage.setItem("user_name", res.data.data.name)
                        sessionStorage.setItem("user_email", res.data.data.email)
                        sessionStorage.setItem("token", res.data.token)
                        sessionStorage.setItem("user_type", res.data.data.userType)
                        sessionStorage.setItem("authenticate",true)
                        if(res.data.data.userType==1|| res.data.data.userType=="1"){
                            navigate("/admin")
                        }
                        else{
                            navigate("/")
                        }
                    }
                    else{
                        toast.error(res.data.message)
                    }
                }).catch((error)=>{
                    console.log(error)
                    toast.error("Something went Wrong")
                    setTimeout(()=>{
                        setLoading(false)
                    },1000)
                })
            }
            else{
                toast.error(result.data.message)
                setTimeout(()=>{
                    setLoading(false)
                },1000)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    }
    return(
        <>
        <div className="page-head_agile_info_w3l">
               <div className="container">
                   <h3>
                   User <span>Register </span>
                   </h3>
                   <div className="services-breadcrumb">
                   <div className="agile_inner_breadcrumb">
                       <ul className="w3_short">
                       <li>
                           <Link to={"/"}>Home</Link>
                           <i>|</i>
                       </li>
                       <li>Register</li>
                       </ul>
                   </div>
                   </div>
               </div>
           </div>
           <div className="d-flex justify-content-center my-5">
               <ClipLoader loading={loading} cssOverride={override} size={120}/>
           </div>     
                <div className={loading?"disabled-screen":""}>
       
           <div className="container-fluid my-5">
               <div className="row ">
                   <div className='col-md-3'></div>
                   <div className="col-md-6  contact-form">
                       <h4 className="white-w3ls">
                           SignUp <span>Form</span>
                       </h4>
                       <form onSubmit={handleForm} method="post">
                           <div className="styled-input">
                           <input type="text" name="name" required="" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                           <label>Name</label>
                           <span />
                           </div>
                           <div className="styled-input">
                           <input type="email" name="Email" required="" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                           <label>Email</label>
                           <span />
                           </div>
                           <div className="styled-input">
                           <input type="password" name="Password" required="" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                           <label>Password</label>
                           <span />
                           </div>
                           <input type="submit" value="SEND" />
                       </form>
                   </div>
               </div>
           </div>
       </div>
       <ToastContainer/>
       </>
    )
}