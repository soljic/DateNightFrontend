import Image from "next/image";
import AboutImage1 from "../../public/images/about/img_about_01.png";
import AboutImage2 from "../../public/images/about/img_about_02.png";
import AboutImage3 from "../../public/images/about/img_about_03.png";
import { useTranslation } from "next-i18next";

import { CheckIcon } from "@heroicons/react/outline";

export default function FeaturesSection() {
  const { t } = useTranslation("about");
  return (
    <section id="features" key={"features-section"}>
      <div className="flex justify-center items-center my-24 subpixel-antialiased mx-auto">
        <div className="flex flex-col items-center justify-start w-2/3 lg:w-1/2">
          <h2 className="font-bold text-center tracking-sp-tighten leading-5 text-sp-fawn">
            {t("term_mission")}
          </h2>
          <p className="my-2.5 text-2xl sm:w-full md:w-3/4 text-center font-bold tracking-tight dark:text-sp-white">
            {t("features_title")}
          </p>
          <p className="md:w-full text-center font-medium tracking-sp-tighten leading-5 opacity-70 dark:text-sp-white">
            {t("features_subtitle")}
          </p>
        </div>
      </div>
      <FeatureElements />
    </section>
  );
}

function FeatureElements() {
  const { t } = useTranslation("about");

  const elements = [
    {
      icon: <FirstIcon />,
      image: AboutImage1,
      title: t("feature_1_title"),
      subtitle: t("feature_1_subtitle"),
      list: [
        t("feature_1_list_1"),
        t("feature_1_list_2"),
        t("feature_1_list_3"),
      ],
    },
    {
      icon: <SecondIcon />,
      image: AboutImage2,
      title: t("feature_2_title"),
      subtitle: t("feature_2_subtitle"),
      list: [
        t("feature_2_list_1"),
        t("feature_2_list_2"),
        t("feature_2_list_3"),
      ],
    },
    {
      icon: <ThirdIcon />,
      image: AboutImage3,
      title: t("feature_3_title"),
      subtitle: t("feature_3_subtitle"),
      list: [
        t("feature_3_list_1"),
        t("feature_3_list_2"),
        t("feature_3_list_3"),
      ],
    },
  ];

  return (
    <div className="">
      {elements.map((elem, idx) => {
        return (
          <article
            key={`article-${idx}`}
            className={`flex flex-col-reverse ${
              idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } justify-center items-center mb-3 px-2 gap-4 my-16`}
          >
            <div
              className="w-full md:w-1/2 flex flex-col items-start justify-start px-1 mb-3"
              key={`feature-${idx}`}
            >
              <div className="bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-10 p-2.5">
                {elem.icon}
              </div>
              <h3 className="my-4 text-[22px] font-bold tracking-wide leading-6 dark:text-sp-white">
                {elem.title}
              </h3>
              <p className="mb-4 tracking-sp-tighten text-[13px] font-medium leading-[18px] opacity-70 dark:text-sp-white">
                {elem.subtitle}
              </p>

              <ul className="list-none text-[13px] leading-[18px] font-medium tracking-sp-tighten dark:text-sp-white">
                {elem.list.map((item, i) => {
                  return (
                    <li className="flex items-center" key={`item-${idx}-${i}`}>
                      <div className="bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown rounded-full p-0.5">
                        <CheckIcon className="w-3.5 h-3.5 text-sp-dark-fawn" />
                      </div>
                      <p className="mt-0 mb-1 px-2  not-italic font-medium tracking-normal leading-5 opacity-70 dark:text-sp-white">
                        {item}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="w-full md:w-1/2 bg-gradient-to-r relative from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-14">
              <Image
                src={elem.image}
                width={510}
                height={510}
                layout="responsive"
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function FirstIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.9992 5.59995C10.9992 8.58229 8.58156 11 5.59922 11C2.61688 11 0.199219 8.58229 0.199219 5.59995C0.199219 2.61761 2.61688 0.199951 5.59922 0.199951C8.58156 0.199951 10.9992 2.61761 10.9992 5.59995ZM6.19922 3.19995C6.19922 2.86858 5.93059 2.59995 5.59922 2.59995C5.26785 2.59995 4.99922 2.86858 4.99922 3.19995V4.99995H3.19922C2.86785 4.99995 2.59922 5.26858 2.59922 5.59995C2.59922 5.93132 2.86785 6.19995 3.19922 6.19995H4.99922L4.99922 7.99995C4.99922 8.33132 5.26785 8.59995 5.59922 8.59995C5.93059 8.59995 6.19922 8.33132 6.19922 7.99995V6.19995H7.99922C8.33059 6.19995 8.59922 5.93132 8.59922 5.59995C8.59922 5.26858 8.33059 4.99995 7.99922 4.99995H6.19922V3.19995ZM15.7992 3.79995L11.9508 3.79995C11.8324 3.38158 11.6739 2.9801 11.4796 2.59995L15.7992 2.59995C17.7164 2.59995 19.2836 4.09866 19.3931 5.98842L19.3992 6.19995L19.3992 11.4544C19.3992 12.0202 19.1994 12.5654 18.8389 12.9956L18.6963 13.1514L13.1507 18.697C12.7506 19.0971 12.2238 19.3413 11.6647 19.3907L11.4536 19.4L6.19922 19.4C4.282 19.4 2.71483 17.9012 2.60533 16.0115L2.59922 15.8L2.59922 11.4803C2.97937 11.6746 3.38085 11.8332 3.79922 11.9515L3.79922 15.8C3.79922 17.0652 4.77827 18.1017 6.0201 18.1934L6.19922 18.2H10.9992L10.9992 14.6C10.9992 12.6827 12.4979 11.1156 14.3877 11.0061L14.5992 11L18.1992 11V6.19995C18.1992 4.93472 17.2202 3.89815 15.9783 3.80653L15.7992 3.79995ZM17.9382 12.2016L14.5992 12.2C13.334 12.2 12.2974 13.179 12.2058 14.4208L12.1992 14.6L12.1992 17.9372L12.3022 17.8485L17.8477 12.3029C17.88 12.2707 17.9101 12.2368 17.9382 12.2016Z"
        fill="url(#paint0_linear_7360_1154)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7360_1154"
          x1="0.199219"
          y1="9.79994"
          x2="19.3992"
          y2="9.79994"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SecondIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99961 9.39932C10.3251 9.39932 11.3996 8.3248 11.3996 6.99932C11.3996 5.67383 10.3251 4.59932 8.99961 4.59932C7.67413 4.59932 6.59961 5.67383 6.59961 6.99932C6.59961 8.3248 7.67413 9.39932 8.99961 9.39932ZM8.99961 15.3993C11.9996 15.3993 13.1996 13.8936 13.1996 12.3993C13.1996 11.4052 12.3937 10.5993 11.3996 10.5993H6.59961C5.6055 10.5993 4.79961 11.4052 4.79961 12.3993C4.79961 13.8992 5.99961 15.3993 8.99961 15.3993ZM9.33243 0.500672C9.13089 0.366312 8.86833 0.366312 8.66679 0.500672C6.34096 2.05123 3.82561 3.01867 1.11476 3.40593C0.819167 3.44816 0.599609 3.70131 0.599609 3.9999V9.3999C0.599609 14.0695 3.368 17.4767 8.78422 19.5599C8.92286 19.6132 9.07635 19.6132 9.215 19.5599C14.6312 17.4767 17.3996 14.0695 17.3996 9.3999V3.9999C17.3996 3.70131 17.1801 3.44816 16.8845 3.40593C14.1736 3.01867 11.6583 2.05123 9.33243 0.500672ZM1.79961 4.51334C4.1821 4.10856 6.4229 3.27518 8.51857 2.01489L8.99961 1.71648L9.48065 2.01489C11.5763 3.27518 13.8171 4.10856 16.1996 4.51334V9.3999C16.1996 13.4704 13.8381 16.4359 8.99961 18.3558C4.16114 16.4359 1.79961 13.4704 1.79961 9.3999V4.51334Z"
        fill="url(#paint0_linear_7360_6025)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7360_6025"
          x1="0.599609"
          y1="9.99989"
          x2="17.3996"
          y2="9.99989"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ThirdIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      className={`${w} ${h}`}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.99951 5.05012C9.5518 5.05012 9.99951 4.60241 9.99951 4.05012C9.99951 3.49784 9.5518 3.05012 8.99951 3.05012C8.44723 3.05012 7.99951 3.49784 7.99951 4.05012C7.99951 4.60241 8.44723 5.05012 8.99951 5.05012ZM16.1991 14.0088V7.60008H16.3107C17.3826 7.60008 17.8214 6.22317 16.9472 5.60293L9.92528 0.621223C9.37077 0.227828 8.62821 0.22782 8.0737 0.621207L1.05155 5.60292C0.177277 6.22315 0.616093 7.60008 1.68803 7.60008H1.79912L1.79912 14.0088C1.07746 14.4708 0.599121 15.2796 0.599121 16.2001L0.599121 17.8001C0.599121 18.1314 0.86775 18.4001 1.19912 18.4001L16.7991 18.4001C17.1305 18.4001 17.3991 18.1314 17.3991 17.8001V16.2001C17.3991 15.2796 16.9208 14.4708 16.1991 14.0088ZM8.76803 1.59993C8.90666 1.50158 9.0923 1.50159 9.23093 1.59993L15.9969 6.40008L12.0016 6.40008L11.9991 6.40007L11.9966 6.40008L2.00181 6.40008L8.76803 1.59993ZM14.9991 7.60008V13.6077C14.9331 13.6026 14.8664 13.6001 14.7991 13.6001H12.5991L12.5991 7.60008L14.9991 7.60008ZM2.99912 13.6077L2.99912 7.60008L5.39912 7.60008L5.39912 13.6001H3.19912C3.13183 13.6001 3.06513 13.6026 2.99912 13.6077ZM3.19912 14.8001L14.7991 14.8001C15.5723 14.8001 16.1991 15.4269 16.1991 16.2001L16.1991 17.2001L1.79912 17.2001L1.79912 16.2001C1.79912 15.4269 2.42592 14.8001 3.19912 14.8001ZM8.39912 13.6001H6.59912L6.59912 7.60008H8.39912L8.39912 13.6001ZM9.59912 13.6001L9.59912 7.60008H11.3991L11.3991 13.6001H9.59912Z"
        fill="url(#paint0_linear_7360_2690)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7360_2690"
          x1="0.585938"
          y1="9.36311"
          x2="17.4128"
          y2="9.36311"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
