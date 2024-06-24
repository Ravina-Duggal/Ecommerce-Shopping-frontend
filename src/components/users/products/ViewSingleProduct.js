import { useEffect, useState } from "react"
import {  Link, useNavigate, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function ViewSingleProduct(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [product,setProduct]=useState()
    const [image,setImage]=useState()
    const [price,setPrice]=useState()
    const [pid,setId]=useState()
    const [category,setCategory]=useState()
    const [subcat,setSubCategory]=useState()
    const authenticate=sessionStorage.getItem("authenticate")
    const navigate=useNavigate()
    const [quantity,setQuantity]=useState(1)
    const [productId,setProductId]=useState()
    const [description,setDescription]=useState("")
    useEffect(()=>{
        let data={
            _id:id
        }
        apiServices.getSingleProduct(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                // console.log(data)
                setProduct(data.data.data.name)
                setImage(data.data.data.image)
                setId(data.data.data._id)
                setPrice(data.data.data.price)
                setCategory(data.data.data.categoryId?.name)
                setSubCategory(data.data.data.subcategoryId?.name)
                setProductId(data.data.data._id)
                setDescription(data.data.data.description)
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
    },[id])
    const nav=useNavigate()
    const addToCart=()=>{
        if(!authenticate){
            navigate("/login")
            sessionStorage.setItem('message','Please Login to order!!')
        }
        else{
            const user_id=sessionStorage.getItem('user_id')
            let data={
                productId:pid,
                userId:user_id,
                quantity:quantity
            }
            apiServices.addCart(data).then((data)=>{
                if(data.data.success){
                    toast.success(data.data.message)
                    setTimeout(()=>{nav("/view_cart")},1000)
                }
                else{
                    toast.error(data.data.message)
                }
            }).catch((error)=>{
                // console.log(error)
                toast.error("Something went Wrong!! Please try Later")
            })
        }
    }
 

   
    return(
        <>
        <div className="page-head_agile_info_w3l">
                <div className="container">
                    <h3>
                    View <span>Product </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/"}>Home</Link>
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
                    <div className="banner-bootom-w3-agileits">
                        <div className="container">
                            <div className="col-md-4 single-right-left ">
                            <div className="grid images_3_of_2">
                                <div className="flexslider">
                                
                                    <div className="thumb-image">
                                        {" "}
                                        <img
                                        src={BASE_URL_Image+image}
                                        data-imagezoom="true"
                                        className="img-responsive"
                                        />{" "}
                                    </div>
                                    
                                   
                                <div className="clearfix" />
                                </div>
                            </div>
                            </div>
                            <div className="col-md-8 single-right-left simpleCart_shelfItem">
                            <h3>{product}</h3>
                            <p>
                                <span className="item_price">&#8377;{price}</span> 
                            </p>
                            <div className="color-quality">
                                <div className="color-quality-right">
                                    <h5>Quantity :</h5>
                                    <input
                                    type="number" min={1} value={quantity} onChange={(e)=>{setQuantity(e.target.value)}}
                                    className="frm-field required sect"
                                    />
                                </div>
                            </div>

                            <div className="occasional">
                                <h5>Types :</h5>
                                <div className="colr ert">
                                <label className="radio">
                                   
                                    {subcat}
                               (
                                {category}
                               )
                                </label>
                                </div>
                                <div className="clearfix"> </div>
                            </div>
                            <a href="#" onClick={addToCart} style={{color:"white"}}>
                                <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2" style={{width:"30%",color:"white !important"}}>
                                Add to cart
                                </div>
                            </a>
                        
                            </div>
                            <div className="clearfix"> </div>
                            {/* /new_arrivals */}
                            <div className="responsive_tabs_agileits">
                            <div id="horizontalTab">
                                <ul className="resp-tabs-list">
                                <li>Description</li>
                                </ul>
                                <div className="resp-tabs-container">
                                {/*/tab_one*/}
                                <div className="tab1">
                                    <div className="single_page_agile_its_w3ls">
                                    <p>
                                        {description}
                                    </p>
                                    </div>
                                </div>
                            
                                </div>
                            </div>
                            </div>
                            {/* //new_arrivals */}
                        </div>
                    </div>
                </div>
    
     
        </>
    )
}
