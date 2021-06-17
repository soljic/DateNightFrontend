import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import {SpiritusResponse} from "../../../models/SpirirtusResponse";
import './SpiritusCarouselTest.css';
// Import Swiper styles
import 'swiper/swiper.min.css';

import SliderImage1 from '../../img/slider-1.jpeg';
import SliderImage2 from '../../img/slider-2.jpeg';
import SliderImage3 from '../../img/slider-3.jpeg';

interface Props {
    popularSpiritus: SpiritusResponse[] | undefined;

}
function SpiritusCarousel({popularSpiritus}: Props) {

    // className={idx === imageIndex ? "slide activeSlide" : "slide"}
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
                                spaceBetween={1}
                                slidesPerView={3}
                                loop={true}
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                <SwiperSlide>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage1}/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage2}/>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide>
                                    <div className="slider-image-wrap">
                                        <img className="slider-image" src={SliderImage3}/>
                                    </div>
                                </SwiperSlide>
                            </Swiper>
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
