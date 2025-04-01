import React from 'react'
import "./Banner.css"
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

function Banner() {
  return (
    <div className="banner animate">
      <div className="banner-content">
        <h1 className="title animate" style={{fontSize: "30px"}}>Chào mừng đến Beauty city!</h1>
        <p className="description animate">
          Skincare là quá trình chăm sóc da nhằm duy trì và
          cải thiện sức khỏe của làn da. Việc lựa chọn các sản phẩm và phương pháp
          phù hợp với từng loại da giúp cải thiện làn da, ngăn ngừa mụn, lão hóa và
          các vấn đề khác. Một chu trình skincare hiệu quả thường bao gồm các bước như làm sạch da, dưỡng ẩm, bảo vệ da khỏi tia UV và bổ sung dưỡng chất cho da. Việc chăm sóc da đúng cách không chỉ giúp làn da trở nên khỏe mạnh mà còn mang lại vẻ đẹp tự nhiên và sự tự tin cho người sử dụng.
        </p>
        <Link to="/product">
          <button className="shop-now animate">Mua hàng <FaArrowRight /></button>
        </Link>
      </div>
    </div>
  )
}

export default Banner