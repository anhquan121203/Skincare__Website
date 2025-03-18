import React, { useState } from "react";
import "./ManagerAccount.css";
import { Input, Pagination, Button, Popconfirm } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinType from "../../../Hooks/useSkinType";
// import ModalSkinTypes from "./ModalNewSkinType/ModalSkinType";
import { toast } from "react-toastify";
import useAccount from "../../../Hooks/useAccount";

function ManagerAccount() {

  const {account, loading, error} = useAccount();

  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkintype, setEditingSkintype] = useState(null);
  const pageSize = 5;


  if (loading) return <p>Loading skin types...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAccount = account.slice(startIndex, startIndex + pageSize);
  

  return (
    <div className="managerSkinType-container">
      {/* {account.length} */}
      <h1>Quản lý tài khoản</h1>
      <div className="content-manager-skinType">
        <div className="header-manager-skinType">
          <Button className="btn-addSkinType">
            <FaPlus style={{ marginRight: "8px" }} /> Tạo tài khoản staff
          </Button>
          <div className="search-skinType">
            <Input.Search
              placeholder="Search skin type..."
              style={{ width: 200 }}
            />
          </div>
        </div>
    

        <div className="table-skinType-container">
          <table className="table-skinType">
            <thead>
              <tr>
              <th>STT</th>
                <th>Tên</th>
                <th>Họ</th>
                <th>Địa chỉ</th>
                <th>Ngày sinh</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ảnh</th>
                <th>Vai trò</th>

                <th>Trạng thái</th>
                <th>Hành động</th>
                
              </tr>
            </thead>
            <tbody>
              {paginatedAccount.map((item, index) => (
                <tr key={item.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>{item.birthday}</td>
                  <td>{item.email}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.avatar}</td>
                  <td>{item.roleName}</td>
                  <td>
                    <span className="status-active">{item.skinTypeStatus}</span>
                  </td>
                  <td>
                    <Button
                      className="btn-updateSkinType"
                      onClick={() => showEditModal(item)}
                    >
                      Cập nhật
                    </Button>
                    <Popconfirm
                      title="Xóa loại da"
                      description="Bạn muốn xóa loại da này?"
                      onConfirm={() => handleDeleteSkinType(item.id)}
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
          total={account.length}
          onChange={(page) => setCurrentPage(page)}
          style={{ marginTop: "16px", textAlign: "center" }}
        />
      </div>

      {/* <ModalSkinTypes
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
        editingSkintype={editingSkintype} 
      /> */}
    </div>
  );
}

export default ManagerAccount;
