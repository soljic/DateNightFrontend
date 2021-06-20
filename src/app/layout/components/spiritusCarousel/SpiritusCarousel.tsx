import React, {useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay ,Pagination, Navigation} from "swiper/core";
import {SpiritusResponse} from "../../../models/SpirirtusResponse";
import ShapeShape from  "../../img/ShapeShape.svg"
import commas from  "../../img/commas.svg"
import {DataSwipper} from './DataSwiper';

import './SpiritusCarouselTest.css';
import 'swiper/swiper.min.css';


import SliderImage1 from '../../img/slider-1.jpeg';
import SliderImage2 from '../../img/slider-2.jpeg';
import SliderImage3 from '../../img/slider-3.jpeg';
import Arrow from '../../img/arrow.svg';

SwiperCore.use([Pagination, Navigation, Autoplay]);


interface Props {
    popularSpiritus: SpiritusResponse[] | undefined;

}

function SpiritusCarousel({popularSpiritus}: Props) {
    const navigationPrev = React.useRef(null);
    const navigationNext = React.useRef(null);
    const [index, setIndex] = useState(0);
    console.log(index);
    return (
        <>
        
            <div className="slider">
                <div className="container sliderCont">
                    <div className="row sliderCont">
                        <div className="col col-8">
                            <Swiper
                                spaceBetween={10}
                                autoplay = {{
                                  delay: 2500,
                                  disableOnInteraction: true
                                 } }
                                slidesPerView={3}
                                loop={true}
                                onSlideChange={(swiper) => {
                                    setIndex(swiper.realIndex)
                                }}
                                onSwiper={(swiper) => {
                                    setIndex(swiper.realIndex)
                                }}
                                centeredSlides={true}
                                navigation={{
                                    prevEl: navigationPrev.current!, // Assert non-null
                                    nextEl: navigationNext.current!, // Assert non-null
                                }}
                                pagination={
                                    {
                                        el: '.swiper-pagination',
                                        clickable: true,
                                        renderBullet: (index, className) => {
                                            return `<span class="${className}"></span>`;
                                        }
                                    }
                                }
                            >
                                <SwiperSlide style={{height:'540px'}}>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage1} alt="SliderImage1"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage2} alt="SliderImage1"/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage3} alt="SliderImage1"/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                            <div className="slider-nav">
                                <div className="slider-arrow-left" ref={navigationPrev}>
                                    <img src={Arrow} alt="arrow"/>
                                </div>
                                <div className="swiper-pagination"/>
                                <div className="slider-arrow-right" ref={navigationNext}>
                                    <img src={Arrow} alt="arrow"/>
                                </div>
                            </div>
                        </div>
                        <div className="col col-4 colDiv">
                            <div className="sliderName">
                                <img src={ShapeShape} alt="" />
                                <p className="dateBirth">1926—1998 • FORTALEZA, MEXICO</p>
                                <p className="fullName">Ronald Richards</p>
                            </div>
                            <div className="sliderText">
                                <img src={commas} alt="" />
                                <p className="textParagraph">While the extreme poverty has declined everywhere, the middle class has hardly expanded at all in South Asia and Africa.</p>
                            </div>
                            <div className="storiesCsbutton">
                                Stories coming soon
                            </div>
                         
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpiritusCarousel;
