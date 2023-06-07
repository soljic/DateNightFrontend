import React from "react";
import Image from "next/legacy/image";
import Octopus from "../../public/images/aboutPage/Octopus.png";
import Dulax from "../../public/images/aboutPage/Dulax.png";
import Poppers from "../../public/images/aboutPage/Poppers.png";

function PartnersImagesComponent(props) {
  const isMobile = false;
  return (
    <div className="mt-16 flex flex-col items-center  justify-center ">
      <p className="mb-1 mt-0 box-border px-2 font-medium  not-italic leading-5 text-zinc-100 opacity-60 tracking-normal sm:w-10/12 sm:text-center sm:text-xl md:w-full md:text-base">
        We have saved beautiful memories from these partners:
      </p>
      <div className="flex sm:w-60 sm:flex-wrap sm:justify-center md:w-full md:items-center md:justify-center ">
        <div className="pb-1.2">
          <Image
            src={Octopus}
            alt=""
            width={isMobile ? "100px" : "130px"}
            height={isMobile ? "50px" : "50px"}
            className="box-border align-middle opacity-70"
          />
        </div>
        <div className="pb-1.2">
          <Image
            src={Dulax}
            alt=""
            width={isMobile ? "100px" : "130px"}
            height={isMobile ? "50px" : "50px"}
            className="box-border align-middle opacity-70"
          />
        </div>
        <div className="pb-1.2">
          <Image
            src={Poppers}
            alt=""
            width={isMobile ? "100px" : "130px"}
            height={isMobile ? "50px" : "50px"}
            className="box-border align-middle opacity-70"
          />
        </div>
        <div className="pb-1.2">
          <Image
            src={Octopus}
            alt=""
            width={isMobile ? "100px" : "130px"}
            height={isMobile ? "50px" : "50px"}
            className="box-border align-middle opacity-70"
          />
        </div>
      </div>
    </div>
  );
}

export default PartnersImagesComponent;
