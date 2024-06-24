
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiServices, { BASE_URL_Image } from "../Services/apiServices"
import { ClipLoader } from "react-spinners"
export default function Main(){
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
    },[])
    return(
    <>
    <>
  {/* banner */}
  <div id="myCarousel" className="carousel slide" data-ride="carousel">
    {/* Indicators */}
    <ol className="carousel-indicators">
      <li data-target="#myCarousel" data-slide-to={0} className="active" />
      <li data-target="#myCarousel" data-slide-to={1} className="" />
      <li data-target="#myCarousel" data-slide-to={2} className="" />
      <li data-target="#myCarousel" data-slide-to={3} className="" />
      <li data-target="#myCarousel" data-slide-to={4} className="" />
    </ol>
    <div className="carousel-inner" role="listbox">
      <div className="item active">
        <div className="container">
          <div className="carousel-caption">
            <h3>
              The Biggest <span>Sale</span>
            </h3>
            <p>Special for today</p>
            <a className="hvr-outline-out button2" href="mens.html">
              Shop Now{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="item item2">
        <div className="container">
          <div className="carousel-caption">
            <h3>
              Summer <span>Collection</span>
            </h3>
            <p>New Arrivals On Sale</p>
            <a className="hvr-outline-out button2" href="mens.html">
              Shop Now{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="item item3">
        <div className="container">
          <div className="carousel-caption">
            <h3>
              The Biggest <span>Sale</span>
            </h3>
            <p>Special for today</p>
            <a className="hvr-outline-out button2" href="mens.html">
              Shop Now{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="item item4">
        <div className="container">
          <div className="carousel-caption">
            <h3>
              Summer <span>Collection</span>
            </h3>
            <p>New Arrivals On Sale</p>
            <a className="hvr-outline-out button2" href="mens.html">
              Shop Now{" "}
            </a>
          </div>
        </div>
      </div>
      <div className="item item5">
        <div className="container">
          <div className="carousel-caption">
            <h3>
              The Biggest <span>Sale</span>
            </h3>
            <p>Special for today</p>
            <a className="hvr-outline-out button2" href="mens.html">
              Shop Now{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
    <a
      className="left carousel-control"
      href="#myCarousel"
      role="button"
      data-slide="prev"
    >
      <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a
      className="right carousel-control"
      href="#myCarousel"
      role="button"
      data-slide="next"
    >
      <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
    {/* The Modal */}
  </div>
  {/* //banner */}
  <div className="banner_bottom_agile_info">
    <div className="container">
      <div className="banner_bottom_agile_info_inner_w3ls">
        <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
          <figure className="effect-roxy">
            <img src="/assets/images/bottom1.jpg" alt=" " className="img-responsive" />
            <figcaption>
              <h3>
                <span>F</span>all Ahead
              </h3>
              <p>New Arrivals</p>
            </figcaption>
          </figure>
        </div>
        <div className="col-md-6 wthree_banner_bottom_grid_three_left1 grid">
          <figure className="effect-roxy">
            <img src="/assets/images/bottom2.jpg" alt=" " className="img-responsive" />
            <figcaption>
              <h3>
                <span>F</span>all Ahead
              </h3>
              <p>New Arrivals</p>
            </figcaption>
          </figure>
        </div>
        <div className="clearfix" />
      </div>
    </div>
  </div>
  {/* schedule-bottom */}
  <div className="schedule-bottom">
    <div className="col-md-6 agileinfo_schedule_bottom_left">
      <img src="/assets/images/mid.jpg" alt=" " className="img-responsive" />
    </div>
    <div className="col-md-6 agileits_schedule_bottom_right">
      <div className="w3ls_schedule_bottom_right_grid">
        <h3>
          Save up to <span>50%</span> by shopping
        </h3>
        <p>
          We provide best quality at genuine prices just like wholesale, Shop more and save even more
        </p>
        <div className="col-md-4 w3l_schedule_bottom_right_grid1">
          <i className="fa fa-user-o" aria-hidden="true" />
          <h4>Customers</h4>
          <h5 className="counter">653</h5>
        </div>
        <div className="col-md-4 w3l_schedule_bottom_right_grid1">
          <i className="fa fa-calendar-o" aria-hidden="true" />
          <h4>Events</h4>
          <h5 className="counter">823</h5>
        </div>
        <div className="col-md-4 w3l_schedule_bottom_right_grid1">
          <i className="fa fa-shield" aria-hidden="true" />
          <h4>Awards</h4>
          <h5 className="counter">45</h5>
        </div>
        <div className="clearfix"> </div>
      </div>
    </div>
    <div className="clearfix"> </div>
  </div>
  {/* //schedule-bottom */}
  {/* banner-bootom-w3-agileits */}
  <div className="banner-bootom-w3-agileits">
    <div className="container">
      <h3 className="wthree_text_info">
        What's <span>Trending</span>
      </h3>
      <div className="col-md-5 bb-grids bb-left-agileits-w3layouts">
        <a href="womens.html">
          <div className="bb-left-agileits-w3layouts-inner grid">
            <figure className="effect-roxy">
              <img src="/assets/images/bb1.jpg" alt=" " className="img-responsive" />
              <figcaption>
                <h3>
                  <span>S</span>ale{" "}
                </h3>
                <p>Upto 55%</p>
              </figcaption>
            </figure>
          </div>
        </a>
      </div>
      <div className="col-md-7 bb-grids bb-middle-agileits-w3layouts">
        <a href="mens.html">
          <div className="bb-middle-agileits-w3layouts grid">
            <figure className="effect-roxy">
              <img
                src="/assets/images/bottom3.jpg"
                alt=" "
                className="img-responsive"
              />
              <figcaption>
                <h3>
                  <span>S</span>ale{" "}
                </h3>
                <p>Upto 55%</p>
              </figcaption>
            </figure>
          </div>
        </a>
        <a href="mens.html">
          <div className="bb-middle-agileits-w3layouts forth grid">
            <figure className="effect-roxy">
              <img
                src="/assets/images/bottom4.jpg"
                alt=" "
                className="img-responsive"
              />
              <figcaption>
                <h3>
                  <span>S</span>ale{" "}
                </h3>
                <p>Upto 65%</p>
              </figcaption>
            </figure>
          </div>
        </a>
        <div className="clearfix" />
      </div>
    </div>
  </div>
  {/*/grids*/}
  <div className="agile_last_double_sectionw3ls">
    <div className="col-md-6 multi-gd-img multi-gd-text ">
      <a href="womens.html">
        <img src="/assets/images/bot_1.jpg" alt=" " />
        <h4>
          Flat <span>50%</span> offer
        </h4>
      </a>
    </div>
    <div className="col-md-6 multi-gd-img multi-gd-text ">
      <a href="womens.html">
        <img src="/assets/images/bot_2.jpg" alt=" " />
        <h4>
          Flat <span>50%</span> offer
        </h4>
      </a>
    </div>
    <div className="clearfix" />
  </div>
  {/*/grids*/}
  {/* /new_arrivals */}
  <div className="new_arrivals_agile_w3ls_info">
    <div className="container">
      <h3 className="wthree_text_info">
        New <span>Arrivals</span>
      </h3>
      <div id="horizontalTab">
        <div className="resp-tabs-container">
          {/*/tab_one*/}
          <div className="tab1">
              {product?.reverse()?.slice(0,8)?.map((element,index)=>(
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
  {/* //new_arrivals */}
  {/* /we-offer */}
  <div className="sale-w3ls">
    <div className="container">
      <h6>
        We Offer Flat <span>40%</span> Discount
      </h6>
      <Link className="hvr-outline-out button2" to={"/view_product_list"}>
        Shop Now{" "}
      </Link>
    </div>
  </div>
  {/* //we-offer */}
  {/*/grids*/}
  <div className="coupons">
    <div className="coupons-grids text-center">
      <div className="w3layouts_mail_grid">
        <div className="col-md-3 w3layouts_mail_grid_left">
          <div className="w3layouts_mail_grid_left1 hvr-radial-out">
            <i className="fa fa-truck" aria-hidden="true" />
          </div>
          <div className="w3layouts_mail_grid_left2">
            <h3>FREE SHIPPING</h3>
            <p>Get free shipping with orders</p>
          </div>
        </div>
        <div className="col-md-3 w3layouts_mail_grid_left">
          <div className="w3layouts_mail_grid_left1 hvr-radial-out">
            <i className="fa fa-headphones" aria-hidden="true" />
          </div>
          <div className="w3layouts_mail_grid_left2">
            <h3>24/7 SUPPORT</h3>
            <p>Buy product online  24/7</p>
          </div>
        </div>
        <div className="col-md-3 w3layouts_mail_grid_left">
          <div className="w3layouts_mail_grid_left1 hvr-radial-out">
            <i className="fa fa-shopping-bag" aria-hidden="true" />
          </div>
          <div className="w3layouts_mail_grid_left2">
            <h3>MONEY BACK GUARANTEE</h3>
            <p>Return and refund policy available if faced any issue</p>
          </div>
        </div>
        <div className="col-md-3 w3layouts_mail_grid_left">
          <div className="w3layouts_mail_grid_left1 hvr-radial-out">
            <i className="fa fa-gift" aria-hidden="true" />
          </div>
          <div className="w3layouts_mail_grid_left2">
            <h3>FREE GIFTS</h3>
            <p>Get free gifts on orders</p>
          </div>
        </div>
        <div className="clearfix"> </div>
      </div>
    </div>
  </div>
</>

   </>
    )
}