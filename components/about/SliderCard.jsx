import React from "react";
import Ellipse from "../../public/images/aboutPage/EllipseEmpty.png";
import Octopus from "../../public/images/aboutPage/Octopus.png";
import Image from "next/legacy/image";

function SliderCard(props) {
  const isMobile = false;
  return (
    <div className="mb-3 mt-16 flex items-center rounded-2xl border-3 border-sp-brown py-4 pl-4 sm:h-[480px]  md:w-72 md:justify-start lg:mb-3 lg:w-[353px]">
      <div className="sm:w-[466px ] mb-3 box-border flex flex-col items-start justify-start py-0 sm:pl-10 md:w-[200px] md:pl-1 lg:mb-3 lg:w-64">
        <Image
          src={Octopus}
          alt=""
          width={isMobile ? "122px" : ""}
          height={isMobile ? "50px" : ""}
          className="box-border align-middle opacity-70"
        />
        <div className=" align-center  my-4 box-border flex  justify-center text-center font-medium not-italic leading-7 text-zinc-100 tracking-normal sm:w-[386px] md:w-[233px] md:justify-start lg:w-[375px]">
          <span className="w-5 text-sp-fawn text-2xl">“</span>
          <p className="sm:w-[387px ] box-border pl-1 text-left not-italic leading-7  text-zinc-100 tracking-normal sm:text-2xl md:w-64 md:font-medium md:text-base">
            Until now, the only people that aren't forgotten are famous ones. We
            believe that every person has a story worth telling and remembering.
          </p>
        </div>
        <div className="align-center mt-12 flex justify-center">
          <div className="mt-4 sm:mr-5 sm:w-10 md:mr-4 md:w-10">
            <Image
              width={isMobile ? "54px" : "44px"}
              height={isMobile ? "54px" : "44px"}
              src={Ellipse}
            />
          </div>

          <div className="align-center flex flex-col justify-center">
            <p className="md:text-small my-1 box-border w-96 text-left font-medium not-italic leading-7 text-zinc-100 tracking-normal sm:text-xl">
              Name Surname
            </p>
            <p className=" md:text-small box-border w-96 text-left font-medium not-italic leading-7 text-zinc-100 opacity-60 tracking-normal sm:text-xl">
              CEO, Company
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SliderCard;
