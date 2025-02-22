import React from "react";
import "./ProductPage.css";
import banner from "../../../assets/images/footer.jpg";
import { Card, Col, Rate, Row, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import FilterProduct from "../../../Components/FilterProduct/FilterProduct";
import CardComponent from "../../../Components/CardComponent/CardComponent";

function ProductPage() {
  const products = [
    {
      name: "Detangling Hair Spray",
      rating: 4,
      price: "$5.00 - $10.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-2.1.webp",
    },
    {
      name: "Anti-Aging Face Cream",
      rating: 4,
      price: "$5.00 - $10.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-16.1.webp",
    },
    {
      name: "Moisturizing Curl Activator Cream",
      rating: 5,
      price: "$11.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-5.1.webp",
    },

    {
      name: "Detangling Hair Spray",
      rating: 4,
      price: "$5.00 - $10.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-2.1.webp",
    },
    {
      name: "Anti-Aging Face Cream",
      rating: 4,
      price: "$5.00 - $10.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-16.1.webp",
    },
    {
      name: "Moisturizing Curl Activator Cream",
      rating: 5,
      price: "$11.00",
      image:
        "https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-5.1.webp",
    },
  ];

  return (
    <div className="product-page">
      <div className="background-animation"></div>

      {/* ALL PRODUCT */}
      <div className="product-content">
        {/* Header */}

        <div className="main-content">
          {/* filter */}
          <div className="filter">
            <FilterProduct />
          </div>

          {/* Product */}
          <CardComponent />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
