import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import TabDetails from "./TabProductDetails/TabDetails";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import CardComponent from "../../../Components/CardComponent/CardComponent";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://664dc6deede9a2b55654d26f.mockapi.io/project/QuanSE172057/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-page">
      {/* Frame Details */}
      <div className="details-container">
        <div className="details-grid">
          <div className="details-form-left">
            <img
              className="details-image"
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* Details Form right */}
          <div className="details-form-right">
            <h2 className="details-title">{product.name}</h2>
            <p className="details-price">{product.price} VNĐ</p>
            <p className="details-rating">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <span key={i}>
                    {product.rating >= ratingValue ? (
                      <FaStar color="gold" />
                    ) : product.rating >= ratingValue - 0.5 ? (
                      <FaStarHalfAlt color="gold" />
                    ) : (
                      <FaStar color="lightgray" />
                    )}
                  </span>
                );
              })}{" "}
              (1 Review)
            </p>
            <p className="details-description">{product.description}</p>

            <div className="add-to-card-details">
              <input className="details-quantity" type="number" defaultValue={1} />
              <button className="btn-details" type="submit">
                Add to card <TiShoppingCart />
              </button>
            </div>

            {/* BOX safe payment */}
            <div className="safe-payment-box">
              <span className="safe-payment-title">Safe Payment</span>
              <div className="payment-icons">
                <img
                  src="https://iphonebaclieu.com/wp-content/uploads/2023/08/2560px-Apple_Pay_logo.svg.png"
                  alt="Apple Pay"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  alt="MasterCard"
                />
                <img
                  src="https://canhme.com/wp-content/uploads/2016/01/Paypal.png"
                  alt="PayPal"
                />
                <img
                  src="https://banner2.cleanpng.com/20180920/zxf/kisspng-wikipedia-logo-visa-vector-graphics-credit-card-african-savannah-holidays-for-best-safari-and-be-1713938280102.webp"
                  alt="Visa"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details element wrap */}
      <div className="details-element-wrap">
        <TabDetails />
      </div>

      <div className="details-product-more">
        <h1 style={{ marginBottom: "50px" }}>Các sản phẩm khác</h1>
        <CardComponent />
      </div>
    </div>
  );
}

export default ProductDetail;
