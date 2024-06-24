import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function AddSubCategory(){
    const [loading,setLoading]=useState(false)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    const [subimage, setSubImage]=useState({})
    const [imageName,setImageName]=useState("")
    const [category,setCategory]=useState()
    const[cat_id, setCatId]=useState()
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            setCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    const handleCategory=(e)=>{
        setCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleImage=(e)=>{
        setSubImage(e.target.files[0])
        setImageName(e.target.value)
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name", subcategory)
        data.append("subcategory_image", subimage)
        data.append("categoryId", cat_id)
        // console.log(cat_id)
        apiServices.addSubCategory(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                setSubCategory("")
                setCatId("")
                setSubImage({})
                setImageName("")
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
                    Add <span>Sub-Category </span>
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
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8  border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Sub-Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="text" value={subcategory} onChange={(e)=>{setSubCategory(e.target.value)}}/>
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Category</label>
                                </div>
                                <div className="col-md-10">
                                    <select required className="form-control" onChange={handleCategory} value={cat_id}>
                                        <option selected disabled value="">Choose Category</option>
                                        {
                                            category?.map((element,index)=>(
                                                <option key={index+1} value={element?._id}>{element?.name}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-md-2">
                                    <label>Image</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="file" onChange={handleImage} value={imageName}/>
                                </div>
                            </div>
                            <div className="row my-3">
                            <div className="col-md-4"></div>
                                <div className='col-md-5 '>
                                    <button className='form-control btn btn-primary'>Submit</button>
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