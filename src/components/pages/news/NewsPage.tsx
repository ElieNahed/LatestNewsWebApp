import React, { useState, useEffect } from "react";
import Footer from "../../organism/footer/Footer";
import Header from "../../organism/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { getNews } from "../../../store/news/newsSlice";
import NewsCard from "../../molecules/news/NewsCard";

import "./NewsPage.css";

const NewsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const news = useSelector((state: any) => state.news.news);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getNews({ page, pageSize }));
  }, [page, pageSize, dispatch]);

  const handleCreatorClick = (sourceUrl: string) => {
    window.open(sourceUrl, "_blank");
  };

  const handleNext = () => {
    setCurrentNewsIndex((prevIndex) =>
      prevIndex === news.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentNewsIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  return (
    <div>
      <Header />
      {/* 
      <ButtonIcon
        icon={profileIcon}
        clickListener={() => {}}
        logoClassName="profile-icon"
        className="profile-button"
        style={{ marginTop: "20px", width: "50px", height: "50px" }}
      /> */}

      <div className="container">
        <div className="content">
          {news.length > 0 && (
            <NewsCard
              newsItem={news[currentNewsIndex]}
              handleCreatorClick={handleCreatorClick}
            />
          )}

          <div className="navigation">
            <button onClick={handlePrevious} disabled={currentNewsIndex === 0}>
              Previous
            </button>
            <span>
              {currentNewsIndex + 1} / {news.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentNewsIndex === news.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsPage;
