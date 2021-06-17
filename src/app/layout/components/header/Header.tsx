import React from 'react';
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    return (
        <>
        <div className="container">
          <div className="row">
          <div className="col col-2 "></div>
            <div className="col col-8 headerPosition ">
            <div className="d-flex justify-content-between align-items-center">
                    <h1 className="headerOne">Keep memories of your <br/>loved ones, forever </h1>
                </div>
                <div className="col col-2 "></div>
              </div>
            </div>
            </div>
            
      </>
    )
}

export default Header
