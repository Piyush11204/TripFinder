import React from "react";
import "./Footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGithub,
    faFacebook,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} Trip Finder. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="item3"
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://www.instagram.com/"
                    target="_blank"
                    className="item4"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="item5"
                    rel="noreferrer"
                >
                    <FontAwesomeIcon icon={faFacebook} />
                </a>

                
            </div>
        </footer>
    );
};

export default Footer;