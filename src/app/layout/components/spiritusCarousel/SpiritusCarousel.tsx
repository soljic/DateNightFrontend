import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./SpiritusCarousel.css";
import Slider, {LazyLoadTypes} from "react-slick";
import { SpiritusResponse } from "../../../models/SpirirtusResponse";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

interface Props {
  popularSpiritus: SpiritusResponse[] | undefined;
 
}

function SpiritusCarousel({ popularSpiritus }: Props) {

  interface Carousle {
    onClick: () => void
  }


  const NextArrow = ({ onClick }: Carousle ) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };

  const PrevArrow = ({ onClick }: Carousle ) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };
  const settings = {
    infinite: true,
    lazyLoad: 'ondemand' as LazyLoadTypes,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: '0',
    nextArrow: <NextArrow onClick={() => {}} />,
    prevArrow: <PrevArrow onClick={() => {}} />,
    beforeChange: (current: number, next: number) => setImageIndex(next),
  };
  const [imageIndex, setImageIndex] = useState(0);


 
  return (
    <>
      <div className="carousel-container">
        <Link to="/featured">
          <div className="fetaured-stories">FEATURED STORIES </div>
        </Link>
  
      </div>
      <hr className="line"></hr>
      <div className="carousel">
      <Slider {...settings} >
          {popularSpiritus?.map((item) =>
            item.images.map((image, idx) => (
              <div key={idx} className={idx === imageIndex ? "slide activeSlide" : "slide"}>
                <img key={idx} src={`http://46.101.182.89:8080${item.images[0].url}`} />
              </div>
            ))
          )}
        </Slider>

        <div>
          {popularSpiritus?.map((item) => (
            <li key={item.id}>
              {item.images.map((image, i) => console.log(item.images[0].url  ))}
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default SpiritusCarousel;
