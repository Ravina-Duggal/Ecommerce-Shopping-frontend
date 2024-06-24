import { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
export default function ManageSubCategory(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    useEffect(()=>{
        apiServices.getAllSubCategory().then((data)=>{
            setLoading(false)
            if(data.data.success){
                setSubCategory(data.data.data)
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
                    Manage <span>Sub-Category </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/admin"}>Home</Link>
                            <i>|</i>
                        </li>
                        <li>Sub-Category</li>
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
                <table className="table table-bordered table-striped table-hover text-capitalize">
                    <thead>
                    <tr>
                        <th>Sr.No</th>
                        <th>Image</th>
                        <th>Sub-Category Name</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {subcategory?.map((element,index)=>(
                        <tr key={index+1}>
                            <td>{index+1}</td>
                            <td>
                                <img src={BASE_URL_Image+element?.image} style={{height:"100px",width:"100px"}}/>
                            </td>
                            <td>{element?.name}</td>
                            <td>{element?.categoryId?.name}</td>
                            <td>
                                <Link to={`/admin/update_subcat/${element._id}`}>
                                    <button className="btn btn-success">Edit</button>
                                </Link>
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