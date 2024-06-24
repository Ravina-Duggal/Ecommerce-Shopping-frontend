import { useEffect, useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";


export default function ViewOrderDetails(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const user_type=sessionStorage.getItem('user_type')
    const [orders,setOrders]=useState()
    const {id}=useParams()
    useEffect(()=>{
        if(user_type==2 || user_type=="2"){
            var data={
                orderId:id
            }
        }
        apiServices.getAllOrderDetails(data).then((data)=>{
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
    const authenticate=sessionStorage.getItem("authenticate")
    const navigate=useNavigate()
    useEffect(()=>{
        if(!authenticate){
            sessionStorage.setItem("message","Please login First")
            navigate("/login")
        }
    },[])
    return(
        <>
        <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    Manage <span>Orders </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/admin"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Orders</li>
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
                <table className="table table-hover table-bordered table-striped ">
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Price</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element.productId.image} style={{height:"100px",width:"100px"}}/>
                            </td>
                            <td>{element?.productId?.name}</td>
                            <td>&#8377;{element?.price}</td>
                            <td>{element.quantity}</td>
                            <td>&#8377;{element?.price*element.quantity}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}