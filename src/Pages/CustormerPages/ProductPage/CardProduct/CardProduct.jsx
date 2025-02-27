import React, { useEffect, useState } from "react";
import "./CardProduct.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import useProduct from "../../../../Hooks/useProduct";

function CardProduct({ sortProduct, searchTerm }) {
  const { products } = useProduct;
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Filter products based on search term
  const filteredItems = products.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products based on selected option
  const sortedProducts = [...filteredItems].sort((a, b) => {
    switch (sortProduct) {
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      case "a-to-z":
        return a.name.localeCompare(b.name);
      case "z-to-a":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="card-container">
      <div className="card-grid">
        {selectedProducts.map((item, index) => (
          <div
            key={index}
            className="card-product"
            onClick={() => navigate(`/product-details/${item.id}`)}
          >
            <img className="card-image" src={item.image} alt={item.name} />
            <div className="card-content">
              <span className="card-name">{item.name}</span>
              <h2 className="card-description">{item.description}</h2>
              <div className="card-rating">
                <FaStar className="star-icon" />
                <span>{item.rating}</span>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">{item.price}0 </span>VND
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

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
