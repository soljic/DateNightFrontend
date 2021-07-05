import React, {useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Autoplay ,Pagination, Navigation} from "swiper/core";
import {SpiritusResponse} from "../../../models/SpirirtusResponse";
import iconStrelica from  "../../img/iconStrelica.svg"
import commas from  "../../img/commas.svg"
import {DataSwipper} from './DataSwiper';

import './SpiritusCarouselTest.css';
import 'swiper/swiper.min.css';

import Arrow from '../../img/arrow.svg';

SwiperCore.use([Pagination, Navigation, Autoplay]);


interface Props {
    popularSpiritus: SpiritusResponse[] | undefined;

}

function SpiritusCarousel({popularSpiritus}: Props) {
    const navigationPrev = React.useRef(null);
    const navigationNext = React.useRef(null);
    const [index, setIndex] = useState(0);
    const selectedData = DataSwipper[index];
    return (
        <>
        
            <div className="slider">
                <div className="container sliderCont">
                    <div className="row sliderCont">
                        <div className="col col-lg-8 col-md-12 col-12 carouselWidth">
                            <Swiper
                                spaceBetween={10}
                                autoplay = {{
                                  delay: 2500,
                                  disableOnInteraction: true
                                 } }
                                slidesPerView='auto'
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
                                {DataSwipper.map(item => {
                                    return (
                                        <SwiperSlide>
                                            <div className="slider-image-wrap">
                                                <img className="slider-image" src={item.image} alt={item.name} />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })}
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
                        <div className="col col-lg-4 col-md-12 col-12 colDiv">
                            <div className="sliderName">
                                <img src={iconStrelica} alt="" />
                                <p className="dateBirth">{selectedData.born}—{selectedData.deceased} • {selectedData.city.toUpperCase()}, {selectedData.country.toUpperCase()}</p>
                                <p className="fullName">{selectedData.name}</p>
                            </div>
                            <div className="sliderText">
                                <img src={commas} alt="" />
                                <p className="textParagraph">{selectedData.text1}</p>
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
