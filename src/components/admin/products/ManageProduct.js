import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function ManageProduct(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [product,setProduct]=useState()
    useEffect(()=>{
        apiServices.getAllProduct().then((data)=>{
            setLoading(false)
            if(data.data.success){
                setProduct(data.data.data)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[])
    return(
        <>
            <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    Manage <span>Product </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/admin"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Product</li>
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
                <table className="table table-bordered table-striped table-hover ">
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Sub-Category Name</th>
                        <th>Category Name</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Edit</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {product?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element?.image} style={{height:"100px",width:"100px"}}/>
                            </td>
                            <td>{element?.name}</td>
                            <td>{element?.categoryId?.name}</td>
                            <td>{element?.subcategoryId?.name}</td>
                            <td>&#8377;{element?.price}</td>
                            <td>{element?.description}</td>
                            <td>
                                <Link to={`/admin/update_product/${element?._id}`}>
                                    <button className="btn btn-success">Edit</button>
                                </Link>
                            </td>
                            {/* <td>
                                <button className="btn btn-danger" >Delete</button>
                            </td> */}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}