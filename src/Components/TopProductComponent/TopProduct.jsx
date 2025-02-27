import React, { useEffect, useState } from "react";
import "./TopProduct.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";

function TopProduct() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [topProducts, setTopProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(
                    "https://664dc6deede9a2b55654d26f.mockapi.io/project/QuanSE172057"
                );
                const topProducts = response.data
                .sort((a, b) => b.price - a.price)
                .slice(0, 4);
                setProducts(topProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);


    return (
        <div className="card-container">
            <div className="card-grid">
                {products.map((item, index) => (
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
                                    <button className="addToCard">Thêm giỏ hàng <BsCart4 /></button>
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
