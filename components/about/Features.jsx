import Image from "next/legacy/image";
import AboutImage1 from "../../public/images/about/img_about_01.png";
import AboutImage2 from "../../public/images/about/img_about_02.png";
import AboutImage3 from "../../public/images/about/img_about_03.png";
import { useTranslation } from "next-i18next";

import { CheckIcon } from "@heroicons/react/outline";

export default function FeaturesSection() {
  const { t } = useTranslation("about");
  return (
    <section id="features" key={"features-section"}>
      <div className="mx-auto my-24 flex items-center justify-center subpixel-antialiased">
        <div className="flex w-2/3 flex-col items-center justify-start lg:w-1/2">
          <h2 className="text-center font-bold leading-5 text-sp-fawn tracking-sp-tighten">
            {t("term_mission")}
          </h2>
          <p className="my-2.5 text-center font-bold text-2xl tracking-tight dark:text-sp-white sm:w-full md:w-3/4">
            {t("features_title")}
          </p>
          <p className="text-center font-medium leading-5 opacity-70 tracking-sp-tighten dark:text-sp-white md:w-full">
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
            } my-16 mb-3 items-center justify-center gap-4 px-2`}
          >
            <div
              className="mb-3 flex w-full flex-col items-start justify-start px-1 md:w-1/2"
              key={`feature-${idx}`}
            >
              <div className="rounded-sp-10 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-2.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
                {elem.icon}
              </div>
              <h3 className="my-4 text-[22px] font-bold leading-6 tracking-wide dark:text-sp-white">
                {elem.title}
              </h3>
              <p className="mb-4 text-[13px] font-medium leading-[18px] opacity-70 tracking-sp-tighten dark:text-sp-white">
                {elem.subtitle}
              </p>

              <ul className="list-none text-[13px] font-medium leading-[18px] tracking-sp-tighten dark:text-sp-white">
                {elem.list.map((item, i) => {
                  return (
                    <li className="flex items-center" key={`item-${idx}-${i}`}>
                      <div className="rounded-full bg-gradient-to-r from-day-gradient-start to-day-gradient-stop p-0.5 dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
                        <CheckIcon className="h-3.5 w-3.5 text-sp-dark-fawn" />
                      </div>
                      <p className="mb-1 mt-0 px-2  font-medium not-italic leading-5 opacity-70 tracking-normal dark:text-sp-white">
                        {item}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="relative w-full rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown md:w-1/2">
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.1146 12.0005C20.6469 12.0005 22.6998 14.112 22.6998 16.7168C22.6998 18.6689 21.2531 20.715 18.4202 22.9003C18.2391 23.04 17.99 23.04 17.8089 22.9003C14.976 20.715 13.5293 18.6689 13.5293 16.7168C13.5293 14.112 15.5822 12.0005 18.1146 12.0005ZM18.1146 15.1447C17.2704 15.1447 16.5861 15.8485 16.5861 16.7168C16.5861 17.585 17.2704 18.2888 18.1146 18.2888C18.9587 18.2888 19.643 17.585 19.643 16.7168C19.643 15.8485 18.9587 15.1447 18.1146 15.1447Z"
        fill="url(#paint0_linear_7561_46837)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.54882 6.384L4.3509 8.70686C4.34667 8.70993 4.34094 8.70997 4.33667 8.70695C4.33121 8.7031 4.32366 8.70435 4.31973 8.70975L2.13609 11.7154C2.04757 11.8372 2.07456 12.0078 2.19639 12.0963L3.37315 12.9516C3.49501 13.0402 3.66561 13.0132 3.75415 12.8913L5.69544 10.2189C5.71225 10.1958 5.73261 10.1754 5.75576 10.1586L5.85158 10.089C6.05002 9.94476 6.32312 10.1154 6.2805 10.357L5.88882 12.577C5.8266 12.9291 5.85993 13.2915 5.98533 13.6264C6.11073 13.9612 6.32362 14.2564 6.60182 14.481L9.93586 17.279C9.97252 17.3098 10.0004 17.3497 10.0168 17.3947L11.9385 22.6738C11.9901 22.8153 12.1465 22.8883 12.2881 22.8368L13.6555 22.3393C13.7971 22.2878 13.8701 22.1312 13.8185 21.9897L11.7138 16.2066C11.6974 16.1617 11.6695 16.1218 11.6329 16.091L9.74838 14.5092C9.67377 14.4466 9.63823 14.3489 9.65514 14.253L10.222 11.0363C10.2624 10.807 10.5574 10.7272 10.7201 10.8939C11.3011 11.489 11.9848 11.9768 12.7399 12.3329C12.9811 12.4466 13.228 12.5461 13.4794 12.6312C13.5894 12.6684 13.7093 12.6275 13.7823 12.5373C14.2626 11.944 14.9054 11.4877 15.6431 11.2362C15.6927 11.2192 15.7268 11.173 15.7268 11.1205C15.7268 11.054 15.6728 11.0002 15.6063 10.9986C14.8719 10.9814 14.1498 10.8023 13.4917 10.4734C12.7977 10.1266 12.1941 9.6228 11.7288 9.002C11.5748 8.797 11.4048 8.403 11.2188 7.82C11.0536 7.30205 10.731 6.84846 10.2961 6.52228C9.8611 6.19611 9.33532 6.01355 8.79182 6C8.34622 5.98551 7.9086 6.1207 7.54882 6.384ZM8.8126 4.91421C9.18768 5.28929 9.69638 5.5 10.2268 5.5C10.7573 5.5 11.266 5.28929 11.641 4.91421C12.0161 4.53914 12.2268 4.03043 12.2268 3.5C12.2268 2.96957 12.0161 2.46086 11.641 2.08579C11.266 1.71071 10.7573 1.5 10.2268 1.5C9.69638 1.5 9.18768 1.71071 8.8126 2.08579C8.43753 2.46086 8.22682 2.96957 8.22682 3.5C8.22682 4.03043 8.43753 4.53914 8.8126 4.91421ZM3.83191 22.3358C3.9473 22.4326 4.11928 22.4175 4.21609 22.3021L7.231 18.7094C7.2468 18.6905 7.25999 18.6697 7.2702 18.6473L7.93561 17.1889C7.98654 17.0773 7.95666 16.9454 7.8626 16.8667L6.53535 15.7551C6.3886 15.6321 6.16419 15.6947 6.10221 15.8758L5.50128 17.6319C5.4904 17.6637 5.47374 17.6932 5.45214 17.7189L2.68419 21.017C2.58734 21.1324 2.60241 21.3045 2.71783 21.4013L3.83191 22.3358Z"
        fill="url(#paint1_linear_7561_46837)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7561_46837"
          x1="13.5293"
          y1="17.5028"
          x2="22.6998"
          y2="17.5028"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_7561_46837"
          x1="2.08398"
          y1="12.1766"
          x2="15.7268"
          y2="12.1766"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
