// src/components/SkincareRoutine.js
import React from "react";

const steps = [
  {
    title: "Tẩy trang",
    description:
      "Tẩy trang là bước không nên bỏ qua trong quy trình chăm sóc da khô, hãy lựa chọn sản phẩm phù hợp với làn da và nhu cầu của bạn.",
  },
  {
    title: "Rửa mặt",
    description:
      "Nên lựa chọn các loại sữa rửa mặt trung tính có độ pH khoảng 5.5 để giảm tối đa nguy cơ gây kích ứng.",
  },
  {
    title: "Dùng Toner",
    description:
      "Sử dụng Toner ngay sau khi rửa mặt để cân bằng pH và giữ ẩm tự nhiên cho làn da.",
  },
  {
    title: "Đắp mặt nạ giấy",
    description:
      "Đắp mặt nạ giấy cấp ẩm hàng ngày hoặc cách từ 2 - 3 ngày tùy vào tình trạng da.",
  },
  {
    title: "Xịt khoáng",
    description:
      "Xịt khoáng giúp cấp ẩm ngay lập tức cho da, giải quyết vấn đề căng da, ngứa da do thiếu ẩm.",
  },
  {
    title: "Dùng Serum chứa dầu dưỡng",
    description:
      "Sử dụng Serum chứa dầu dưỡng để giữ ẩm tốt hơn trong điều kiện thời tiết hanh khô.",
  },
  {
    title: "Dùng kem dưỡng và mặt nạ ngủ",
    description:
      "Sử dụng kem dưỡng da chuyên biệt ban đêm hoặc mặt nạ ngủ để cấp ẩm tốt hơn.",
  },
  {
    title: "Kem dưỡng mắt",
    description: "Dưỡng mắt chuyên sâu để hạn chế nếp nhăn và thâm sạm.",
  },
  {
    title: "Kem chống nắng",
    description:
      "Sử dụng kem chống nắng để bảo vệ da khỏi tia UV, ngay cả trong mùa đông.",
  },
];

const SkincareRoutine = () => {
  return (
    <div>
      <h1>Quy trình chăm sóc da khô</h1>
      <ul>
        {steps.map((step, index) => (
          <li key={index}>
            <h2>{step.title}</h2>
            <p>{step.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkincareRoutine;
