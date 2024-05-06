import React, { useState, ButtonHTMLAttributes } from "react";
import closeIcon from "../../../assets/close.svg";
import { NewsItem } from "../../../store/news/types";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  newsItem: NewsItem;
  handleCreatorClick: (sourceUrl: string) => void;
}

const NewsCard: React.FC<Props> = ({
  newsItem,
  handleCreatorClick,
  ...props
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  const closeDetails = () => {
    setShowDetails(false);
  };

  const formatDate = (date: string, language: string) => {
    const today = new Date();
    const pubDate = new Date(date);
    const diffTime = Math.abs(today.getTime() - pubDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    const pubMonthDay = new Intl.DateTimeFormat("en-US", options).format(
      pubDate
    );
    if (diffDays === 0) {
      return {
        date: "Today",
        positionClass: language === "arabic" ? "left" : "right",
      };
    } else if (diffDays === 1) {
      return {
        date: "Yesterday",
        positionClass: language === "arabic" ? "left" : "right",
      };
    } else if (diffDays <= 30) {
      return {
        date: `Last month (${pubMonthDay})`,
        positionClass: language === "arabic" ? "left" : "right",
      };
    } else {
      return {
        date: `${diffDays} days ago`,
        positionClass: language === "arabic" ? "left" : "right",
      };
    }
  };

  return (
    <div
      className={`news-item ${
        newsItem.language === "arabic" ? "horiz-reverse" : ""
      }`}
    >
      <div className="details-btn-container">
        <button
          {...props}
          className={`details-btn ${
            newsItem.language === "arabic" ? "left" : "right"
          }`}
          onClick={handleDetailsClick}
        >
          Details
        </button>
      </div>
      <div className="source-info">
        {newsItem.source_icon && (
          <img
            src={newsItem.source_icon}
            alt="Source Icon"
            className="source-icon"
          />
        )}
        <p>
          {newsItem.creator ? (
            <>
              {" "}
              <a
                href="#"
                onClick={() => handleCreatorClick(newsItem.source_url)}
              >
                {newsItem.creator}
              </a>
            </>
          ) : (
            <> {newsItem.source_id}</>
          )}
        </p>
      </div>
      <h1>{newsItem.title}</h1>
      {newsItem.image_url && <img src={newsItem.image_url} alt="News Image" />}
      <div
        className={`published-date ${
          formatDate(newsItem.pubDate, newsItem.language).positionClass
        }`}
      >
        {formatDate(newsItem.pubDate, newsItem.language).date}
      </div>
      <p> {newsItem.keywords}</p>
      <p> {newsItem.video_url}</p>
      <p>- {newsItem.description}</p>

      {showDetails && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={closeDetails}>
              <img src={closeIcon} alt="Close" />
            </span>
            <div className="details">
              <p>Category: {newsItem.category.join(", ")}</p>
              <p>Country: {newsItem.country.join(", ")}</p>
              <p>
                Source URL:{" "}
                <a
                  href={newsItem.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {newsItem.source_url}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      <button
        className="visit-website-btn"
        onClick={() => handleCreatorClick(newsItem.source_url)}
      >
        Visit Website
      </button>
    </div>
  );
};

export default NewsCard;
