import React, { MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";
import facebook from "../../img/facebook.svg";
import instagram from "../../img/instagram.svg";
import linkedin from "../../img/linkedin.svg";
import esif from "../../img/esif.svg";
import eUnion from "../../img/eUnion.svg";
import filRouge from "../../img/filRouge.svg";

function Footer() {
  const { activityStore } = useStore();
  const { isClicked, setIsClicked } = activityStore;

  return (
    <>
      <div className="container" id="footerCont">
        <div className="row" id="footerRow">
          <div className="col col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo-wrap">
                <Logo />
              </div>
              <div>
                <Button
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                  className="button-link"
                  type="link"
                >
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
              <a
                href="https://www.facebook.com/spiritusmemoria"
                target="_blank"
              >
                <img src={facebook} alt="facebook icon" />
              </a>
              <a
                href="https://www.instagram.com/spiritus_memoria/?hl=hr"
                target="_blank"
              >
                <img src={instagram} alt="instagram icon" />
              </a>
              <a
                href="https://www.linkedin.com/company/spiritus-memoria/"
                target="_blank"
              >
                <img src={linkedin} alt="linkedin icon" />
              </a>
            </div>
          </div>
          <div className="partners">
            <p>Proud partners with:</p>
            <div className="img_footer">
              <img src={filRouge} alt="" />
              <img
                className="esif"
                src={esif}
                alt=""
              />
              <img    src={eUnion} alt="eu-image" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(Footer);
