import React, { useState, MouseEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  const { activityStore } = useStore();
  const { isClicked, setIsClicked } = activityStore;

  return (
    <>
      <div className="container ">
        <div className="row" id="rowNavbar">
          <div className=" col-lg-12 col-sm-12 col-xs-12">
            <div className="d-flex justify-content-between align-items-center">
              <div className="logo-wrap">
                <Logo />
                <p className="navParagraph">Spiritus</p>
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
          </div>
        </div>
        <hr className="lineFooter"></hr>
      </div>
    </>
  );
}

export default observer(NavBar);
