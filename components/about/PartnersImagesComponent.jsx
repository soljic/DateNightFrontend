import React from 'react';
import Image from "next/image";
import Octopus from "../../public/images/aboutPage/Octopus.png";
import Dulax from "../../public/images/aboutPage/Dulax.png";
import Poppers from "../../public/images/aboutPage/Poppers.png";

function PartnersImagesComponent(props) {
    const isMobile = false
    return (
        <div className="flex flex-col justify-center items-center  mt-16 ">
            <p className="mt-0 mb-1 px-2 sm:text-xl md:text-base  sm:w-10/12 sm:text-center md:w-full not-italic font-medium tracking-normal leading-5 opacity-60 box-border text-zinc-100">
                We have saved beautiful memories from these partners:
            </p>
            <div className="flex md:justify-center md:items-center md:w-full sm:flex-wrap sm:justify-center sm:w-60 ">
                <div className="pb-1.2">
                    <Image
                        src={Octopus}
                        alt=""
                        width={isMobile ? "100px" : "130px"}
                        height={isMobile ? "50px" : "50px"}
                        className="align-middle opacity-70 box-border"
                    />
                </div>
                <div className="pb-1.2">
                    <Image
                        src={Dulax}
                        alt=""
                        width={isMobile ? "100px" : "130px"}
                        height={isMobile ? "50px" : "50px"}
                        className="align-middle opacity-70 box-border"
                    />
                </div>
                <div className="pb-1.2">
                    <Image
                        src={Poppers}
                        alt=""
                        width={isMobile ? "100px" : "130px"}
                        height={isMobile ? "50px" : "50px"}
                        className="align-middle opacity-70 box-border"
                    />
                </div>
                <div className="pb-1.2">
                    <Image
                        src={Octopus}
                        alt=""
                        width={isMobile ? "100px" : "130px"}
                        height={isMobile ? "50px" : "50px"}
                        className="align-middle opacity-70 box-border"
                    />
                </div>
            </div>
        </div>
    );
}

export default PartnersImagesComponent;