import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Pagination, Navigation} from "swiper/core";
import {SpiritusResponse} from "../../../models/SpirirtusResponse";

import './SpiritusCarouselTest.css';
import 'swiper/swiper.min.css';

import SliderImage1 from '../../img/slider-1.jpeg';
import SliderImage2 from '../../img/slider-2.jpeg';
import SliderImage3 from '../../img/slider-3.jpeg';
import Arrow from '../../img/arrow.svg';

SwiperCore.use([Pagination, Navigation]);

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
            <div className="slider-container">
                <Link to="/featured">
                    <div className="fetaured-stories">FEATURED STORIES</div>
                </Link>
            </div>
            <hr className="line"></hr>
            <div className="slider">
                <div className="container">
                    <div className="row">
                        <div className="col col-8">
                            <Swiper
                                spaceBetween={10}
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
                                <SwiperSlide>
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
                        <div className="col col-4">
                            Text
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SpiritusCarousel;
