import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Banner from "./Banner/Banner";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdSupportAgent } from "react-icons/md";
import { LuPackageOpen } from "react-icons/lu";
import Slider from "react-slick";

// import image brand
import brand1 from "../../../assets/brand/1.png";
import brand2 from "../../../assets/brand/2.png";
import brand3 from "../../../assets/brand/3.png";
import brand4 from "../../../assets/brand/4.png";
import brand5 from "../../../assets/brand/5.png";
import TopProduct from "../../../Components/TopProductComponent/TopProduct";

function HomePage() {
  const setting = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    arrows: false,
  }

  const slider = [
    { id: 1, url: brand1, alt: "Image 1" },
    { id: 2, url: brand2, alt: "Image 2" },
    { id: 3, url: brand3, alt: "Image 3" },
    { id: 4, url: brand4, alt: "Image 3" },
    { id: 5, url: brand5, alt: "Image 3" },
  ]


  return (
    <div className="homepage">

      {/* Banner */}
      <Banner />
      <div className="homepage-content">
        <div className="section-support">
          <div className="line-support"></div>

          <div className="support">
            <div className="support-icon">
              <LiaShippingFastSolid />
            </div>
            <div className="support-content">
              <p>Shipping</p>
              <p style={{ fontWeight: "bold" }}>Free Shipping World wide</p>
            </div>
          </div>

          <div className="line-support"></div>

          <div className="support">
            <div className="support-icon">
              <MdSupportAgent />
            </div>
            <div className="support-content">
              <p>Hassle Free</p>
              <p style={{ fontWeight: "bold" }}>24*7 Customer Support</p>
            </div>
          </div>

          <div className="line-support"></div>

          <div className="support">
            <div className="support-icon">
              <LuPackageOpen />
            </div>
            <div className="support-content">
              <p>Secured</p>
              <p style={{ fontWeight: "bold" }}>Safe Packaging</p>
            </div>
          </div>
          <div className="line-support"></div>
        </div>

        {/* Carousel BRAND */}
        <div className="brand-container">
          <Slider {...setting} className="slider-brand">
            {slider.map((item) => (
              <div key={item.id}>
                <img
                  src={item.url}
                  alt={item.alt}
                  style={{
                    maxWidth: "150px",
                    maxHeight: "150px",
                  }}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="top-product">
          <TopProduct/>
        </div>
      </div>

    </div>
  );
}

export default HomePage;
