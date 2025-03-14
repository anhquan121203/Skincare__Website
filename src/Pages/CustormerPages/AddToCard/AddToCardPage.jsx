import React, { useState } from "react";
import { Checkbox, Button, Table, Card, Image, Typography, Modal } from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import "./AddToCardPage.css";
import { Link } from "react-router-dom";
import useCart from "../../../Hooks/useCart";

const { Text, Title } = Typography;
const { confirm } = Modal;

const AddToCardPage = () => {
  const { carts, loading, error, deleteCart } = useCart();
  const [selectedProducts, setSelectedProducts] = useState([]);

  // const selectAll =
  //   selectedProducts.length === carts?.length && carts?.length > 0;

  // const toggleSelectProduct = (id) => {
  //   setSelectedProducts((prevSelected) =>
  //     prevSelected.includes(id)
  //       ? prevSelected.filter((productId) => productId !== id)
  //       : [...prevSelected, id]
  //   );
  // };

  // const toggleSelectAll = () => {
  //   setSelectedProducts(selectAll ? [] : carts.map((product) => product.id));
  // };

  const updateQuantity = (id, delta) => {
    if (!selectedProducts.includes(id)) return;
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(1, product.quantity + delta) }
          : product
      )
    );
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Xác nhận xóa sản phẩm?",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk() {
        removeProduct(id);
      },
    });
  };

  console.log(carts);

  const removeProduct = (id) => {
    deleteCart(id);
    // setSelectedProducts((prevSelected) =>
    //   prevSelected.filter((productId) => productId !== id)
    // );
  };

  const totalPrice = carts.reduce((sum, p) => sum + p.price * p.quantity, 0);
  // const showDeleteSelectedConfirm = () => {
  //   confirm({
  //     title: "Xác nhận xóa sản phẩm đã chọn?",
  //     icon: <ExclamationCircleOutlined />,
  //     content: "Bạn có chắc chắn muốn xóa tất cả sản phẩm đã chọn?",
  //     okText: "Xóa",
  //     okType: "danger",
  //     cancelText: "Hủy",
  //     onOk() {
  //       removeProduct();
  //     },
  //   });
  // };

  // const removeSelectedProducts = () => {
  //   // setProducts((prevProducts) =>
  //   //   prevProducts.filter((product) => !selectedProducts.includes(product.id))
  //   // );
  //   // setSelectedProducts([]);
  //   deleteCart(id);
  // };


  const columns = [
    // {
    //   title: <Checkbox checked={selectAll} onChange={toggleSelectAll} />,
    //   dataIndex: "select",
    //   render: (_, record) => (
    //     <Checkbox
    //       checked={selectedProducts.includes(record.id)}
    //       onChange={() => toggleSelectProduct(record.id)}
    //     />
    //   ),
    //   width: 50,
    // },
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      render: (text, record) => (
        <div className="product-info">
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (text, record) => (
        <div className="product-info">
          <Image width={50} height={50} src={"https://media.hasaki.vn/wysiwyg/HaNguyen/nuoc-tay-trang-l-oreal-3-in-1-1.jpg" || record.image} alt={text} />
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (price) => (
        <Text className="price">{price.toLocaleString()}₫</Text>
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      render: (quantity, record) => (
        <div className="quantity-control">
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => updateQuantity(record.id, -1)}
            disabled={!selectedProducts.includes(record.id)}
          />
          <Text className="quantity">{quantity}</Text>
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => updateQuantity(record.id, 1)}
            disabled={!selectedProducts.includes(record.id)}
          />
        </div>
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      render: (_, record) => (
        <Text className="total">
          {(record.price * record.quantity).toLocaleString()}₫
        </Text>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (_, record) => (
        <Button
          type="text"
          icon={<DeleteOutlined />}
          danger
          onClick={() => showDeleteConfirm(record.id)}
        />
      ),
    },
  ];

  return (
    <div className="cart-container">
      <div className="cart-card">
        <Card>
          <Title level={3}>GIỎ HÀNG</Title>
          <Table
            columns={columns}
            dataSource={carts}
            rowKey="id"
            pagination={false}
          />
          {/* {selectedProducts.length > 0 && (
            <Button
              type="link"
              danger
              onClick={showDeleteConfirm}
              className="remove-selected"
            >
              Xóa Sản Phẩm Đã Chọn
            </Button>
          )} */}
        </Card>
      </div>

      <div className="summary-card">
        <Card>
          <Title level={4}>Tổng tiền hàng</Title>
          <div className="summary">
            <Text>Tổng tiền thanh toán:</Text>
            <Text className="total-price">{totalPrice.toLocaleString()}₫</Text>
          </div>
          <Link to="/checkout">
            <Button
              type="primary"
              block
              // disabled={selectedProducts.length === 0}
            >
              Mua Hàng
              {/* ({selectedProducts.length}) */}
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default AddToCardPage;
