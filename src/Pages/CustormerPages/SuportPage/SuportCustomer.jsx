import React from "react";
import "./supportCustomer.css";
import {
  UserOutlined,
  ShoppingCartOutlined,
  GiftOutlined,
  CarOutlined,
  DollarCircleOutlined,
  SafetyOutlined,
  SyncOutlined,
  HeartOutlined,
  SolutionOutlined,
  SearchOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const SupportCustomer = () => {
  return (
    <div className="support-container">
      {/* Header Section */}
      <div className="header-support">
        <h1>Xin chào! Chúng tôi có thể giúp gì cho bạn?</h1>
        <div className="search-box">
          <input type="text" placeholder="Nhập từ khóa để tìm sản phẩm..." />
          <button>
            <SearchOutlined />
          </button>
        </div>
        <div className="contact-info">
          <p>
            <PhoneOutlined /> 1800 6324 (Miễn phí)
          </p>
        </div>
      </div>

      {/* Icon Section */}
      <div className="icon-section">
        {[
          { text: "Tài khoản", icon: <UserOutlined /> },
          { text: "Đặt hàng", icon: <ShoppingCartOutlined /> },
          { text: "Quy cách đóng gói", icon: <GiftOutlined /> },
          { text: "Vận chuyển 2H", icon: <CarOutlined /> },
          { text: "Phí vận chuyển", icon: <DollarCircleOutlined /> },
          { text: "Chính sách bảo hành", icon: <SafetyOutlined /> },
          { text: "Đổi trả, hoàn tiền", icon: <SyncOutlined /> },
          { text: "Dịch vụ SPA", icon: <HeartOutlined /> },
          { text: "Tuyển dụng", icon: <SolutionOutlined /> },
        ].map((item, index) => (
          <div key={index} className="icon-item">
            {item.icon}
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Câu hỏi thường gặp</h2>
        <div className="faq-list">
          <ul>
            <li>Đăng ký thành viên Beauty city như thế nào?</li>
            <li>Tại sao tôi không thể đăng nhập vào tài khoản của tôi?</li>
            <li>Tôi có thể sử dụng chung tài khoản với người khác không?</li>
          </ul>
          <ul>
            <li>Có cần đặt lịch trước khi đến spa hay không?</li>
            <li>Đặt dịch vụ như thế nào?</li>
            <li>Khám da tại spa Beauty city có tốn phí hay không?</li>
          </ul>
        </div>
      </div>

      {/* Support Information Section */}
      <div className="support-info">
        <h2>Thông tin hỗ trợ</h2>
        <div className="support-grid">
          {[
            [
              "Giới thiệu Beauty city",
              "Hướng dẫn đặt hàng",
              "Chương trình tích điểm",
              "Phiếu mua hàng Beauty city",
              "Chính sách Cookie",
            ],
            [
              "Liên hệ",
              "Hướng dẫn đặt hàng 2H",
              "Hướng dẫn đổi điểm lấy quà",
              "Hướng dẫn tải & sử dụng App Beauty city",
              "Chính sách khách hàng Clinic",
            ],
            [
              "Hệ thống cửa hàng Beauty city trên toàn quốc",
              "Phương thức thanh toán",
              "Chương trình quà tặng tri ân khách hàng",
              "Thẻ quà tặng Got It",
              "Chính sách bảo mật",
            ],
            [
              "Các kênh chính thức của Beauty city",
              "Chính sách vận chuyển giao nhận",
              "Điều khoản sử dụng",
              "Quy định giao dịch chung",
              "Cảnh báo mạo danh Beauty city để lừa đảo",
            ],
          ].map((column, index) => (
            <ul key={index}>
              {column.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportCustomer;
