import React, { useState } from "react";
import "./ManagerSkinAnswer.css";
import { Input, Pagination, Button, Popconfirm, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinAnswer from "../../../Hooks/useSkinAnswer";
import ModalAddAnswer from "./ModalAddSkinAnswer/ModalAddAnswer";
import ModalUpdateSkinAnswer from "./ModalUpdateSkinAnswer/ModalUpdateSkinAnswer";
import { toast } from "react-toastify";

function ManagerSkinAnswer() {
  const {
    skinAnswer,
    loading,
    error,
    addNewSkinAnswer,
    editSkinAnswer,
    removeSkinAnswer,
  } = useSkinAnswer();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const [isNewAnswerModal, setIsNewAnswerModal] = useState(false);
  const [selectAnswer, setSelectAnswer] = useState(null);

  //Modal update question
  const [isUpdateAnswerModal, setIsUpdateAnswerModal] = useState(false);

  const openAddAnswerModal = () => {
    setIsNewAnswerModal(true);
    setSelectAnswer(null);
  };

  const handleAddAnswer = async (answerData) => {
    try {
      await addNewSkinAnswer(answerData);
      toast.success("Thêm câu hỏi thành công!");
      setIsNewAnswerModal(false);
    } catch (error) {
      toast.error("Thêm câu hỏi thất bại! Vui lòng thử lại.");
      console.error("Error adding question:", error);
    }
  };

  // Open Update Modal
  const openUpdateAnswerModal = (answer) => {
    setSelectAnswer(answer);
    setIsUpdateAnswerModal(true);
  };

  const handleUpdateAnswer = (answerData) => {
    if (!selectAnswer) {
      toast.error("Không tìm thấy câu hỏi để cập nhật!");
      return;
    }
    const updatedAnswer = { ...answerData, id: selectAnswer.id };

    editSkinAnswer(updatedAnswer); // Ensure the correct format
    // toast.success("Cập nhật câu trả lời thành công!");
    setIsUpdateAnswerModal(false);
  };

  const handleDeleteSkinAnswer = (id) => {
    if (id) {
      removeSkinAnswer(id);
      toast.success("Xóa câu trả lời thành công!");
    } else {
      toast.error("Xóa câu trả lời thất bại! Vui lòng thử lại.");
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkinAnswer = skinAnswer.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading) return <p>Loading skin question...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="managerSkinAnswer-container">
      <h1>Quản lý câu trả lời</h1>
      <div className="content-manager-skinAnswer">
        <div className="header-manager-skinAnswer">
          <Button className="btn-addSkinAnswer" onClick={openAddAnswerModal}>
            <FaPlus style={{ marginRight: "8px" }} /> Tạo câu trả lời mới
          </Button>
          <div className="search-skinAnswer">
            <Input.Search
              placeholder="Search skin Answer..."
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-skinAnswer-container">
          <table className="table-skinAnswer">
            <thead>
              <tr>
                <th>ID</th>
                <th>Câu trả lời</th>
                <th>Câu hỏi</th>
                <th>Loại da</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSkinAnswer.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.answerText}</td>
                  <td>{item.questionText}</td>
                  <td>{item.skinTypeName}</td>
                  <td>
                    <span
                      className={`status-${item.skinAnswerStatus.toLowerCase()}`}
                    >
                      {item.skinAnswerStatus === "Active"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <Button
                      className="btn-updateSkinType"
                      onClick={() => openUpdateAnswerModal(item)}
                    >
                      Cập nhật
                    </Button>
                    <Popconfirm
                      title="Xóa câu trả lời?"
                      description="Bạn muốn xóa câu trả lời này không?"
                      onConfirm={() => handleDeleteSkinAnswer(item.id)}
                    >
                      <Button className="btn-removeSkinType">Xóa</Button>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={skinAnswer.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      <ModalAddAnswer
        isModalOpen={isNewAnswerModal}
        handleCancel={() => setIsNewAnswerModal(false)}
        handleAdd={handleAddAnswer}
      />

      <ModalUpdateSkinAnswer
        isModalOpen={isUpdateAnswerModal}
        handleCancel={() => setIsUpdateAnswerModal(false)} // Fix
        handleUpdate={handleUpdateAnswer}
        updateAnswer={selectAnswer}
      />

    </div>
  );
}

export default ManagerSkinAnswer;
