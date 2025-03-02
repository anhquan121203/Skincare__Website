import React from "react";
import "./ManagerProduct.css";
import { Input } from "antd";
import { FaPlus } from "react-icons/fa";
import useProduct from "../../../Hooks/useProduct";
import { ImTelegram } from "react-icons/im";

function ManagerProduct() {
  const { products, loading, error } = useProduct();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="managerProduct-container">
      <h1>Manager Product</h1>

      <div className="content-manager-product">
        <div className="header-manager-product">
          <button className="btn-addProduct">
            {" "}
            <FaPlus style={{ marginRight: "8px" }} />
            Add new products
          </button>

          <div className="search-product">
            <Input.Search
              placeholder="Tìm kiếm sản phẩm..."
              // onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
        </div>

        <div className="table-product-container">
          {products.map((item, index) => (
            <table className="table-product" key={index}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Giá tiền (VND)</th>
                  <th>Số lượng</th>
                  <th>Hình ảnh</th>
                  <th>Loại sản phẩm</th>
                  <th>Loại Skin</th>
                  <th>Trạng thái</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{item.productName}</td>
                  <td style={{ width: "200px" }}>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={item.image}
                      alt={item.productName}
                    />
                  </td>
                  <td>{item.categoryName}</td>
                  <td>{item.skinTypeName}</td>
                  <td>
                    <span class="status-active">{item.productStatus}</span>
                  </td>
                  <td className="action-btnPro">
                    <button className="btn-updatePro">Cập nhật</button>
                    <button className="btn-removePro">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManagerProduct;
