import { useState } from "react";
import { Button, Pagination, Card, Typography } from "antd";
import adImage from "../../../assets/imageBlogger/duong-da.webp";
import "./BlogPage.css";
import { articlesDiscovery, healthArticles } from "./data/articles";
import { use } from "react";
import useSkinType from "../../../Hooks/useSkinType";
import SkincareRoutine from "../TestPage/SkincareRoute/SkincareRoute";
import { Link, useNavigate } from "react-router-dom";

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

  //skintype
  const { skinTypes, loading, error } = useSkinType();

  const navigate = useNavigate();

  const skintypeActive = skinTypes.filter(
    (skintype) => skintype.skinTypeStatus === "Active"
  );

  const changePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="blog-page" style={{ marginTop: 100 }}>
      <h1 className="title-blogger">Blogger</h1>
      <div className="categories">
        {skintypeActive.map((value, index) => (
          <div
            key={index}
            className="category"
            onClick={() => navigate(`/skincare-routine/${value.id}`)}
          >
            Hướng dẫn chăm sóc {value.skinTypeName}
          </div>
        ))}
      </div>

      <div className="article-list">
        <Title level={2} style={{ display: "flex", justifyContent: "center" }}>
          Khám phá
        </Title>
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
    </div>
  );
}

export default BlogPage;
