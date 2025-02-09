//
import { useState } from "react";
import "./BlogPage.css";
import { articlesDiscovery } from "./data/articles";
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
    </div>
  );
}

export default BlogPage;
