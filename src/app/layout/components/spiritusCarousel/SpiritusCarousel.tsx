import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./SpiritusCarousel.css";
import Slider from "react-slick";
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

  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current: number, next: number) => setImageIndex(next),
  };


 
  return (
    <>
      <div className="carousel-container">
        <Link to="/featured">
          <div className="fetaured-stories">FEATURED STORIES </div>
        </Link>
        <Link to="/spiritus">
          <div className="expand-stories">Expand all stories -{">"}</div>
        </Link>
      </div>
      <hr className="line"></hr>
      <div className="carousel">
        <Slider {...settings}  >
          {popularSpiritus?.map((item) =>
            item.images.map((image, i) => (
              <div key={i} className="carousel-image">
                <img key={i} src={`http://46.101.182.89:8080${image}`} />
              </div>
            ))
          )}
        </Slider>

        <div>
          {popularSpiritus?.map((item) => (
            <li key={item.id}>
              {item.images.map((image, i) => console.log(image))}
            </li>
          ))}
        </div>
      </div>
    </>
  );
}

export default SpiritusCarousel;
