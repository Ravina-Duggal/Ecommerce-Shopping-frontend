import { useEffect, useState } from "react";
import { Link,useNavigate,Navigate} from "react-router-dom"
import {toast } from "react-toastify"
import Modal from 'react-modal';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function ViewCart(){
    const authenticate=sessionStorage.getItem("authenticate")
    const navigate=useNavigate()
    useEffect(()=>{
        if(!authenticate){
            sessionStorage.setItem("message","Please login First")
            navigate("/login")
        }
    },[])
    const [loading,setLoading]=useState(true)
    const [items,setItem]=useState()
    const [address,setAddress]=useState("")
    var total=0
    const [isModalOpen,setIsModalOpen]=useState(false)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const customStyles = {
        content: {
            top: '60%',
            backgroundColor:"white",
            boxShadow:"0px 0px 10px gray",
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width:"50%",
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
        };
        function closeModal() {
            setIsModalOpen(false);
        }
    useEffect(()=>{
        let data={
            userId:sessionStorage.getItem("user_id")
        }
        apiServices.getCart(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                setItem(data.data.data)
                toast.success(data.data.message)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[])
    const nav=useNavigate()
    const orderItem=(e)=>{
        e.preventDefault()
        let orderDetails=items.map((el,index)=>(
            {productId:el.productId._id,quantity:el.quantity,price:el.productId.price}
        ))
        let data={
             userId:sessionStorage.getItem("user_id"),
             orderDetail:JSON.stringify(orderDetails),
             address:address,
             paymentMethod:"Cod"
        }
        apiServices.addOrder(data).then((data)=>{
            if(data.data.success){
                toast.success(data.data.message)
                for(let x of items){
                    let cardData={
                        _id:x._id
                    }
                apiServices.removeCart(cardData).then(
                    (res)=>{
                        console.log("success");
                        setTimeout(()=>{nav("/view_order")},1000)
                    }
                ).catch((error)=>{
                    // console.log(error)
                    toast.error("Something went Wrong!! Please try Later")
                })
            }
                

            }
            else{
                toast.error(data.data.message)
                setTimeout(()=>{nav("/view_order")},1000)
            }
        }).catch((error)=>{
            // console.log(error)
            toast.error("Something went Wrong!! Please try Later")
            setTimeout(()=>{nav("/view_order")},1000)
        })
    }

    
    return(
        <>
        <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    Manage <span>Cart </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Cart</li>
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
                <table className="table text-capitalize table-hover table-striped ">
                    <tr className="table-info">
                        <th>#</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total Amount</th>
                        <th>Delete</th>
                    </tr>
                    {items?.map((element,index)=>{
                        total+=element?.productId?.price* element?.quantity
                        return(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td><img src={BASE_URL_Image+element?.productId?.image} style={{height:"50px",width:"50px"}}/></td>
                            <td>{element?.productId?.name}</td>
                            <td>{element?.quantity}</td>
                            <td>&#8377;{element?.productId?.price}</td>
                            <td>&#8377;{element?.productId?.price* element?.quantity}</td>
                            <td>
                                <button className="btn btn-danger" ><i className="fa fa-trash" ></i></button>
                            </td>
                        </tr>
                    )})}
                    <tr>
                        <th colSpan={5} className="text-right">Grand Total</th>
                        <th>&#8377;{total}</th>
                        <td><button onClick={()=>{setIsModalOpen(true)}} className="btn btn-info">Order Now</button></td>
                    </tr>
                </table>
               
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-8 offset-md-2"></div>
                </div>
            </div>
            <button className="my-5 btn btn-danger d-block mx-auto">Shop More</button>
        </div>
                <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <div className="container p-5">
        <h1>Order Now</h1>
        <div className="row">
            <div className="col-md">
                <div className="form-group">
                    <label>Enter Shipping Address</label>
                    <input className="form-control" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                </div>
                <button className="my-3 btn btn-danger d-block mx-auto" onClick={orderItem}>Order</button>
            </div>
        </div>
      </div>
      </Modal>
        </>
    )
}