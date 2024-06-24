import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
export default function ManageCategory(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [category,setCategory]=useState()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            setLoading(false)
            if(data.data.success){
                setCategory(data.data.data)
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
                    Manage <span>Category </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/admin"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Category</li>
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
                    <thead className="table-primary">
                    <tr>
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                        {/* <th>Delete</th> */}
                    </tr>
                    </thead>
                    <tbody>
                    {category?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element?.image} className="img-fluid" style={{height:"100px",width:"100px"}}/>
                            </td>
                            <td>{element?.name}</td>
                            <td>
                                <Link to={`/admin/update_category/${element?._id}`}>
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