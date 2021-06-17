import React from "react";
import "./HeaderThree.css";
import "bootstrap/dist/css/bootstrap.min.css";

function HeaderThree() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col col-3 "></div>
          <div className="col col-6 headerThreePosition ">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="headerThree">
                Spiritus is platform for creating and storing <br /> digital
                memorials in a storytelling way.
              </h3>
            </div>
            <div className="col col-3 "></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeaderThree;
