import React from 'react';
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CsButton from '../csbutton/CsButton';

function Header() {
    return (
        <div className="container">
            <div className="row justify-content-center">
         
                <div className="col-lg-8 col-md-12 col-sm-12 col-12 headerPosition ">
                    <h1 className="headerOne">Keep memories of your loved ones, forever </h1>
                </div>
            </div>
        </div>
    )
}

export default Header
