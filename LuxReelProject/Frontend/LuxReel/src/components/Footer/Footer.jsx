import React from "react";
import "./Footer.css";

import { FaFacebook, FaYoutube, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="logo">
          Lux<span className="logo-accent">Reel</span>
        </h2>
        <h3 className="tagline">Where Every Frame Feels Premium.</h3>
        <p className="description">
          Experience cinema like never before. At LuxReel, we blend
          cutting-edge technology with luxurious comfort to bring you the
          ultimate movie-going experience. From the latest blockbusters to
          timeless classics, every screening is crafted to immerse you in story,
          sound, and sensation. Join us and make every movie night unforgettable.
        </p>
      </div>

      <div className="footer-right">
        <div className="contact-section">
          <h4>Contact us:</h4>
          <div className="contact-icons">
            <a href="#"><FaFacebookMessenger /></a>
            <a href="#"><MdEmail /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaPhoneAlt /></a>
          </div>
        </div>

        <div className="follow-section">
          <h4>Follow us on:</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
