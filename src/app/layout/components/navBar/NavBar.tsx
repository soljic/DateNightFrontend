import React from "react";
import Logo from "../logo/Logo";
import { Button } from "antd";
import "./NavBar.css";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
      <>
        <div className="container">
          <div className="row">
            <div className="col col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div className="logo-wrap">
                  <Logo/>
                  <a href={`/`}>Spiritus</a>
                </div>
                <div>
                  <Button className="button-link" type="link">
                    Get early acces
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default NavBar;
