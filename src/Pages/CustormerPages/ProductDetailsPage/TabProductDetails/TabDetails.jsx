import React, { useState } from "react";
import "./TabDetails.css";
import TextArea from "antd/es/input/TextArea";
import useComment from "../../../../Hooks/useComment";
import { Button, Card, InputNumber, Modal, Pagination, Rate } from "antd";
import useAuth from "../../../../Hooks/useAuth";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDelete, MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditFill } from "react-icons/ri";

function TabDetails({ productId, product }) {
  const [activeTab, setActiveTab] = useState("additional");
  const { comments, loading, error, addNewComment, deleteComment } =
    useComment(productId);
  const { userId } = useAuth();
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [commentDelete, setCommentDelte] = useState(null);

  const openDeleteModal = () => {
    setCommentDelte(comments);
    setIsDeleteModal(true);
  };

  const handleDeleteComment = () => {
    if (commentDelete) {
      deleteComment(commentDelete.id);
      setIsDeleteModal(false);
      toast.success("Xóa đánh giá thành công!");
    } else {
      toast.error("Xóa không thành công");
    }
  };

  // const product = product.find((p) => p.id === productId);

  if (!product) return <p>Sản phẩm không tồn tại!</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedComment = comments?.length ? comments.slice(startIndex, startIndex + pageSize) : [];

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddComment = () => {
    if (!content.trim()) {
      toast.error("Vui lòng nhập nội dung!");
      return;
    }

    const newComment = {
      content,
      rating,
      productId,
      customerId: userId,
    };

    addNewComment(newComment);
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
          Đánh giá ({comments?.length})
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* TAB INFORMATION */}
        {activeTab === "information" && (
          <div className="information-container">
            <p style={{ fontWeight: "bold", fontSize: "25px" }}>
              {product.productName}
            </p>
            <p style={{ marginBottom: "30px" }}>{product.description}</p>

            <table className="info-table">
              <tbody>
                <tr>
                  <td className="label">Giá tiền</td>
                  <td style={{ color: "red" }}>
                    {product.price.toLocaleString("vi-VN")} VND
                  </td>
                </tr>
                <tr>
                  <td className="label">Loại sản phẩm</td>
                  <td>{product.categoryName}</td>
                </tr>
                <tr>
                  <td className="label">Loại da</td>
                  <td>{product.skinTypeName}</td>
                </tr>
                <tr>
                  <td className="label">Số lượng</td>
                  <td>{product.quantity} sản phẩm</td>
                </tr>
                <tr>
                  <td className="label">Ngày sản xuất</td>
                  <td>{product.createdDate}</td>
                </tr>
                <tr>
                  <td className="label">Ngày hết hạn</td>
                  <td>{product.expiredDate}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* TAB REVIEW */}
        {activeTab === "reviews" && (
          <div className="tab-review">
            {/* ADD REVIEW */}
            <div className="add-review">
              <h1>Thêm đánh giá</h1>
              <h6>Đánh giá</h6>

              <Rate
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
            <hr />
            {/* Display Comments */}
            <div className="area-user-review">
              {loading && <p>Loading comments...</p>}
              {error && <p>Error: {error}</p>}

              {/* {paginatedComment.map((item, index) => (
                <div key={index}>
                  <Card
                    title={item.firstName} 
                    
                    variant="borderless"
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <Rate value={item.rating} disabled />
                    <p>{item.content}</p>
                  </Card>
                </div>
              ))} */}

              {Array.isArray(paginatedComment) && paginatedComment.length > 0 ? (
                paginatedComment.map((item, index) => (
                  <Card
                    key={index}
                    title={item.firstName}
                    // extra={
                    //   <div className="btn-card-comment">
                    //     <Button
                    //       className="btn-comment"
                    //       color="cyan"
                    //       variant="solid"
                    //     >
                    //       <RiEditFill />
                    //     </Button>
                    //     <Button onClick={() => openDeleteModal(item)} color="danger" variant="solid">
                    //       <MdDelete />
                    //     </Button>
                    //   </div>
                    // }
                    variant="borderless"
                    style={{
                      width: "100%",
                      marginBottom: "20px",
                    }}
                  >
                    <Rate value={item.rating} disabled />
                    <p>{item.content}</p>
                  </Card>
                ))
              ) : (
                <p>Chưa có đánh giá nào.</p>
              )}

              {comments?.length > pageSize && (
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={comments.length}
                  onChange={(page) => setCurrentPage(page)}
                  style={{ marginTop: "16px", textAlign: "center" }}
                />
              )}

            </div>

            <Modal
              title="Xác nhận xóa đánh giá"
              open={isDeleteModal}
              onOk={handleDeleteComment}
              onCancel={() => setIsDeleteModal(false)}
              okText="Xóa"
              cancelText="Hủy">
              <p>Bạn có chắc chắn muốn xóa đánh giá không?</p>
            </Modal>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabDetails;
