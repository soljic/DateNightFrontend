import React from 'react';
import "./InfoComponent.css";
import Feature_Icon_with_circle from "../../img/Feature_Icon_with_circle.svg";
import Logo2 from "../../img/Logo2.svg";
import Logo3 from "../../img/Logo3.svg";
import Logo4 from "../../img/Logo4.svg";
import Phone_Mockup from "../../img/Phone_Mockup.png";


function InfoComponent() {
    return (
        <div className="row justify-content-center">
            <div className=" col-lg-5 col-12 order-2 order-lg-1">
                <div className="info">
                    <div className="div-info">
                        <img src={Feature_Icon_with_circle} alt="" className=""/>
                        <p className="div-info-text">Create a unique Spiritus by which <br/> they will be remembered
                            for.
                        </p>
                    </div>
                    <div className="div-info">
                        <img src={Logo2} alt="" className=""/>
                        <p className="div-info-text two">Post memorable photos which <br/> caption them the best.
                        </p>
                    </div>
                    <div className="div-info">
                        <img src={Logo3} alt="" className=""/>
                        <p className="div-info-text three">Create inspiring, memorable and <br/> immortal stories
                            about
                            them.</p>
                    </div>
                    <div className="div-info">
                        <img src={Logo4} alt="" className=""/>
                        <p className="div-info-text four">That way your loved ones will never <br/> be forgotten.
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 col-12 order-1 order-lg-2">
                <div className="image">
                    <img src={Phone_Mockup} alt="" className=""/>
                </div>
            </div>
        </div>
    )
}

export default InfoComponent
