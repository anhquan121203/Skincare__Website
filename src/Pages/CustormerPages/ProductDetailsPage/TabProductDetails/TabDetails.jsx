import React, { useState } from "react";
import "./TabDetails.css";
import TextArea from "antd/es/input/TextArea";
import useComment from "../../../../Hooks/useComment";
import { InputNumber } from "antd";
import useAuth from "../../../../Hooks/useAuth"; 
import { toast } from "react-toastify";

function TabDetails({ productId }) {
  const [activeTab, setActiveTab] = useState("additional");
  const { comments, loading, error, addNewComment } = useComment(productId);
  const { userId, firstName, lastName } = useAuth(); 
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddComment = () => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung!")
      return;
    }

    const newComment = {
      content,
      rating,
      productId,
      customerId: userId,
    };

    addNewComment(newComment); // Pass the full object
    setContent(""); // Clear input
    setRating(0); // Reset rating
  };

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
          Đánh giá ({comments.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "reviews" && (
          <div className="tab-review">
            {/* ADD REVIEW */}
            <div className="add-review">
              <h1>Thêm đánh giá</h1>
              <h6>Đánh giá</h6>
              <InputNumber
                min={1}
                max={5}
                value={rating}
                onChange={(value) => setRating(value)}
              />
              <TextArea
                className="review-area"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Viết đánh giá của bạn..."
                autoSize={{
                  minRows: 3,
                  maxRows: 3,
                }}
              />
              <button onClick={handleAddComment} className="btn-review">
                Đánh giá
              </button>
            </div>

            {/* Display Comments */}
            <div className="area-user-review">
              {loading && <p>Loading comments...</p>}
              {error && <p>Error: {error}</p>}
              {comments.length > 0 ? (
                comments.slice(0, 7).map((item, index) => (
                  <div key={index}>
                    
                    <span>{firstName}</span>
                    <span>{item.content}</span>
                    <hr />
                  </div>
                ))
              ) : (
                <p>No comments available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabDetails;
