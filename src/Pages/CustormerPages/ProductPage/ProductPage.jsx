import React from 'react';
import "./ProductPage.css"
import banner from "../../../assets/images/footer.jpg"
import { Card, Col, Rate, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import FilterProduct from '../../../Components/FilterProduct/FilterProduct';

function ProductPage() {
  const products = [
    {
      name: "Detangling Hair Spray",
      rating: 4,
      price: "$5.00 - $10.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-2.1.webp",
    },
    {
      name: "Anti-Aging Face Cream",
      rating: 4,
      price: "$5.00 - $10.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-16.1.webp",
    },
    {
      name: "Moisturizing Curl Activator Cream",
      rating: 5,
      price: "$11.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-5.1.webp",
    },

    {
      name: "Detangling Hair Spray",
      rating: 4,
      price: "$5.00 - $10.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-2.1.webp",
    },
    {
      name: "Anti-Aging Face Cream",
      rating: 4,
      price: "$5.00 - $10.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/06/shop-16.1.webp",
    },
    {
      name: "Moisturizing Curl Activator Cream",
      rating: 5,
      price: "$11.00",
      image: "https://wdtlilac.wpengine.com/wp-content/uploads/2023/01/shop-5.1.webp",
    },
  ];
  return (
    <div className='product-page'>

      <div className="background-animation">

      </div>

      {/* ALL PRODUCT */}
      <div className="product-content">


        {/* Header */}

        <div className="applied-filters">
          <span>Selected Filtre</span>
          <span>Selected Filtre</span>
        </div>
        <div className="view-options">
          <button>Grid view</button>
          <button>List view</button>
          <span>428 Products</span>
        </div>

        <div className="main-content">
          {/* filter */}
          <div className='filter'>
            <FilterProduct />
          </div>


          {/* Product */}
          <section className="products">
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Cucumber image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Carrot image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Tomato image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Grapes image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Cucumber image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
            <div className="product-card">
              <img src="https://placehold.co/200x150" alt="Watermelon image" />
              <h3>Product title</h3>
              <p>Space for small product description</p>
              <div className="stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star inactive"></i>
                <i className="fas fa-star inactive"></i>
              </div>
              <div className="price-buy">
                <span>36.99 USD</span>
                <button>Buy now</button>
              </div>
              <p className="old-price">48.56</p>
            </div>
          </section>
        </div>
      </div>

    </div>
  )
}

export default ProductPage;
