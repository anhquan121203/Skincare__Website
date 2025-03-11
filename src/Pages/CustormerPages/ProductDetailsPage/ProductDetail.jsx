import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import TabDetails from "./TabProductDetails/TabDetails";
import { TiShoppingCart } from "react-icons/ti";
import { MdPayment } from "react-icons/md";
import useCart from "../../../Hooks/useCart";
import { useDispatch } from "react-redux";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const { addToCartfromProduct } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    addToCartfromProduct(id, quantity);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7088/api/product/getProductById/${id}`
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
              style={{}}
              src={product.image}
              alt={product.name}
            />
          </div>

          {/* Details Form right */}
          <div className="details-form-right">
            <h2 className="details-title">{product.productName}</h2>
            <p className="details-price">{product.price} VNĐ</p>
            <p className="details-rating">
              <div className="category-details">
                <div className="details-cateName">{product.categoryName}</div>
                <div className="details-skinType">{product.skinTypeName}</div>
              </div>
            </p>
            <p className="details-description">{product.description}</p>

            <div className="add-to-card-details">
              <input
                className="details-quantity"
                min={1}
                max={100}
                type="number"
                defaultValue={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <button className="btn-details" type="submit" onClick={addToCart}>
                Thêm giỏ hàng <TiShoppingCart />
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
        <TabDetails productId={id} />
      </div>

      <div className="details-product-more">
        <h1 style={{ marginBottom: "50px" }}>Các sản phẩm khác</h1>
        {/* <CardComponent /> */}
      </div>
    </div>
  );
}

export default ProductDetail;
