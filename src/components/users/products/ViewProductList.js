import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from 'react-toastify';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function ViewProductList(){
    const [loading,setLoading]=useState(true)
    const override={
        
        "display":"block",
        margin:"0 auto",
        "zIndex":"1",
    }
    const param=useParams()
    const id=param.id
    const [product,setProduct]=useState()
    useEffect(()=>{
        let data={
            subcategoryId:id
        }
        apiServices.getAllProduct(data).then((data)=>{
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
    },[id])
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
                    <div className="new_arrivals_agile_w3ls_info">
                        <div className="container">
                            <h3 className="wthree_text_info">
                            Shop <span>Items</span>
                            </h3>
                            <div id="horizontalTab">
                                <div className="resp-tabs-container">

                                    <div className="tab1">
                                        {product?.map((element,index)=>(
                                        <div className="col-md-3 product-men">
                                            <div className="men-pro-item simpleCart_shelfItem">
                                            <div className="men-thumb-item">
                                                <img src={BASE_URL_Image+element?.image} style={{height:"300px",width:"100%"}} alt="" className="pro-image-front" />
                                                <img src={BASE_URL_Image+element?.image} style={{height:"300px",width:"100%"}} alt="" className="pro-image-back" />
                                                <div className="men-cart-pro">
                                                <div className="inner-men-cart-pro">
                                                    <Link to={`/view_single_product/${element?._id}`} className="link-product-add-cart">
                                                    Quick View
                                                    </Link>
                                                </div>
                                                </div>
                                                
                                            </div>
                                            <div className="item-info-product ">
                                                <h4>
                                                <Link to={`/view_single_product/${element?._id}`}>{element?.name}</Link>
                                                </h4>
                                                <div className="info-product-price">
                                                <span className="item_price">&#8377; {element.price}</span>
                                            
                                                </div>
                                                <Link to={`/view_single_product/${element?._id}`}>
                                                <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
                                                View
                                                </div>
                                            </Link>
                                            </div>
                                            </div>
                                        </div>
                                    
                                        ))}
                                
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     
        </>
    )
}