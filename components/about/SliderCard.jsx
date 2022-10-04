import React from "react";
import Ellipse from "../../public/images/aboutPage/EllipseEmpty.png";
import Octopus from "../../public/images/aboutPage/Octopus.png";
import Image from "next/image";


function SliderCard(props) {
    const isMobile = false
    return (
        <div
            className="flex md:justify-start items-center mt-16 pl-4 py-4 border-sp-brown border-3 rounded-2xl sm:h-[480px]  md:w-72 mb-3 lg:mb-3 lg:w-[353px]">
            <div
                className="flex flex-col items-start justify-start py-0 sm:pl-10 mb-3 sm:w-[466px ] md:pl-1 md:w-[200px] box-border lg:mb-3 lg:w-64">
                <Image
                    src={Octopus}
                    alt=""
                    width={isMobile ? "122px" : ""}
                    height={isMobile ? "50px" : ""}
                    className="align-middle opacity-70 box-border"
                />
                <div
                    className=" flex  justify-center align-center md:justify-start  my-4 sm:w-[386px] md:w-[233px] lg:w-[375px] text-center not-italic font-medium tracking-normal leading-7 box-border text-zinc-100">
                    <span className="text-sp-fawn text-2xl w-5">“</span>
                    <p className="md:text-base sm:text-2xl sm:w-[387px ] md:w-64 text-left not-italic  md:font-medium tracking-normal leading-7 box-border text-zinc-100 pl-1">Until
                        now, the only people that aren't forgotten are famous ones. We
                        believe that every person has a story worth telling and remembering.</p>
                </div>
                <div className="flex justify-center align-center mt-12">
                    <div className="sm:w-10 md:w-10 mt-4 sm:mr-5 md:mr-4">
                        <Image
                            width={isMobile ? "54px" : "44px"}
                            height={isMobile ? "54px" : "44px"}
                            src={Ellipse}
                        />
                    </div>

                    <div className="flex flex-col justify-center align-center">
                        <p className="my-1 md:text-small sm:text-xl w-96 text-left not-italic font-medium tracking-normal leading-7 box-border text-zinc-100">
                            Name Surname
                        </p>
                        <p className=" md:text-small sm:text-xl w-96 text-left not-italic font-medium tracking-normal leading-7 opacity-60 box-border text-zinc-100">
                            CEO, Company
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default SliderCard;
