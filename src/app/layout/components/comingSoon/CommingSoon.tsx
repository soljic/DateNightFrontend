import React from "react";
import "./CommingSoon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import EmailInput from "../emailInput/EmailInput";

function CommingSoon() {
  return (
    <div className="container ">
      <div className="row">
        <div className="col-lg-12 col-sm-12 col-xs-12 " id="csoon">
          <div className="commingSoon">
            <h1>Coming soon</h1>
            <h3>Join the waitlist for Spiritus Android app beta.</h3>
            <EmailInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommingSoon;
