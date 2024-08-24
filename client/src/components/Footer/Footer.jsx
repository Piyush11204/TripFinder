import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import tripvana from "../../img/Tripvana.png"
import logoDevtalk from "../../img/Titlelogo2.png";

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-cta">
                <div className="cta-container">
                    <div className="single-cta">
                        
                        <div className="cta-text">
                            <h4>Find us here</h4>
                            <span>Vidyavardhini's College Of Engineering & Technology, Vasai Road</span>
                        </div>
                    </div>
                    <div className="single-cta">
                        
                        <div className="cta-text">
                            <h4>Call us</h4>
                            <span>9876543210</span>
                        </div>
                    </div>
                    <div className="single-cta">
                        
                        <div className="cta-text">
                            <h4>Mail us</h4>
                            <span>mail@info.com</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-content">
                <div className="footer-widget">
                    <div className="footer-logo">
                        
                        <img className="logo1" src={logoDevtalk} alt="Logo" />
                    <a href="/Home"><h1 className="LogoName1">Trip<span className="vana">vana</span></h1></a>
                        
                    </div>
                    <div className="footer-text">
                        <strong>Welcome to Tripvana! Let us guide you to your dream getaway.</strong>
                    </div>
                    <div className="footer-social-icon">
                        <span>Follow us</span>
                        <a href="#"><FontAwesomeIcon icon={faFacebook} className="facebook-bg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} className="instagram-bg" /></a>
                        <a href="#"><FontAwesomeIcon icon={faGithub} className="github-bg" /></a>
                    </div>
                </div>
                <div className="footer-widget">
                    <h3>Useful Links</h3>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="about">About us</a></li>
                        <li><a href="/team">Expert Team</a></li>
                        <li><a href="/contactus">Contact us</a></li>
                        <li><a href="log">Latest News</a></li>
                    </ul>
                </div>
                <div className="footer-widget">
                    <h3>Subscribe</h3>
                    <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                    <div className="subscribe-form">
                        <form>
                            <input type="text" placeholder="Email Address" />
                            <button type="button">Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="copyright-area">
                <p>© 2024 Tripvana, Inc. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
