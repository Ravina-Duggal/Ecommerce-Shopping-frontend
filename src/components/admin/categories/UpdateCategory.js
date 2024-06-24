import { useEffect, useState } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function UpdateCategory(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const param=useParams()
    const cat_id=param.id
    const [category,setCategory]=useState()
    const [image,setImage]=useState()
    useEffect(()=>{
        let data={
            _id:cat_id
        }
        apiServices.getSingleCategory(data).then((data)=>{
            setCategory(data.data.data.name)
            setImage(data.data.data.image)
            setLoading(false)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    },[])
    const handleImage=(e)=>{
        setImage(e.target.files[0])
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("_id",cat_id)
        data.append("name", category)
        data.append("category_image", image)
        // console.log(data)
        apiServices.updateCategory(data).then((data)=>{
           
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/admin/manage_category")
                },2000)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            })
        })
    }
    return(
        <>
            <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    Update <span>Category </span>
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
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8  border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="file" onChange={handleImage} />
                                </div>
                            </div>
                            <div className="row my-3">
                            <div className="col-md-4"></div>
                                <div className='col-md-5 '>
                                    <button className='form-control btn btn-primary'>Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}