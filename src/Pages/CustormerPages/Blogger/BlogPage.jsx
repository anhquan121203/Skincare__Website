//
import { useState } from "react";
import adImage from "../../../assets/imageBlogger/duong-da.webp";
import "./BlogPage.css";
import { articlesDiscovery, healthArticles } from "./data/articles";
import { Pagination } from "antd";

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số bài viết trên mỗi trang

  // Tính toán bài viết hiển thị
  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articlesDiscovery.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Tổng số trang
  const totalArticles = articlesDiscovery.length;

  // Hàm đổi trang
  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div style={{ marginTop: 100 }}>
      <h1>Blogger</h1>
      <div className="categories">
        <div className="category">CHĂM SÓC DA</div>
        <div className="category">CHĂM SÓC SỨC KHỎE</div>
        <div className="category">XU HƯỚNG</div>
        <div className="category">REVIEW SẢN PHẨM</div>
      </div>
      {/* .............................................. */}
      <div className="article-list">
        <h1>Khám phá</h1>
        {currentArticles.map((article, index) => (
          <div key={index} className="articlesDiscovery">
            <img
              src={article.image}
              alt={article.title}
              className="article-image"
            />
            <div className="article-content">
              <div className="date">{article.date}</div>
              <h2>{article.title}</h2>
              <h3>{article.description}</h3>
              <p>{article.content}</p>
              <div className="info">
                <button className="read-more">Xem thêm</button>
                <span className="views">{article.views} Lượt xem</span>
              </div>
            </div>
          </div>
        ))}
        {/* Phân trang bằng Ant Design */}
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalArticles}
          onChange={changePage}
          showSizeChanger={false} // Không cho thay đổi số item trên trang
          className="pagination"
        />
      </div>

      {/* ----------------------------------------------------------------------------- */}
      <div className="health-care-section">
        <h1>Chăm sóc sức khoẻ</h1>
        <div className="articles">
          {healthArticles.map((article, index) => (
            <div key={index} className="healthArticles">
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <div className="article-content">
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="article-info">
                  <span className="date">{article.date}</span>
                  <span className="views">{article.views} Lượt xem</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="see-more">Xem thêm</button>
      </div>

      <div className="ad-section">
        <img src={adImage} alt="Advertisement" className="ad-image" />
        <div className="ad-content">
          <h1>MỸ PHẨM ĐẾN TỪ NHẬT BẢN</h1>
          <h2>Top 10 Thương Hiệu Mỹ Phẩm Đến Từ Nhật Bản</h2>
          <p>
            Mỹ phẩm đến từ Nhật Bản rất được ưa chuộng tại Việt Nam một phần bởi
            chất lượng tốt và mẫu mã đa dạng. Và mức chi phí cho mỗi sản phẩm
            cũng khá là phù hợp với thu nhập của phần đa người dùng mỹ phẩm. Hầu
            hết các mỹ phẩm đến từ Nhật Bản luôn được nhắc đến là những sản phẩm
            lành tính với da, chiết xuất từ thiên nhiên, rất tốt cho da. Vậy chỉ
            em nên dùng thương hiệu mỹ phẩm làm đẹp nào của Nhật, trong bài viết
            hôm nay ....
          </p>
          <ul>
            <li>Naris Cosmetics</li>
            <li>Sunplay</li>
            <li>DHC</li>
            <li>Hatomugi</li>
          </ul>
          <button className="ad-section-see-more">Xem thêm</button>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
