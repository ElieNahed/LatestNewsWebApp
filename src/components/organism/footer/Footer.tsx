import React from "react";
import ButtonIcon from "../../atoms/buttons/ButtonIcon";
import "./Footer.css";
import facebookIcon from "../../../assets/facebook.svg";
import instagramIcon from "../../../assets/instagram.svg";
import linkedinIcon from "../../../assets/linkedin.svg";

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <div className="social-media">
        <div className="social-icon-container">
          <ButtonIcon
            icon={linkedinIcon}
            clickListener={() =>
              window.open("https://www.linkedin.com/", "_blank")
            }
            logoClassName="social-icon"
          />
          <ButtonIcon
            icon={instagramIcon}
            clickListener={() =>
              window.open("https://www.instagram.com/", "_blank")
            }
            logoClassName="social-icon"
          />
          <ButtonIcon
            icon={facebookIcon}
            clickListener={() =>
              window.open("https://www.facebook.com/", "_blank")
            }
            logoClassName="social-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
