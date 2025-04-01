import React, { useState } from "react";
import "./ManagerAccount.css";
import { Input, Pagination, Button, Popconfirm, Switch } from "antd";
import { FaPlus } from "react-icons/fa";
import useSkinType from "../../../Hooks/useSkinType";
// import ModalSkinTypes from "./ModalNewSkinType/ModalSkinType";
import { toast } from "react-toastify";
import useAccount from "../../../Hooks/useAccount";
import ModalAccountStaff from "./ModalAccountStaff/ModalAccountStaff";

function ManagerAccount() {
  const { account, loading, error, addNewStaff, checkEmailExists } =
    useAccount();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [editCreateStaff, setEditCreateStaff] = useState(null);

  const onChange = account.filter((acc) => acc.status === true ? "Active" : "Inactive")

  if (loading) return <p>Loading skin types...</p>;
  if (error) return <p>Error: {error}</p>;

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedAccount = account.slice(startIndex, startIndex + pageSize);

  const openAddStaffModal = () => {
    setEditCreateStaff(null);
    setIsStaffModalOpen(true);
  };

  const handleAddStaff = async (accountData) => {
    try {
      // Check email when create account staff
      const emailExists = await checkEmailExists(accountData.email);
      if (emailExists) {
        toast.error("Email đã tồn tại. Vui lòng nhập email khác!");
        return;
      }

      // Add new staff
      await addNewStaff(accountData);
      setIsStaffModalOpen(false);
    } catch (error) {
      toast.error("Lỗi khi tạo tài khoản staff!");
      console.error("Error:", error);
    }
  };

  return (
    <div className="account-container">
      {/* {account.length} */}
      <h1>Quản lý tài khoản</h1>
      <div className="content-account">
        <div className="header-account">
          <Button className="btn-addAccount" onClick={openAddStaffModal}>
            <FaPlus style={{ marginRight: "8px" }} /> Tạo tài khoản staff
          </Button>
          <div className="search-account">
            <Input.Search
              placeholder="Search account..."
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-account-container">
          <table className="table-account">
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
                  <td>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "15px",
                        objectFit: "cover",
                      }}
                      src={item.avatar}
                      alt=""
                    />
                  </td>
                  <td>{item.roleName}</td>
                  <td>
                  <Switch defaultChecked onChange={onChange} />
                  </td>
                  <td>
                    <Button
                      className="btn-updateAccount"
                      onClick={() => showEditModal(item)}
                    >
                      Cập nhật
                    </Button>
                    <Popconfirm
                      title="Xóa tài khoản!"
                      description="Bạn có muốn xóa tài khoản này?"
                      onConfirm={() => handleDeleteSkinType(item.id)}
                    >
                      <Button className="btn-removeAccount">Xóa</Button>
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

      <ModalAccountStaff
        isModalOpen={isStaffModalOpen}
        handleCancel={() => setIsStaffModalOpen(false)}
        handleAdd={handleAddStaff}
        checkEmailExists={checkEmailExists}
      />
    </div>
  );
}

export default ManagerAccount;
