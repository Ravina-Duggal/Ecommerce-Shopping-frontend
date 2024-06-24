import Header from '../layouts/Header'
import Footer from '../layouts/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import apiServices from '../Services/apiServices'
import { toast } from 'react-toastify'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners'
export default function Login(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[message,setMessage]=useState()
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    useEffect(()=>{
        setMessage(sessionStorage.getItem("message"))
        if(message){
            toast.error(message)
            setTimeout(()=>{
                sessionStorage.removeItem("message")
            },2000)
        }
    },[message])
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const handleForm=(e)=>{
        e.preventDefault();
        setLoading(true)
        let data={
            email:email,
            password:password
        }
        apiServices.login(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                // console.warn(data.data.token)
                sessionStorage.setItem("user_id", data.data.data._id)
                sessionStorage.setItem("user_name", data.data.data.name)
                sessionStorage.setItem("user_email", data.data.data.email)
                sessionStorage.setItem("token", data.data.token)
                sessionStorage.setItem("user_type", data.data.data.userType)
                sessionStorage.setItem("authenticate",true)
                if(data.data.data.userType==1|| data.data.data.userType=="1"){
                    navigate("/admin")
                }
                else{
                    navigate("/")
                }
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong")
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
                    User <span>Login </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Login</li>
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
                            SignIn <span>Form</span>
                        </h4>
                        <form onSubmit={handleForm} method="post">
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
        
        </>
    )
}