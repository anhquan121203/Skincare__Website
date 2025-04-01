import React, { useState } from "react";
import { Input, Pagination, Button, Popconfirm, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useOrder from "../../../Hooks/useOrder";
import ModalUpdateOrder from "./ManagerUpdateOrder/ManagerUpdateOrder";

function ManagerOrder() {
  const {orders, loading, error, editOrder} =useOrder();

//   // Modal add new question
//   const [isNewQuestionModal, setIsNewQuestionModal] = useState(false);
  const [selectOrder, setSelectOrder] = useState(null);

//   //Modal update question
  const [isUpdateOrderModal, setIsUpdateOrderModal] = useState(false);  

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

//   // Open Update Modal
  const openUpdateOrder = (order) => {
    setSelectOrder(order);
    setIsUpdateOrderModal(true);
  };

  const handleUpdateOrder = (orderData) => {
    if (!orderData) {
      toast.error("Không tìm thấy câu hỏi để cập nhật!");
      return;
    }
    const updatedOrder = { ...orderData, id: orderData.id };

    editOrder(updatedOrder);
    setIsUpdateOrderModal(false);
  };


  if (loading) return <p>Loading skin question...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedOrder = orders.slice(
    startIndex,
    startIndex + pageSize
  );

    // const activeSkinQuestions = skinQuestion.filter(
    //   (item) => item.skinQuestionStatus === "Active"
    // );
    // const paginatedSkinQuestion = activeSkinQuestions.slice(
    //   startIndex,
    //   startIndex + pageSize
    // );

  return (
    <div className="managerSkinQuestion-container">
      <h1>Quản lý Order</h1>
      <div className="content-manager-skinQuestion">
       

        <div className="table-skinQuestion-container">
          <table className="table-skinQuestion">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày order</th>
                <th>Tổng tiền</th>
                <th>Trạng thái order</th>
                <th>Người dùng</th>
                <th>Người quản lý</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrder.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.orderDate}</td>
                  <td>{item.totalPrice}</td>
                  <td>{item.orderStatus}</td>
                  <td>{item.customerName}</td>
                  <td>{item.staffName}</td>

                  <td>
                    <Button
                      className="btn-updateSkinType"
                      onClick={() => openUpdateOrder(item)}
                    >
                      Cập nhật
                    </Button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={orders.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>


      <ModalUpdateOrder
        isModalOpen={isUpdateOrderModal}
        handleCancel={() => setIsUpdateOrderModal(false)} // Fix
        handleUpdate={handleUpdateOrder}
        updateOrder={selectOrder}
      /> 

    </div>
  );
}

export default ManagerOrder;
