import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div className="galleryContainer">
        <div className="galleryRow">
          <img
            src="/Images/Footer/Footer1.webp"
            className="firstdivhalf"
            alt=""
          />
          <img
            src="/Images/Footer/Footer2.webp"
            className="firstdivhalf"
            alt=""
          />
        </div>
        <div className="galleryRow">
          <img
            src="/Images/Footer/Footer3.webp"
            className="firstdivhalf"
            alt=""
          />
          <img
            src="/Images/Footer/Footer4.webp"
            className="firstdivhalf"
            alt=""
          />
          <img
            src="/Images/Footer/Footer5.webp"
            className="firstdivhalf"
            alt=""
          />
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default Footer;
