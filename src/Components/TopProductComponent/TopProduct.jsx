import React, { useEffect, useState } from "react";
import "./TopProduct.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import useProduct from "../../Hooks/useProduct";

function TopProduct() {
  const navigate = useNavigate();
  const [topProducts, setTopProducts] = useState([]);
  const {products, loading, error} = useProduct();


  return (
    <div className="card-container">
      <div className="card-grid">
        {products.slice(0, 6).map((item, index) => (
          <div
            key={index}
            className="card-product"
            onClick={() => navigate(`/product-details/${item.id}`)}
          >
            <img className="card-image" src={item.image} alt={item.productName} />
            <div className="card-content">
              <span className="card-name">{item.productName}</span>
              <h2 className="card-description">{item.description}</h2>
              <div className="card-rating">
                <FaStar className="star-icon" />
                <span>{item.rating}</span>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">{item.price.toLocaleString("vi-VN")}0 </span>VND
                </span>
                <div className="btn-addToCard">
                  <button className="addToCard">
                   <Link>Chi tiết</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopProduct;
