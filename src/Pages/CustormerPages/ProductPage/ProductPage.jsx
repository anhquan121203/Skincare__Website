import React from 'react';
import "./ProductPage.css"
import banner from "../../../assets/images/footer.jpg"

function ProductPage() {
  return (
    <div className='productPage'>
      <div className="background-animation">
        <section className="custom-section">
          {/* <img
            className="background-image"
            src={banner}
            alt="Background"
          /> */}
          <div className="overlay-content-background">
            <h1 className="title-background">Tất cả sản phẩm</h1>
            <div className="breadcrumb">
              <span className="breadcrumb-item">
                <a href="/" className="breadcrumb-link">
                  Trang chủ
                </a>
              </span>
              <span className="breadcrumb-separator"> &gt; </span>
              <span className="breadcrumb-item">
                <a href="/product" className="breadcrumb-link-active">
                  Sản phẩm
                </a>
              </span>
            </div>
          </div>
          
        </section>
      </div>
    </div>
  )
}

export default ProductPage;
