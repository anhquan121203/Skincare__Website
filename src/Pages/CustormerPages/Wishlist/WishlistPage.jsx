import React, { useState } from "react";
import {
  Card,
  Button,
  Select,
  Input,
  Row,
  Col,
  Rate,
  Pagination,
  Popconfirm,
} from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import "./WishlistPage.css";

const { Option } = Select;

const initialWishlist = [
  {
    image:
      "https://storage.googleapis.com/a1aa/image/BTKcxQJDFnZdHELCkxZ3HFyCBq5ytvkpdc1mW-LokP4.jpg",
    description: "A lightweight spray that helps detangle and smooth hair.",
    rating: 4.5,
    price: 8.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/V0Onohk4KefUkPOZsCDoKmN5Wq8xxJZ8nQ-SxeOdtC4.jpg",
    description:
      "An organic herbal shampoo that nourishes and strengthens hair.",
    rating: 4.3,
    price: 9.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/JgqXEXX4bdFY-ifpVelcAAYmNZjBm9sE4goRtoXbIiw.jpg",
    description: "A deep conditioning mask that repairs and hydrates hair.",
    rating: 4.8,
    price: 7.0,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/BTKcxQJDFnZdHELCkxZ3HFyCBq5ytvkpdc1mW-LokP4.jpg",
    description: "A lightweight spray that helps detangle and smooth hair.",
    rating: 4.5,
    price: 10.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/V0Onohk4KefUkPOZsCDoKmN5Wq8xxJZ8nQ-SxeOdtC4.jpg",
    description:
      "An organic herbal shampoo that nourishes and strengthens hair.",
    rating: 4.3,
    price: 11.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/JgqXEXX4bdFY-ifpVelcAAYmNZjBm9sE4goRtoXbIiw.jpg",
    description: "A deep conditioning mask that repairs and hydrates hair.",
    rating: 4.8,
    price: 12.0,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/BTKcxQJDFnZdHELCkxZ3HFyCBq5ytvkpdc1mW-LokP4.jpg",
    description: "A lightweight spray that helps detangle and smooth hair.",
    rating: 4.5,
    price: 13.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/V0Onohk4KefUkPOZsCDoKmN5Wq8xxJZ8nQ-SxeOdtC4.jpg",
    description:
      "An organic herbal shampoo that nourishes and strengthens hair.",
    rating: 4.3,
    price: 14.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/JgqXEXX4bdFY-ifpVelcAAYmNZjBm9sE4goRtoXbIiw.jpg",
    description: "A deep conditioning mask that repairs and hydrates hair.",
    rating: 4.8,
    price: 15.0,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/BTKcxQJDFnZdHELCkxZ3HFyCBq5ytvkpdc1mW-LokP4.jpg",
    description: "A lightweight spray that helps detangle and smooth hair.",
    rating: 4.5,
    price: 16.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/V0Onohk4KefUkPOZsCDoKmN5Wq8xxJZ8nQ-SxeOdtC4.jpg",
    description:
      "An organic herbal shampoo that nourishes and strengthens hair.",
    rating: 4.3,
    price: 17.99,
  },
  {
    image:
      "https://storage.googleapis.com/a1aa/image/JgqXEXX4bdFY-ifpVelcAAYmNZjBm9sE4goRtoXbIiw.jpg",
    description: "A deep conditioning mask that repairs and hydrates hair.",
    rating: 4.8,
    price: 18.0,
  },
];

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState(initialWishlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 8;

  // Xóa sản phẩm khỏi danh sách yêu thích
  const removeFromWishlist = (index) => {
    const updatedWishlist = wishlistItems.filter((_, i) => i !== index);
    setWishlistItems(updatedWishlist);
  };

  // Lọc theo từ khóa tìm kiếm
  const filteredItems = wishlistItems.filter((item) =>
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sắp xếp danh sách theo tùy chọn
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOrder) {
      case "low-to-high":
        return a.price - b.price;
      case "high-to-low":
        return b.price - a.price;
      case "a-to-z":
        return a.description.localeCompare(b.description);
      case "z-to-a":
        return b.description.localeCompare(a.description);
      default:
        return 0;
    }
  });

  // Phân trang
  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="wishlist-container">
      <h1 className="wishlist-title">Danh sách yêu thích</h1>

      {/* Bộ lọc và tìm kiếm */}
      <div className="wishlist-controls">
        <Select
          defaultValue="all"
          className="sort-select"
          onChange={setSortOrder}
        >
          <Option value="all">Tất cả</Option>
          <Option value="low-to-high">Giá: từ thấp đến cao</Option>
          <Option value="high-to-low">Giá: từ cao đến thấp</Option>
          <Option value="a-to-z">Tên: A - Z</Option>
          <Option value="z-to-a">Tên: Z - A</Option>
        </Select>

        <Input
          placeholder="Tìm kiếm sản phẩm..."
          prefix={<SearchOutlined />}
          className="wishlist-search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="wishlist-items">
        <Row gutter={[16, 16]}>
          {paginatedItems.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                cover={
                  <div className="image-container">
                    <img alt={item.description} src={item.image} />
                    <Popconfirm
                      title="Xóa sản phẩm"
                      description="Bạn có chắc muốn xóa sản phẩm khỏi danh sách không?"
                      onConfirm={() => removeFromWishlist(index)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        className="wishlist-remove-btn"
                        shape="circle"
                        icon={<HeartOutlined />}
                      />
                    </Popconfirm>
                  </div>
                }
                hoverable
                className="wishlist-card"
              >
                <p>{item.description}</p>
                <Rate disabled allowHalf defaultValue={item.rating} />
                <div className="wishlist-footer">
                  <span className="price">
                    {item.price.toLocaleString()} VND
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Phân trang */}
      {filteredItems.length > pageSize && (
        <Pagination
          current={currentPage}
          total={filteredItems.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          className="wishlist-pagination"
          showSizeChanger={false}
        />
      )}
    </div>
  );
};

export default WishlistPage;
