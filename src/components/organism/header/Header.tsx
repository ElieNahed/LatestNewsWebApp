import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/user/userSlice";
import Animation from "../../atoms/animation/animation";
import "./Header.css";

const Header: React.FC = () => {
  const [language, setLanguage] = useState<string>("English"); // Default language
  const accessToken = useSelector((state: any) => state.user.accessToken);
  const dispatch = useDispatch();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Beirut", // Change to your desired location
  });

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Beirut", // Change to your desired location
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const handleLogout = () => {
    dispatch(logout() as any); // This is a workaround, better approach suggested below
  };

  return (
    <div className="header-container">
      <div className="animation-container">
        <Animation text={"Latest News"} className="custom-animation" />
      </div>

      <div className="date-container">
        <div className="date">{currentDate}</div>
        <div className="time">{currentTime}</div>
      </div>

      {accessToken && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
