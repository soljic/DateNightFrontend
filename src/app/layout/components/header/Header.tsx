import React from 'react';
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Header() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col col-8 headerPosition ">
                    <h1 className="headerOne">Keep memories of your <br/>loved ones, forever </h1>
                </div>
            </div>
        </div>
    )
}

export default Header
