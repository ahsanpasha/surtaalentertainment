import React from "react";
import "./Footer.css";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
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

      <div className="FooterWrapper">
        <div className="FooterInfoContainer">
          <div className="FooterTop">
            <img src="/Images/Navbar/Logo.svg" alt="Surtaal Entertainment" />

            <div className="FooterNavLinks">
              <a href="/" className="FooterLink active">
                Events in Surtaal
              </a>
              <a href="/about-us" className="FooterLink">
                About Us
              </a>
              <a href="/artists" className="FooterLink">
                Artists
              </a>
              <a href="/our-team" className="FooterLink">
                Our Team
              </a>
            </div>
            <div className="FooterSocials">
              <span>Follow Us On:</span>
              <div className="SocialIcons">
                <div className="SocialIcon">
                  <RiTwitterXFill color="#BD0040" />
                </div>
                <div className="SocialIcon">
                  <FaInstagram color="#BD0040" />
                </div>
                <div className="SocialIcon">
                  <FaFacebook color="#BD0040" />
                </div>
                <div className="SocialIcon">
                  <FaMeta color="#BD0040" />
                </div>
              </div>
            </div>
          </div>

          <div className="FooterMiddle">
            <div className="ContactItem">
              <img src="/Images/Footer/PhoneIcon.svg" alt="" />
              <div className="ContactText">
                <span className="ContactLabel">Phone</span>
                <span className="ContactValue">+1-321-422-2223</span>
              </div>
            </div>
            <div className="ContactDivider"></div>
            <div className="ContactItem">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#BD0040">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              <div className="ContactText">
                <span className="ContactLabel">Email</span>
                <span className="ContactValue">info@surtaalusa.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="FooterBottom">
          <div className="FooterBottomLeft">
            <span className="underline">Surtaal-USA</span> © 2025. All Rights
            Reserved.
          </div>
          <div className="FooterBottomRight">
            Privacy Policy &nbsp;&nbsp;|&nbsp;&nbsp; Terms of Service
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
