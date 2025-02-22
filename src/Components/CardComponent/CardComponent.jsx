import React, { useEffect, useState } from "react";
import "./CardComponent.css";
import { FaClock, FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

function CardComponent() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 rows * 3 columns

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://664dc6deede9a2b55654d26f.mockapi.io/project/QuanSE172057"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="card-container">
      <div className="card-grid">
        {selectedProducts.map((item, index) => (
          <div key={index} className="card-product">
            <img className="card-image" src={item.image} alt={item.name} />
            <div className="card-content">
              {/* <div className="card-location">
                <FaLocationDot className="card-icon" />
                <span>{item.name}</span>
              </div> */}
              <h2 className="card-title">{item.description}</h2>
              <div className="card-rating">
                <FaStar className="star-icon" />
                <span>{item.rating}</span>
              </div>
              <div className="card-tags">
                <span className="tags tag-category">Category</span>
                <span className="tags tag-wildlife">Wildlife</span>
              </div>
              <div className="card-footer">
                <span>
                  <span className="card-price">{item.price}0 </span>VND
                </span>
                <div className="btn-addToCard">
                  <button className="addToCard">Add to card</button>
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

export default CardComponent;
