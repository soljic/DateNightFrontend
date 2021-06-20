import React, {useEffect, useState} from "react";
import NavBar from "../../app/layout/components/navBar/NavBar";
import Header from "../../app/layout/components/header/Header";
import EmailInput from "../../app/layout/components/emailInput/EmailInput";
import HeaderThree from "../../app/layout/components/headerThree/HeaderThree";
import CommingSoon from "../../app/layout/components/comingSoon/CommingSoon";
import FetauredStories from "../../app/layout/components/fetauredStories/FetauredStories";
import Accordion from "../../app/layout/components/accordion/Accordion";
import Footer from "../../app/layout/components/footer/Footer";
import {DataAccordion} from "../../app/layout/components/accordion/DataAccordion";
import {useStore} from "../../app/stores/store";
import "./HomePage.css";
import {Button} from "antd";
import {Link} from "react-router-dom";
import SpiritusCarousel from "../../app/layout/components/spiritusCarousel/SpiritusCarousel";
import {SpiritusResponse} from "../../app/models/SpirirtusResponse";
import InfoComponent from "../../app/layout/components/infoComponent/InfoComponent";
import CsButton from "../../app/layout/components/csbutton/CsButton";

function HomePage() {
    const {activityStore} = useStore();
    const {loadPopularSpiritus} = activityStore;
    const [popularSpiritus, setPopular] =
        useState<SpiritusResponse[] | undefined>(undefined);

    const [active, setActive] =
        useState<string | undefined>("What is Spiritus?");

    useEffect(() => {
        const getPopular = loadPopularSpiritus().then((response) => {
            const popular: SpiritusResponse[] | undefined = response;
            setPopular(popular);
            // eslint-disable-next-line
        });
    }, []);

    console.log(popularSpiritus);


    return (
        <>
            <NavBar/>

            <div className="">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col col-2">
                                <CsButton/>
                            </div>
                        </div>
                    </div>
                    <Header/>
                    <HeaderThree/>

                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col col-4">
                                <EmailInput/>
                            </div>
                        </div>
                    </div>
                    <FetauredStories/>
                    <SpiritusCarousel popularSpiritus={popularSpiritus}/>
                    <div className="container">
                        <div className="row">
                            <div className="col col-1 "></div>
                            <div className="col col-10  ">
                                <div className="text-container">
                                    <p>
                                        {" "}
                                        Life is much more than some dates and names.{" "}
                                        <span className="text-highlight">
                      Life is about memorable stories that your loved ones left
                      behind. That's why we created a platform for posting
                      digital memorials.
                    </span>
                                    </p>
                                </div>

                                <div className="col col-1 "></div>
                            </div>
                        </div>
                    </div>
                    <div className="container-info">
                        <div className="container">
                            <InfoComponent/>
                        </div>
                    </div>
                    <CommingSoon/>

                    <div className="container" id="accordion">
                        <div className="row justify-content-center">
                            <div className="col col-11 col-md-10">
                                {DataAccordion.map((item, index) => (
                                    <Accordion title={item.title} key={index} text1={item.text1} text2={item.text2}/>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default HomePage;
