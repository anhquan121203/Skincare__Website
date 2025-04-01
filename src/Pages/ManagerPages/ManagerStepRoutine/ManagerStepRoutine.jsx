import React, { useState } from "react";
import { Input, Pagination, Button, Popconfirm, Modal } from "antd";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ManagerStepRoutine.css"
import useStepRoutine from "../../../Hooks/useStepRoutine";
import ModalAddStepRoutine from "./ModalAddStepRoutine/ModalAddStepRoutine";
import ModalUpdateStepRoutine from "./ModalUpdateStepRoutine/ModalUpdateStepRoutine";

function ManagerStepRoutine() {
  const {
    stepRoutines,
    loading,
    error,
    addNewStepRoutine,
    checkStepOfRoutine,
    editStepRoutine,
    removeStepRoutine
  } = useStepRoutine();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isNewStepRoutineModal, setIsNewStepRoutineModal] = useState(false);
  const [selectStepRoutine, setSelectStepRoutine] = useState(null);

  // //Modal update question
  const [isUpdateStepRoutineModal, setIsUpdateStepRoutineModal] = useState(false);

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
 

  // Open Update Modal
  const openUpdateAnswerModal = (step) => {
    setSelectStepRoutine(step);
    setIsUpdateStepRoutineModal(true);
  };

  const handleUpdateStepRoutine = (stepData) => {
    if (!selectStepRoutine) {
      toast.error("Không tìm thấy câu hỏi để cập nhật!");
      return;
    }
    const updatedStep = { ...stepData, id: selectStepRoutine.id };

    editStepRoutine(updatedStep); // Ensure the correct format
    // toast.success("Cập nhật câu trả lời thành công!");
    setIsUpdateStepRoutineModal(false);
  };

  const handleDeleteStepRoutine = (id) => {
    if (id) {
      removeStepRoutine(id);
      toast.success("Xóa thành công!");
    } else {
      toast.error("Xóa thất bại! Vui lòng thử lại.");
    }
  };

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
                <th style={{ width: "450px" }}>Mô tả bước</th>
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
                    <span className={`status-${item.status?.toLowerCase()}`}>
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
                      title="Xóa bước routine?"
                      description="Bạn muốn xóa không?"
                      onConfirm={() => handleDeleteStepRoutine(item.id)}
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

      <ModalUpdateStepRoutine
        isModalOpen={isUpdateStepRoutineModal}
        handleCancel={() => setIsUpdateStepRoutineModal(false)}
        handleUpdate={handleUpdateStepRoutine}
        updateStep={selectStepRoutine}
      />
    </div>
  );
}

export default ManagerStepRoutine;
