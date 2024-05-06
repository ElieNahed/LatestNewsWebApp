import React, { useState } from "react";
import Header from "../../organism/header/Header";
import Footer from "../../organism/footer/Footer";
import ButtonIcon from "../../atoms/buttons/ButtonIcon";
import CloseLogo from "../../../assets/close.svg";
import LoginComponent from "../../organism/login/Login";
import SignupComponent from "../../organism/signup/SignUp";
import RightArrowIcon from "../../../assets/rightArrow.svg";
import Apple from "../../../assets/apple.png";
import PlayStore from "../../../assets/playStore.png";
import "./HomePage.css";
import { AppDispatch } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { login, signup } from "../../../store/user/userSlice";

const HomePage: React.FC = () => {
  const [page, setPage] = useState("main");

  const dispatch: AppDispatch = useDispatch();

  const handleLoginClick = () => {
    setPage("login");
  };

  const handleSignupClick = () => {
    setPage("signup");
  };

  const handleCloseClick = () => {
    setPage("main");
  };

  const handleLogin = (
    email: string,
    password: string,
    token_expires_in: string | undefined
  ) => {
    dispatch(login({ email, password, token_expires_in }));
  };

  const handleSignup = (
    email: string,
    password: string,
    token_expires_in: string | undefined
  ) => {
    dispatch(signup({ email, password, token_expires_in }));
  };

  return (
    <div>
      <Header />
      {page === "main" && (
        <div className="hidden lg:block">
          <div className="absolute app-download-banner">
            Get the latest news on the go with our app!
          </div>
        </div>
      )}
      <div className="home-page-background">
        <div className="flex-container">
          <div
            className={`main-content ${page !== "main" ? "half-width" : ""}`}
          >
            <div className="content">
              <div className="main-title">
                Stay Updated
                <br />
                Anywhere, Anytime
              </div>
              <div className="sub-title">
                Get breaking news, latest headlines, and in-depth analysis from
                our team of journalists.
              </div>
              <ButtonIcon
                clickListener={handleLoginClick}
                placeholder="Login"
                icon={RightArrowIcon}
                className="login-button"
              />
              <div className="signup-container">
                Don't have an account?
                <span className="signup-link" onClick={handleSignupClick}>
                  Sign Up
                </span>
              </div>
            </div>
          </div>
          {(page === "login" || page === "signup") && (
            <div className="login-signup-form">
              <div className="form-container">
                <div className="close-icon" onClick={handleCloseClick}>
                  <img src={CloseLogo} alt="Close" />
                </div>
                <div className="tabs">
                  <div
                    className={`tab ${page === "login" ? "active" : ""}`}
                    onClick={handleLoginClick}
                  >
                    Login
                  </div>
                  <div
                    className={`tab ${page === "signup" ? "active" : ""}`}
                    onClick={handleSignupClick}
                  >
                    Sign Up
                  </div>
                </div>
                <div className="form-content">
                  {page === "login" && (
                    <LoginComponent
                      handleLogin={handleLogin}
                      handleSignupClick={handleSignupClick}
                    />
                  )}
                  {page === "signup" && (
                    <SignupComponent
                      handleSignup={handleSignup}
                      handleLoginClick={handleLoginClick}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {page === "main" && (
            <div
              className={`app-download ${page !== "main" ? "half-width" : ""}`}
            >
              <div className="download-card">
                <div className="download-title">Download the App!</div>
                <div className="download-option">
                  <img src={PlayStore} alt="logo" className="logo" />
                  <div className="store">Google Play</div>
                </div>
                <div className="download-option">
                  <img src={Apple} alt="logo" className="logo" />
                  <div className="store">Apple Store</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
