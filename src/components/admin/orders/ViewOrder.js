import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";
import apiServices from "../../../Services/apiServices";


export default function ViewOrder(){
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
        apiServices.getAllOrders(data).then((data)=>{
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
    const cancelOrder=(id)=>{
        let data={
            orderStatus:5,
            _id:id
        }
        setLoading(true)
        apiServices.updateOrder(data).then((data)=>{
            if(data.data.success){
                toast.success(data.data.message)
                setLoading(false)
            }else{
                toast.error(data.data.message)
                setLoading(false)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!")
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
                <table className="table table-hover table-striped table-bordered ">
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Order Id</th>
                        <th>Total Amount</th>
                        <th>Address</th>
                        <th>Shipment Url</th>
                        <th>Tracking Id</th>
                        <th>Order Status</th>
                        <th>Actions</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {orders?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td><Link to={`/order-details/${element._id}`}>{element?.orderId}</Link></td>
                            <td>&#8377;{element?.amountTotal}</td>
                            <td>{element?.address}</td>
                            {element?.shipmentUrl?
                            <td>{element?.shipmentUrl}</td>:
                            <td>---</td>
                            }
                            {element?.trackingId?
                            <td>{element?.trackingId}</td>:
                            <td>---</td>
                            }
                            <th>{element?.orderStatus==1?"Placed":element?.orderStatus==2?"Confirmed":element?.orderStatus==3?"Shipped":element?.orderStatus==4?"Delivered":"Cancelled"}</th>
                            <th>
                                {user_type==1 && element?.orderStatus!=5?
                                <Link to={`/admin/update_order/${element._id}`}>
                                    <button className="btn btn-info">Edit</button>
                                </Link>:
                                element?.orderStatus!=5 && element?.orderStatus!=3 && element?.orderStatus!=4?
                                    <button className="btn btn-danger" onClick={()=>{
                                        cancelOrder(element?._id)
                                    }}>Cancel</button>
                                :"---"
                                }
                            </th>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}