import React, { useState } from "react";
import { Input, Pagination, Button, Popconfirm, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import useStepRoutine from "../../../Hooks/useStepRoutine";
import ModalAddStepRoutine from "./ModalAddStepRoutine/ModalAddStepRoutine";

function ManagerStepRoutine() {
  const {
    stepRoutines,
    loading,
    error,
    addNewStepRoutine,
    checkStepOfRoutine,
  } = useStepRoutine();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const [isNewStepRoutineModal, setIsNewStepRoutineModal] = useState(false);
  const [selectStepRoutine, setSelectStepRoutine] = useState(null);

  // //Modal update question
  // const [isUpdateAnswerModal, setIsUpdateAnswerModal] = useState(false);

  // Modal add step
  const openAddStepRoutineModal = () => {
    setIsNewStepRoutineModal(true);
    setSelectStepRoutine(null);
  };

  const handleAddStepRoutine = async (stepRoutineData) => {
    try {

      const stepExist = await checkStepOfRoutine(stepRoutineData.stepNumber, stepRoutineData.routineId);
      if (stepExist) {
        toast.error(
          "Bước này đã tồn tại trong routine này. Vui lòng nhập bước khác!"
        );
        return;
      }

      await addNewStepRoutine(stepRoutineData);
      setIsNewStepRoutineModal(false);
    } catch (error) {
      toast.error("Thêm câu hỏi thất bại! Vui lòng thử lại.");
      console.error("Error adding question:", error);
    }
  };

  // // Open Update Modal
  // const openUpdateAnswerModal = (answer) => {
  //   setSelectAnswer(answer);
  //   setIsUpdateAnswerModal(true);
  // };

  // const handleUpdateAnswer = (answerData) => {
  //   if (!selectAnswer) {
  //     toast.error("Không tìm thấy câu hỏi để cập nhật!");
  //     return;
  //   }
  //   const updatedAnswer = { ...answerData, id: selectAnswer.id };

  //   editSkinAnswer(updatedAnswer); // Ensure the correct format
  //   // toast.success("Cập nhật câu trả lời thành công!");
  //   setIsUpdateAnswerModal(false);
  // };

  // const handleDeleteSkinAnswer = (id) => {
  //   if (id) {
  //     removeSkinAnswer(id);
  //     toast.success("Xóa câu trả lời thành công!");
  //   } else {
  //     toast.error("Xóa câu trả lời thất bại! Vui lòng thử lại.");
  //   }
  // };

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedSkinAnswer = stepRoutines.slice(
    startIndex,
    startIndex + pageSize
  );

  if (loading) return <p>Loading skin question...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="managerSkinAnswer-container">
      <h1>Quản lý các bước chăm sóc</h1>
      <div className="content-manager-skinAnswer">
        <div className="header-manager-skinAnswer">
          <Button
            className="btn-addSkinAnswer"
            onClick={openAddStepRoutineModal}
          >
            <FaPlus style={{ marginRight: "8px" }} /> Tạo các bước chăm sóc
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
                <th>Bước số</th>
                <th>Mô tả bước</th>
                <th>Tên routine</th>
                <th>Id sản phẩm</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSkinAnswer.map((item, index) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.stepNumber}</td>
                  <td>{item.stepDescription}</td>
                  <td>{item.routineName}</td>
                  <td>{item.productId}</td>
                  <td>
                    <span className={`status-${item.status.toLowerCase()}`}>
                      {item.status === "Active" ? "Active" : "Inactive"}
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
          total={stepRoutines.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      <ModalAddStepRoutine
        isModalOpen={isNewStepRoutineModal}
        handleCancel={() => setIsNewStepRoutineModal(false)}
        handleAdd={handleAddStepRoutine}
        checkStepOfRoutine={checkStepOfRoutine}
      />

      {/* <ModalUpdateSkinAnswer
        isModalOpen={isUpdateAnswerModal}
        handleCancel={() => setIsUpdateAnswerModal(false)} // Fix
        handleUpdate={handleUpdateAnswer}
        updateAnswer={selectAnswer}
      /> */}
    </div>
  );
}

export default ManagerStepRoutine;
