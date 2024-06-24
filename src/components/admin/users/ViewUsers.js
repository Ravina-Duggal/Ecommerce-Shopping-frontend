import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import apiServices from "../../../Services/apiServices";

import Moment from "react-moment";
export default function ViewUsers(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const user_type=sessionStorage.getItem('user_type')
    const [orders,setOrders]=useState()
    useEffect(()=>{
        if(user_type==2 || user_type=="2"){
            var data={
                userId:sessionStorage.getItem("user_id")
            }
        }
        apiServices.getAllUsers(data).then((data)=>{
            setOrders(data.data.data)
            setTimeout(()=>{
                setLoading(false)
            },1000)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!")
             setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[loading])
 
    return(
        <>
            <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    List <span>Users </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/admin"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Users</li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center my-5">
                <ClipLoader loading={loading} cssOverride={override} size={120}/>
            </div>     
                 <div className={loading?"disabled-screen":""}>
            <div className="container my-5 table-responsive">
                <table className="table table-hover table-striped table-bordered ">
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Join Date</th>
                       
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>{element.name}</td>
                            <td>{element.email}</td>
                            <td>
                                <Moment>{element.createdAt}</Moment>
                            </td>
                        
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}