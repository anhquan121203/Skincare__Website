import React, { useState } from "react";
import "./ManagerSkinQuestion.css";
import { Input, Pagination, Button, Popconfirm } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinQuestion from "../../../Hooks/useSkinQuestion";
import { toast } from "react-toastify";
import ModalAddQuestion from "./ModalAddQuestion/ModalAddQuestion";

function ManagerSkinQuestion() {
  const { skinQuestion, loading, error, addNewSkinQuestion } =
    useSkinQuestion();
  const [isNewQuestionModal, setIsNewQuestionModal] = useState(false);
  const [selectQuestion, setSelectQuestion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const openAddQuestionModal = () => {
    setIsNewQuestionModal(true);
    setSelectQuestion(null);
  };

  const handleAddQuestion = async (questionData) => {
    try {
      await addNewSkinQuestion(questionData);
      toast.success("Thêm câu hỏi thành công!");
      setIsNewQuestionModal(false);
    } catch (error) {
      toast.error("Thêm câu hỏi thất bại! Vui lòng thử lại.");
      console.error("Error adding question:", error);
    }
  };

  if (loading) return <p>Loading skin question...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkinQuestion = skinQuestion.slice(
    startIndex,
    startIndex + pageSize
  );

  //   const activeSkinQuestions = skinQuestion.filter(
  //     (item) => item.skinQuestionStatus === "Active"
  //   );
  //   const paginatedSkinQuestion = activeSkinQuestions.slice(
  //     startIndex,
  //     startIndex + pageSize
  //   );

  return (
    <div className="managerSkinQuestion-container">
      <h1>Quản lý câu hỏi</h1>
      <div className="content-manager-skinQuestion">
        <div className="header-manager-skinQuestion">
          <Button
            className="btn-addSkinQuestion"
            onClick={openAddQuestionModal}
          >
            <FaPlus style={{ marginRight: "8px" }} /> Tạo câu hỏi
          </Button>
          <div className="search-skinQuestion">
            <Input.Search
              placeholder="Search skin Question..."
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-skinQuestion-container">
          <table className="table-skinQuestion">
            <thead>
              <tr>
                <th>ID</th>
                <th>Câu hỏi</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSkinQuestion.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.questionText}</td>
                  <td>
                    <span
                      className={`status-${item.skinQuestionStatus.toLowerCase()}`}
                    >
                      {item.skinQuestionStatus === "Active"
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <Button
                      className="btn-updateSkinType"
                      //   onClick={() => showEditModal(item)}
                    >
                      Cập nhật
                    </Button>
                    <Popconfirm
                      title="Xóa loại da"
                      description="Bạn muốn xóa loại da này?"
                      //   onConfirm={() => handleDeleteSkinType(item.id)}
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
          total={skinQuestion.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      <ModalAddQuestion
        isModalOpen={isNewQuestionModal}
        handleCancel={() => setIsNewQuestionModal(false)}
        handleAdd={handleAddQuestion}
      />
    </div>
  );
}

export default ManagerSkinQuestion;
