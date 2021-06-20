import React from 'react';
import {Link} from "react-router-dom";
import "./FetauredStrories.css";

function FetauredStories() {
    return (
        <div>
        <div className="container">
        <div className="row" id="rowNavbar">
          <div className="col col-12">
            <div className="d-flex justify-content-between align-items-center">
            <div className="slider-container">
               
                    <div className="fetaured-stories">FEATURED STORIES</div>
               
            </div>
            <hr className="line"></hr>
            </div>
          </div>
        </div>
        <hr className="lineFooter"></hr>
      </div>
        </div>
    )
}

export default FetauredStories
