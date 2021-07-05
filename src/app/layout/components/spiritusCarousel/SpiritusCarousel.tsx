import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import { SpiritusResponse } from "../../../models/SpirirtusResponse";
import iconStrelica from "../../img/iconStrelica.svg";
import commas from "../../img/commas.svg";
import { DataSwipper } from "./DataSwiper";

import "./SpiritusCarouselTest.css";
import "swiper/swiper.min.css";

import Arrow from "../../img/arrow.svg";

SwiperCore.use([Pagination, Navigation, Autoplay]);

interface Props {
  popularSpiritus: SpiritusResponse[] | undefined;
}

function SpiritusCarousel({ popularSpiritus }: Props) {
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
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: true,
                }}
                slidesPerView="auto"
                loop={true}
                onSlideChange={(swiper) => {
                  setIndex(swiper.realIndex);
                }}
                onSwiper={(swiper) => {
                  setIndex(swiper.realIndex);
                }}
                centeredSlides={true}
                navigation={{
                  prevEl: navigationPrev.current!, // Assert non-null
                  nextEl: navigationNext.current!, // Assert non-null
                }}
                pagination={{
                  el: ".swiper-pagination",
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className}"></span>`;
                  },
                }}
              >
                {DataSwipper.map((item) => {
                  return (
                    <SwiperSlide>
                      <div className="slider-image-wrap">
                        <img
                          className="slider-image"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="slider-nav">
                <div className="slider-arrow-left" ref={navigationPrev}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0013 0.332031C5.55798 0.332031 0.334633 5.55538 0.334633 11.9987C0.334633 18.442 5.55798 23.6654 12.0013 23.6654C18.4446 23.6654 23.668 18.442 23.668 11.9987C23.668 5.55538 18.4446 0.332031 12.0013 0.332031ZM12.0013 2.08203C17.4781 2.08203 21.918 6.52187 21.918 11.9987C21.918 17.4755 17.4781 21.9154 12.0013 21.9154C6.52448 21.9154 2.08463 17.4755 2.08463 11.9987C2.08463 6.52187 6.52448 2.08203 12.0013 2.08203ZM12.4131 6.81063L12.3284 6.71249C12.0177 6.40185 11.5316 6.37361 11.1891 6.62777L11.0909 6.71249L6.42329 11.3801C6.1126 11.6908 6.0844 12.177 6.33866 12.5195L6.42341 12.6177L11.0919 17.2843C11.4336 17.626 11.9876 17.6259 12.3293 17.2841C12.6399 16.9734 12.668 16.4873 12.4138 16.1448L12.3291 16.0467L9.15347 12.8725L16.9605 12.8729C17.4034 12.8729 17.7695 12.5437 17.8275 12.1166L17.8355 11.9979C17.8355 11.5549 17.5063 11.1888 17.0792 11.1309L16.9605 11.1229L9.1558 11.1225L12.3284 7.94993C12.639 7.63928 12.6672 7.15318 12.4131 6.81063L12.3284 6.71249L12.4131 6.81063Z"
                      fill="#F0EFED"
                    />
                  </svg>
                </div>
                <div className="swiper-pagination" />
                <div className="slider-arrow-right" ref={navigationNext}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0013 0.332031C5.55798 0.332031 0.334633 5.55538 0.334633 11.9987C0.334633 18.442 5.55798 23.6654 12.0013 23.6654C18.4446 23.6654 23.668 18.442 23.668 11.9987C23.668 5.55538 18.4446 0.332031 12.0013 0.332031ZM12.0013 2.08203C17.4781 2.08203 21.918 6.52187 21.918 11.9987C21.918 17.4755 17.4781 21.9154 12.0013 21.9154C6.52448 21.9154 2.08463 17.4755 2.08463 11.9987C2.08463 6.52187 6.52448 2.08203 12.0013 2.08203ZM12.4131 6.81063L12.3284 6.71249C12.0177 6.40185 11.5316 6.37361 11.1891 6.62777L11.0909 6.71249L6.42329 11.3801C6.1126 11.6908 6.0844 12.177 6.33866 12.5195L6.42341 12.6177L11.0919 17.2843C11.4336 17.626 11.9876 17.6259 12.3293 17.2841C12.6399 16.9734 12.668 16.4873 12.4138 16.1448L12.3291 16.0467L9.15347 12.8725L16.9605 12.8729C17.4034 12.8729 17.7695 12.5437 17.8275 12.1166L17.8355 11.9979C17.8355 11.5549 17.5063 11.1888 17.0792 11.1309L16.9605 11.1229L9.1558 11.1225L12.3284 7.94993C12.639 7.63928 12.6672 7.15318 12.4131 6.81063L12.3284 6.71249L12.4131 6.81063Z"
                      fill="#F0EFED"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="col col-lg-4 col-md-12 col-12 colDiv">
              <div className="sliderName">
                <img src={iconStrelica} alt="" />
                <p className="dateBirth">
                  {selectedData.born}—{selectedData.deceased} •{" "}
                  {selectedData.city.toUpperCase()},{" "}
                  {selectedData.country.toUpperCase()}
                </p>
                <p className="fullName">{selectedData.name}</p>
              </div>
              <div className="sliderText">
                <img src={commas} alt="" />
                <p className="textParagraph">{selectedData.text1}</p>
              </div>
              <div className="storiesCsbutton">Stories coming soon</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpiritusCarousel;
