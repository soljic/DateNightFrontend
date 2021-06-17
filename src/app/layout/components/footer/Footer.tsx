import React from "react";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import facebook from "../../img/facebook.svg";
import instagram from "../../img/instagram.svg";
import linkedin from "../../img/linkedin.svg";

function Footer() {
  return (
      <>
        <div className="container">
          <div className="row" id="footerRow">
            <div className="col col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="logo-wrap">
                  <Logo/>
                </div>
                <div>
                  <Button className="button-link" type="link">
                    Get notified
                  </Button>
                </div>
              </div>
              <hr className="lineFooter"></hr>
            </div>
            <div className="bootomContainer">
                <div className="copyRight">
                ©{new Date().getFullYear()} Spiritus Memoria. All rights reserved.
                </div>
                <div className="socialMedia">
                <a href="https://www.facebook.com/spiritusmemoria" target="_blank"><img src={facebook} alt="facebook icon"/></a>
                <a href="https://www.instagram.com/spiritus_memoria/?hl=hr" target="_blank"><img src={instagram} alt="instagram icon"/></a>
                <a href="https://www.linkedin.com/company/spiritus-memoria/" target="_blank"><img src={linkedin} alt="linkedin icon"/></a>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default Footer;