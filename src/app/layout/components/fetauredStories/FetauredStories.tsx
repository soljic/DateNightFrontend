import React from 'react';
import {Link} from "react-router-dom";
import "./FetauredStrories.scss";

function FetauredStories() {
    return (
        <div>
        <div className="container">
        <div className="row" id="rowNavbar">
          <div className="col col-12 col-sm-8 ">
            <div className="d-flex justify-content-between align-items-center hrLine">
            <div className="slider-container">
               
                    <div className="fetaured-stories">FEATURED STORIES</div>
               
            </div>
         
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}

export default FetauredStories
