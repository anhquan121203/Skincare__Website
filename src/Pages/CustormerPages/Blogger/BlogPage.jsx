import { useState } from "react";
import { Button, Pagination, Card, Typography } from "antd";
import adImage from "../../../assets/imageBlogger/duong-da.webp";
import "./BlogPage.css";
import { articlesDiscovery, healthArticles } from "./data/articles";

const { Title, Paragraph } = Typography;

const categoryData = [
  { name: "CHĂM SÓC DA", image: "duong-da.webp" },
  { name: "CHĂM SÓC SỨC KHỎE", image: "suc-khoe.webp" },
  { name: "XU HƯỚNG", image: "xu-huong.webp" },
  { name: "REVIEW SẢN PHẨM", image: "review.webp" },
];

function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastArticle = currentPage * itemsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - itemsPerPage;
  const currentArticles = articlesDiscovery.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  const totalArticles = articlesDiscovery.length;

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="blog-page" style={{ marginTop: 100 }}>
      <h1 className="title-blogger">Blogger</h1>
      <div className="categories">
        {categoryData.map((category, index) => (
          <div key={index} className="category">
            {category.name}
          </div>
        ))}
      </div>

      <div className="article-list">
        <Title level={2}>Khám phá</Title>
        {currentArticles.map((article, index) => (
          <div key={index} className="articlesDiscovery">
            <img
              src={article.image}
              alt={article.title}
              className="article-image"
            />
            <div className="article-content">
              <Paragraph className="date">{article.date}</Paragraph>
              <Title level={3}>{article.title}</Title>
              <Paragraph>{article.description}</Paragraph>
              <Paragraph>{article.content}</Paragraph>
              <div className="info">
                <Button>Xem thêm</Button>
                <span className="views">{article.views} Lượt xem</span>
              </div>
            </div>
          </div>
        ))}

        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={totalArticles}
          onChange={changePage}
          showSizeChanger={false}
          className="pagination"
        />
      </div>

      <div className="health-care-section">
        <Title level={2}>Chăm sóc sức khoẻ</Title>
        <div className="articles">
          {healthArticles.map((article, index) => (
            <Card key={index} className="healthArticles" hoverable>
              <img
                src={article.image}
                alt={article.title}
                className="article-image"
              />
              <div className="article-content">
                <Title level={3}>{article.title}</Title>
                <Paragraph>{article.description}</Paragraph>
                <div className="article-info">
                  <span className="date">{article.date}</span>
                  <span className="views">{article.views} Lượt xem</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Button type="primary" style={{ marginTop: 20 }}>
          Xem thêm
        </Button>
      </div>

      <div className="ad-section">
        <img src={adImage} alt="Advertisement" className="ad-image" />
        <div className="ad-content">
          <Title level={2}>MỸ PHẨM ĐẾN TỪ NHẬT BẢN</Title>
          <Title level={3}>Top 10 Thương Hiệu Mỹ Phẩm Đến Từ Nhật Bản</Title>
          <Paragraph>
            Mỹ phẩm đến từ Nhật Bản rất được ưa chuộng tại Việt Nam một phần bởi
            chất lượng tốt và mẫu mã đa dạng...
          </Paragraph>
          <ul>
            <li>Naris Cosmetics</li>
            <li>Sunplay</li>
            <li>DHC</li>
            <li>Hatomugi</li>
          </ul>
          <Button type="primary">Xem thêm</Button>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
