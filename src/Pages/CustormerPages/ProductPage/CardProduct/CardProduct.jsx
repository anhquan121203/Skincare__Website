import React, { useState } from "react";
import "./CardProduct.css";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import useProduct from "../../../../Hooks/useProduct";

function CardProduct({ sortProduct, searchTerm }) {
  const { products, loading, error } = useProduct(); 
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="card-container">
      <div className="card-grid">
        {products.map((item, index) => (
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
              </div>
              <div className="tag-category">
                <span>{item.categoryName}</span>
                <span>{item.skinTypeName}</span>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">{item.price} VND</span>
                </span>
                <div className="btn-addToCard">
                  <button className="addToCard">
                    Thêm giỏ hàng <BsCart4 />
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

export default CardProduct;
