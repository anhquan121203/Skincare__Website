import React, { useState } from "react";
import "./TabDetails.css";
import TextArea from "antd/es/input/TextArea";
import useComment from "../../../../Hooks/useComment";
import { useParams } from "react-router-dom";

function TabDetails() {
  const [activeTab, setActiveTab] = useState("additional");
  const { productId } = useParams();
  const { comments, loading, error } = useComment(productId);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="tabs-container">
      {/* Tab Headers */}
      <div className="tabs-details">
        <button
          className={activeTab === "information" ? "tab active" : "tab"}
          onClick={() => setActiveTab("information")}
        >
          Thông tin sản phẩm
        </button>

        <button
          className={activeTab === "reviews" ? "tab active" : "tab"}
          onClick={() => setActiveTab("reviews")}
        >
          Đánh giá (1)
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "information" && (
          <div>
            <p style={{ marginBottom: "30px" }}>
              Description Additional information Reviews Praesent vestibulum
              tellus a dolor consectetur, et condimentum tellus iaculis. In
              finibus euismod lorem, vitae faucibus sem hendrerit id. Duis
              porta, risus eu eleifend euismod, metus leo finibus ex, ut dictum
              justo arcu sed mi. Nulla blandit purus vitae quam tincidunt, eu
              ullamcorper velit laoreet. Morbi nec aliquam elit, vitae
              vestibulum lacus. Vestibulum a dignissim nunc. Ut erat ante,
              scelerisque non diam quis, posuere sodales felis. Sed consequat
              aliquam felis eget tincidunt. Nunc dapibus, dui in hendrerit
              ullamcorper, quam tortor convallis erat, vel volutpat nibh eros in
              dolor. Ut id gravida ipsum. Nullam mollis neque ac lobortis
              pretium. Vestibulum ante ipsum primis in faucibus orci luctus et
              ultrices posuere cubilia curae; Ut dolor mi, tempor non fringilla
              porttitor, pellentesque in nibh. Nulla non elit odio.
            </p>

            <table className="info-table">
              <tbody>
                <tr>
                  <td className="label">Weight</td>
                  <td>0.5 g</td>
                </tr>
                <tr>
                  <td className="label">Dimensions</td>
                  <td>24 × 1 × 2 cm</td>
                </tr>
                <tr>
                  <td className="label">Net Quantity</td>
                  <td>0.5gm, 1.5gm, 1gm, 2.5gm, 2gm, 3gm</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="tab-review">

            {/* ADD REVIEW */}
            <div className="add-review">
              <h1>Thêm đánh giá</h1>
              <h6>Đánh giá</h6>
              <TextArea
                className="review-area"
                // value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Viết đánh giá của bạn..."
                autoSize={{
                  minRows: 3,
                  maxRows: 3,
                }}
              />
              <button className="btn-review">Đánh giá</button>
            </div>

            <div className="area-user-review">
              {comments.slice(0, 7).map((item, index) => (
                <div key={index}>
                  <span>{item.firstName}</span>
                  <span>{item.content}</span>
                  <hr />
                </div>
              
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default TabDetails;
