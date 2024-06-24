import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast} from 'react-toastify';
import apiServices, { BASE_URL_Image } from "../../../Services/apiServices";
import { ClipLoader } from "react-spinners"
export default function ViewCategory(){
    const [loading,setLoading]=useState(true)
    const [subcategory,setSubCategory]=useState()
    const override={
        "position":'absolute',
        "display":"block",
        "top":"64%",
        "zIndex":"3",
    }
  
    useEffect(()=>{
       
       
        apiServices.getAllCategory().then((data)=>{
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
                    View <span>Category </span>
                    </h3>
                    <div className="services-breadcrumb">
                    <div className="agile_inner_breadcrumb">
                        <ul className="w3_short">
                        <li>
                            <Link to={"/"}>Home</Link>
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
                 <div className="new_arrivals_agile_w3ls_info">
    <div className="container">
      <div id="horizontalTab">
        <div className="resp-tabs-container">
          <div className="tab1">
             {subcategory?.map((element,index)=>(
              <div className="col-md-3 product-men">
                <div className="men-pro-item simpleCart_shelfItem">
                  <div className="men-thumb-item">
                    <img src={BASE_URL_Image+element?.image} alt="" className="pro-image-front" style={{height:"300px",width:"100%"}}/>
                    <img src={BASE_URL_Image+element?.image} alt="" className="pro-image-back" style={{height:"300px",width:"100%"}}/>
                    <div className="men-cart-pro">
                      <div className="inner-men-cart-pro">
                        <Link to={`/view_subcat/${element?._id}`}className="link-product-add-cart">
                          Quick View
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="item-info-product ">
                    <h4>
                      <Link to={`/view_subcat/${element?._id}`}>{element?.name}</Link>
                    </h4>
                    <Link to={`/view_subcat/${element?._id}`}style={{color:"white",padding:"15px"}}>
                        <div className="snipcart-details top_brand_home_details item_add single-item hvr-outline-out button2">
                            Explore More
                        </div>
                    </Link>
                  </div>
                </div>
              </div>
          ))}
          
            <div className="clearfix" />
          </div>
        </div>
      </div>
    </div>
  </div>
        </div>
        </>
    )
}