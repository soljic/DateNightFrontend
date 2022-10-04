import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "next-i18next";

import { XIcon } from "@heroicons/react/outline";

import hero from "../../public/images/about/hero.png";

export default function Hero() {
  const { t } = useTranslation("about");
  const [showModal, setShowModal] = useState(false);

  return (
    <section id="hero" key="hero-section">
      <div className="my-20 flex justify-center">
        <VideoModal showModal={showModal} setShowModal={setShowModal} />
        <div className="flex flex-col justify-center items-center mt-4 w-full sm:w-full md:w-3/4 lg:w-2/3">
          <h1 className="font-bold text-cta tracking-tight dark:text-sp-white text-center mb-3">
            {t("hero_title")}{" "}
            <span className="underline decoration-sp-fawn underline-offset-8">
              {t("hero_title_keyword")}
            </span>
          </h1>
          <p className="dark:text-sp-white text-lg font-medium text-center tracking-sp-tighten leading-6 mb-3 mt-2">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col md:flex-row w-full md:w-3/4 gap-2.5 mt-5 justify-center items-center">
            <button
              onClick={() => setShowModal(true)}
              className="w-full md:w-1/2"
            >
              <div className="w-full inline-flex justify-center items-center border-sp-medium border rounded-sp-40 py-4 px-5 text-sp-black dark:text-sp-white gap-1">
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  className="fill-sp-black dark:fill-sp-white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.5 0C5.87258 0 0.5 5.37258 0.5 12C0.5 18.6274 5.87258 24 12.5 24C19.1274 24 24.5 18.6274 24.5 12C24.5 5.37258 19.1274 0 12.5 0ZM11.2658 7.27776L17.7709 11.1401C18.4235 11.5276 18.4235 12.4724 17.7709 12.8598L11.2658 16.7222C10.2659 17.3159 9 16.5953 9 15.4324V8.56754C9 7.40469 10.2659 6.68408 11.2658 7.27776Z"
                    // fill="#F0EFED"
                  />
                </svg>

                <span className="font-semibold tracking-sp-tighten">
                  {t("hero_intro_video")}
                </span>
              </div>
            </button>
            <Link href="mailto:hello@spiritus.app?subject=Hello!">
              <a className="w-full md:w-1/2 flex justify-center items-center bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-4 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-sp-40 py-3.5 px-5 font-semibold text-sp-black gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.5014 0.5C17.8527 0.5 23.0014 5.64873 23.0014 12C23.0014 18.3513 17.8527 23.5 11.5014 23.5C9.55138 23.5 7.67162 23.0132 6.00126 22.1018L1.27666 23.4623C0.745935 23.6151 0.19183 23.3087 0.0390329 22.778C-0.0130543 22.5971 -0.0130103 22.4052 0.0391614 22.2242L1.40095 17.5025C0.487902 15.8299 0.00144902 13.9497 0.00144902 12C0.00144902 5.64873 5.15017 0.5 11.5014 0.5ZM12.2497 13.5H7.75145L7.64968 13.5068C7.2836 13.5565 7.00145 13.8703 7.00145 14.25C7.00145 14.6297 7.2836 14.9435 7.64968 14.9932L7.75145 15H12.2497L12.3515 14.9932C12.7176 14.9435 12.9997 14.6297 12.9997 14.25C12.9997 13.8703 12.7176 13.5565 12.3515 13.5068L12.2497 13.5ZM15.2559 9H7.75145L7.64968 9.00685C7.2836 9.05651 7.00145 9.3703 7.00145 9.75C7.00145 10.1297 7.2836 10.4435 7.64968 10.4932L7.75145 10.5H15.2559L15.3577 10.4932C15.7238 10.4435 16.0059 10.1297 16.0059 9.75C16.0059 9.3703 15.7238 9.05651 15.3577 9.00685L15.2559 9Z"
                    fill="#171411"
                  />
                </svg>
                <span className="font-semibold tracking-sp-tighten">
                  {t("hero_contact")}
                </span>
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center max-w-full max-h-fit text-neutral-800">
        <Image src={hero} alt="Representative spiritus" priority/>
      </div>
    </section>
  );
}

function VideoModal({ showModal, setShowModal }) {
  return (
    <>
      {showModal ? (
        <>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none w-full h-screen">
            <div className="flex justify-center items-center w-full h-full px-4">
              {/*content*/}
              <div className="w-full lg:w-2/3 h-1/3 lg:h-1/3 outline-none focus:outline-none">
                <div className="flex justify-end mb-4">
                  <button
                    onClick={() => setShowModal(false)}
                    type="button"
                    className="inline-flex items-center justify-center text-gray-200 rounded-full p-0.5 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span class="sr-only">Close menu</span>

                    <XIcon className="w-6 h-6" />
                  </button>
                </div>
                <iframe
                  className="w-full h-full border border-sp-lighter"
                  src={
                    "//www.youtube.com/embed/nH1AcuiIkYs?autoplay=1&cc_load_policy=1&controls=1&disablekb=0&enablejsapi=0&fs=1&iv_load_policy=1&loop=0&rel=0&showinfo=1&start=0&wmode=transparent&theme=dark&mute=0"
                  }
                  frameborder="2"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
