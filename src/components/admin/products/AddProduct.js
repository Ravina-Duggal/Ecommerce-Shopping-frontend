import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import apiServices from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function AddProduct(){
    const [loading,setLoading]=useState(false)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const [subcategory,setSubCategory]=useState()
    const [image, setImage]=useState({})
    const [category,setCategory]=useState()
    const [desc,setDesc]=useState("")
    const[cat_id, setCatId]=useState()
    const[subcat_id, setSubCatId]=useState()
    const [price,setPrice]=useState()
    const [product,setProduct]=useState()
    const [imageName,setImageName]=useState("")
    useEffect(()=>{
        apiServices.getAllCategory().then((data)=>{
            setCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Error while loading category")
        })
        apiServices.getAllSubCategory().then((data)=>{
            setSubCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Error while loading sub-category")
        })
    },[])
    useEffect(()=>{
        if(!!cat_id){
        let data={
            categoryId:cat_id,
        }
        apiServices.getAllSubCategory(data).then((data)=>{
            setSubCategory(data.data.data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Error while loading sub-category")
        })
    }
    },[cat_id])
    const handleCategory=(e)=>{
        setCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleSubCategory=(e)=>{
        setSubCatId(e.target.value)
        // console.log(e.target.value)
    }
    const handleImage=(e)=>{
        setImage(e.target.files[0])
        setImageName(e.target.value)
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("name", product)
        data.append("product_image", image)
        data.append("categoryId", cat_id)
        data.append("subcategoryId",subcat_id)
        data.append("price",price)
        data.append("description",desc)
        // console.log(cat_id)
        apiServices.addProduct(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                setPrice("")
                setProduct("")
                setImage({})
                setImageName("")
                setSubCatId("")
                setCatId("")
                setDesc("")
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
                    Add <span>Product </span>
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
            <div className="container-fluid my-5">
                <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8 border border-3 border-danger py-5 rounded">
                        <form onSubmit={handleForm}>
                        <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Product Name</label>
                                </div>
                                <div className="col-md-10">
                                   <input type="text" className="form-control" value={product} onChange={(e)=>{setProduct(e.target.value)}}/>
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
                            <div className="row my-3">
                                <div className="col-md-2">
                                    <label>Sub-Category Name</label>
                                </div>
                                <div className="col-md-10">
                                    <select required className="form-control" onChange={handleSubCategory} value={subcat_id}>
                                        <option selected disabled value="">Choose Sub-Category</option>
                                        {
                                            subcategory?.map((element,index)=>(
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
                                    <input className="form-control" type="file" onChange={handleImage} value={imageName} />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Price</label>
                                </div>
                                <div className="col-md-10">
                                    <input className="form-control" type="number" min={0} value={price} onChange={(e)=>{setPrice(e.target.value)}} />
                                </div>
                            </div>
                            <div className='row my-3'>
                                <div className="col-md-2">
                                    <label>Description</label>
                                </div>
                                <div className="col-md-10">
                                    <textarea className="form-control" type="text" value={desc} onChange={(e)=>{setDesc(e.target.value)}} />
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