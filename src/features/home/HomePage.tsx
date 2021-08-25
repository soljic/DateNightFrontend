import React, { useEffect, useState } from "react";
import NavBar from "../../app/layout/components/navBar/NavBar";
import Header from "../../app/layout/components/header/Header";
import EmailInput from "../../app/layout/components/emailInput/EmailInput";
import HeaderThree from "../../app/layout/components/headerThree/HeaderThree";
import CommingSoon from "../../app/layout/components/comingSoon/CommingSoon";
import FetauredStories from "../../app/layout/components/fetauredStories/FetauredStories";
import Accordion from "../../app/layout/components/accordion/Accordion";
import Footer from "../../app/layout/components/footer/Footer";
import { DataAccordion } from "../../app/layout/components/accordion/DataAccordion";
import { useStore } from "../../app/stores/store";
import "./HomePage.scss";
import { Button } from "antd";
import { Link } from "react-router-dom";
import SpiritusCarousel from "../../app/layout/components/spiritusCarousel/SpiritusCarousel";
import { SpiritusResponse } from "../../app/models/SpirirtusResponse";
import InfoComponent from "../../app/layout/components/infoComponent/InfoComponent";
import CsButton from "../../app/layout/components/csbutton/CsButton";
import PlayButton from "../../app/layout/components/playButton/PlayButton";
import ResponsivePlayer from "../../app/layout/components/responsivePlayer/ResponsivePlayer";
import { observer } from "mobx-react-lite";
import VideoModal from "../../app/layout/components/videoModal/VideoModal";

function HomePage() {
  const { activityStore } = useStore();
  const { loadPopularSpiritus, isPlay } = activityStore;
  const [popularSpiritus, setPopular] = useState<
    SpiritusResponse[] | undefined
  >(undefined);

  const [active, setActive] = useState<string | undefined>("What is Spiritus?");
 
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
      <NavBar />
      <div className="">
        <main>
        
          <div className="container">
            <div className="row justify-content-center rowHeaders">
              <div className="col col-12">
                <CsButton />
                <Header />
                <HeaderThree />
                <EmailInput />
              </div>
              <VideoModal />  
            </div>
          </div>

          <FetauredStories />
          <SpiritusCarousel popularSpiritus={popularSpiritus} />
          <div className="container topContainer">
            <div className="row">
              <div className="col col-10 lifeText ">
                <div className="text-container contLife">
                  <p>
                    {" "}
                    Life is much more than some dates and names.{" "}
                    <span className="text-highlight">
                      Life is about memorable stories that your loved ones left behind.That's why we created a platform for posting digital memorials.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="container-info">
            <div className="container">
              <InfoComponent />
            </div>
          </div>
          <CommingSoon />

          <div className="container accordionCont">
            <div className="row justify-content-center accordionRow">
              <div className="col col-11 col-md-10">
                <div className="borderBottom">
                {DataAccordion.map((item, index) => (
                  <Accordion
                    title={item.title}
                    key={index}
                    text1={item.text1}
                    text2={item.text2}
                  />
                ))}
              </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default observer(HomePage);
