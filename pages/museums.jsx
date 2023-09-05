import Head from "next/head";
import Image from "next/image";

import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";

import BecomeGuardianCTA from "../components/about/BecomeGuardianComponent";
import appleStore from "../public/images/mobile/appStore.svg";
import playStore from "../public/images/mobile/playStore.svg";
import Image1 from "../public/images/museums/img_museums_01.png";
import Image2 from "../public/images/museums/img_museums_02.png";
import Image3 from "../public/images/museums/img_museums_03.png";

function CemeteryDealsIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="13"
      height="13"
      className={`${w} ${h}`}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.79198 0.711852C6.21018 0.392267 6.79058 0.392274 7.20877 0.711868L12.1713 4.50435C12.8034 4.98739 12.4636 5.99595 11.6698 5.99979H1.33066C0.536867 5.99595 0.197117 4.98737 0.829212 4.50433L5.79198 0.711852ZM6.5 4.24979C6.91421 4.24979 7.25 3.914 7.25 3.49979C7.25 3.08557 6.91421 2.74979 6.5 2.74979C6.08579 2.74979 5.75 3.08557 5.75 3.49979C5.75 3.914 6.08579 4.24979 6.5 4.24979ZM2 6.99979V9.99979H3.5V6.99979H2ZM4.5 6.99979V9.99979H6V6.99979H4.5ZM7 6.99979V9.99979H8.5V6.99979H7ZM9.5 6.99979V9.99979H11V6.99979H9.5ZM0.5 12.2498C0.5 11.5594 1.05964 10.9998 1.75 10.9998H11.25C11.9404 10.9998 12.5 11.5594 12.5 12.2498V12.4998C12.5 12.7759 12.2761 12.9998 12 12.9998H1C0.723858 12.9998 0.5 12.7759 0.5 12.4998V12.2498Z"
        fill="url(#paint0_linear_7364_6582)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7364_6582"
          x1="0.5"
          y1="6.73597"
          x2="12.5003"
          y2="6.73597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FirstIcon({ className }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className ? className : "h-6 w-6"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 4C10.2386 4 8 6.23858 8 9V39C8 41.7614 10.2386 44 13 44H39.5C40.3284 44 41 43.3284 41 42.5C41 41.6716 40.3284 41 39.5 41H13C11.8954 41 11 40.1046 11 39H39.5C40.3284 39 41 38.3284 41 37.5V9C41 6.23858 38.7614 4 36 4H13ZM31 24.5V25.499C31 27.5 28.2336 29 24.5 29C20.7663 29 18 27.5 18 25.499V24.5C18 23.6716 18.6716 23 19.5 23H29.5C30.3284 23 31 23.6716 31 24.5ZM28 17.4909C28 19.4246 26.4337 20.9922 24.5 20.9922C22.5663 20.9922 21 19.4246 21 17.4909C21 15.5573 22.5663 14 24.5 14C26.4337 14 28 15.5573 28 17.4909Z"
        fill="url(#paint0_linear_10219_31158)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10219_31158"
          x1="8"
          y1="24"
          x2="41"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SecondIcon({ className }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className={className ? className : "h-6 w-6"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.076 37.9975L30.4947 40.5145C30.0482 42.4411 28.4025 43.8364 26.4571 43.9854L26.1108 43.9987H21.8873C19.9085 43.9987 18.177 42.7089 17.5936 40.8458L17.5027 40.5112L16.922 37.9975H31.076ZM24 4.00146C32.0081 4.00146 38.5 10.4933 38.5 18.5015C38.5 22.7746 36.6288 26.688 32.9693 30.1829C32.8986 30.2504 32.8494 30.3369 32.8274 30.432L31.772 34.9975H25.5V21.5001C25.5 20.6716 24.8284 20.0001 24 20.0001C23.1716 20.0001 22.5 20.6716 22.5 21.5001V34.9975H16.228L15.176 30.4323C15.154 30.3371 15.1047 30.2504 15.034 30.183C11.3723 26.688 9.5 22.7746 9.5 18.5015C9.5 10.4933 15.9919 4.00146 24 4.00146ZM22.5 13.501V16.501C22.5 17.3295 23.1716 18.001 24 18.001C24.8284 18.001 25.5 17.3295 25.5 16.501V13.501C25.5 12.6725 24.8284 12.001 24 12.001C23.1716 12.001 22.5 12.6725 22.5 13.501ZM32.5607 16.4316C31.9749 15.8459 31.0251 15.8459 30.4394 16.4317L28.318 18.553C27.7322 19.1388 27.7322 20.0885 28.318 20.6743C28.9038 21.2601 29.8535 21.2601 30.4393 20.6743L32.5607 18.553C33.1465 17.9672 33.1465 17.0174 32.5607 16.4316ZM17.5606 16.4317C16.9749 15.8459 16.0251 15.8459 15.4393 16.4316C14.8535 17.0174 14.8535 17.9672 15.4393 18.553L17.5607 20.6743C18.1465 21.2601 19.0962 21.2601 19.682 20.6743C20.2678 20.0885 20.2678 19.1388 19.682 18.553L17.5606 16.4317Z"
        fill="url(#paint0_linear_10219_31165)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10219_31165"
          x1="9.5"
          y1="24"
          x2="38.5"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ThirdIcon({ className }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      className={className ? className : "h-6 w-6"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.2291 24.001C41.2939 24.001 45.3996 28.2241 45.3996 33.4335C45.3996 37.3378 42.5062 41.4299 36.8405 45.8006C36.4782 46.0801 35.98 46.0801 35.6177 45.8006C29.952 41.4299 27.0586 37.3378 27.0586 33.4335C27.0586 28.2241 31.1644 24.001 36.2291 24.001ZM36.2291 30.2893C34.5409 30.2893 33.1723 31.697 33.1723 33.4335C33.1723 35.17 34.5409 36.5777 36.2291 36.5777C37.9174 36.5777 39.286 35.17 39.286 33.4335C39.286 31.697 37.9174 30.2893 36.2291 30.2893Z"
        fill="url(#paint0_linear_10219_31172)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.0996 12.768L8.70375 17.4137C8.69528 17.4199 8.68384 17.4199 8.67529 17.4139C8.66437 17.4062 8.64927 17.4087 8.64142 17.4195L4.27413 23.4308C4.09709 23.6745 4.15108 24.0155 4.39472 24.1926L6.74825 25.9032C6.99198 26.0804 7.33317 26.0264 7.51025 25.7826L11.3928 20.4379C11.4265 20.3916 11.4672 20.3509 11.5135 20.3172L11.7051 20.1779C12.102 19.8895 12.6482 20.2308 12.5629 20.7139L11.7796 25.154C11.6552 25.8582 11.7218 26.583 11.9726 27.2527C12.2234 27.9225 12.6492 28.5127 13.2056 28.962L19.8737 34.5581C19.947 34.6196 20.0028 34.6994 20.0356 34.7893L23.879 45.3475C23.9821 45.6306 24.295 45.7765 24.5781 45.6735L27.313 44.6785C27.5961 44.5755 27.7421 44.2625 27.639 43.9794L23.4296 32.4133C23.3968 32.3234 23.341 32.2436 23.2677 32.1821L19.4987 29.0184C19.3495 28.8932 19.2784 28.6978 19.3122 28.506L20.446 22.0727C20.5268 21.614 21.1168 21.4545 21.4422 21.7878C22.6041 22.9781 23.9715 23.9537 25.4818 24.6657C25.9639 24.893 26.4574 25.092 26.9598 25.2621C27.1797 25.3366 27.4196 25.2547 27.5657 25.0743C28.5264 23.8874 29.8125 22.9748 31.2882 22.4719C31.3875 22.4381 31.4556 22.3457 31.4556 22.2408C31.4556 22.1078 31.3477 22.0004 31.2148 21.9973C29.7459 21.9629 28.3015 21.6046 26.9854 20.9469C25.5974 20.2532 24.3902 19.2456 23.4596 18.004C23.1516 17.594 22.8116 16.806 22.4396 15.64C22.1091 14.6041 21.464 13.6969 20.5941 13.0446C19.7242 12.3922 18.6726 12.0271 17.5856 12C16.6944 11.971 15.8192 12.2414 15.0996 12.768ZM17.6272 9.82843C18.3773 10.5786 19.3947 11 20.4556 11C21.5165 11 22.5339 10.5786 23.284 9.82843C24.0342 9.07828 24.4556 8.06087 24.4556 7C24.4556 5.93913 24.0342 4.92172 23.284 4.17157C22.5339 3.42143 21.5165 3 20.4556 3C19.3947 3 18.3773 3.42143 17.6272 4.17157C16.877 4.92172 16.4556 5.93913 16.4556 7C16.4556 8.06087 16.877 9.07828 17.6272 9.82843ZM7.66578 44.6716C7.89654 44.8651 8.24052 44.835 8.43414 44.6043L14.4639 37.4188C14.4956 37.3811 14.5219 37.3393 14.5424 37.2946L15.8732 34.3779C15.975 34.1546 15.9153 33.8909 15.7272 33.7333L13.0727 31.5101C12.7791 31.2643 12.3303 31.3894 12.2064 31.7517L11.0045 35.2638C10.9827 35.3274 10.9494 35.3864 10.9062 35.4379L5.37034 42.0341C5.17664 42.2649 5.20677 42.609 5.43762 42.8026L7.66578 44.6716Z"
        fill="url(#paint1_linear_10219_31172)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_10219_31172"
          x1="27.0586"
          y1="35.0056"
          x2="45.3996"
          y2="35.0056"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_10219_31172"
          x1="4.16992"
          y1="24.3533"
          x2="31.4556"
          y2="24.3533"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D67915" />
          <stop offset="1" stopColor="#ED9A4C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// const testimonials = [
//   {
//     company: t("testimonial_1_company"),
//     text: t("testimonial_1_text"),
//     person: t("testimonial_1_person"),
//     personJob: t("testimonial_1_person_job"),
//     personCompany: t("testimonial_1_person_company")
//   },
//   {
//     company: t("testimonial_2_company"),
//     text: t("testimonial_2_text"),
//     person: t("testimonial_2_person"),
//     personJob: t("testimonial_2_person_job"),
//     personCompany: t("testimonial_2_person_company")
//   },
//   {
//     company: t("testimonial_3_company"),
//     text: t("testimonial_3_text"),
//     person: t("testimonial_3_person"),
//     personJob: t("testimonial_3_person_job"),
//     personCompany: t("testimonial_3_person_company")
//   },
//   {
//     company: t("testimonial_4_company"),
//     text: t("testimonial_4_text"),
//     person: t("testimonial_4_person"),
//     personJob: t("testimonial_4_person_job"),
//     personCompany: t("testimonial_4_person_company")
//   }
// ]

// const partners = {
//   heading: t("partners_heading"),
//   partners: [t("partner_1"), t("partner_2"), t("partner_3"), t("partner_4")],
// }

// const stats = [
//   {
//     number: t("stat_1_number"),
//     fact: t("stat_1_fact")
//   },
//   {
//     number: t("stat_2_number"),
//     fact: t("stat_2_fact")
//   },
//   {
//     number: t("stat_2_number"),
//     fact: t("stat_2_fact")
//   }
// ]

function Article({ idx, elem }) {
  const flexDirection = idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse";
  const bg = elem?.bg ? elem.bg : "";
  return (
    <article
      key={`article-${idx}`}
      className={`flex flex-col-reverse ${flexDirection} ${bg} my-16 mb-3 items-center justify-center gap-4 px-2 py-8`}
    >
      <div
        className="mb-3 flex w-full flex-col items-start justify-start px-1 md:w-1/2"
        key={`feature-${idx}`}
      >
        <div className="rounded-sp-10 bg-sp-fawn-subtle p-2.5 dark:bg-sp-fawn dark:bg-opacity-40">
          {elem.icon}
        </div>
        <h3 className="my-4 max-w-lg font-bold text-3xl tracking-wide dark:text-sp-white md:text-4xl lg:text-5xl">
          {elem.title}
        </h3>

        {elem?.list && elem.list.length > 0 && (
          <ul className="list-none text-[13px] font-medium leading-[18px] tracking-sp-tighten dark:text-sp-white">
            {elem.list.map((item, i) => {
              return (
                <li className="flex items-center" key={`item-${idx}-${i}`}>
                  <div className="align-self-start rounded-full bg-sp-fawn p-0.5">
                    <CheckIcon className="h-3.5 w-3.5 text-sp-white" />
                  </div>
                  <p className="mb-1 mt-0 px-2 opacity-70 text-base tracking-normal dark:text-sp-white">
                    {item}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className="relative w-full md:w-1/2">
        <Image
          src={elem.image}
          width={500}
          height={700}
          alt={`feature-image-${idx}`}
        />
      </div>
    </article>
  );
}

function MuseumsCTA() {
  const { t } = useTranslation("museums");

  return (
    <div className="flex min-h-[600px] w-full flex-col items-center justify-center space-y-6 rounded-sp-10 bg-gradient-to-b from-day-gradient-start to-day-gradient-stop px-4 py-4 text-center text-sp-black dark:from-sp-fawn/40 dark:to-sp-fawn/30 dark:text-sp-white md:py-8 ">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sp-fawn-subtle dark:bg-sp-fawn dark:bg-opacity-40">
        <CemeteryDealsIcon width={8} height={8} />
      </div>
      <h1 className="max-w-4xl text-center font-bold leading-none subpixel-antialiased text-4xl sm:text-5xl">
        {t("hero_title_span_1")}{" "}
        <span className="underline decoration-sp-fawn underline-offset-[6px]">
          {t("hero_title_span_2")}
        </span>{" "}
        {t("hero_title_span_3")}
      </h1>
      <p className="max-w-lg font-semibold leading-none text-lg">
        {t("hero_subtitle")}
      </p>
      <div className="flex items-center justify-center gap-2">
        <a
          href="https://apps.apple.com/hr/app/spiritus/id1584613380"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={appleStore} alt="apple store" />
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=app.spiritus"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={playStore} alt="play store" />
        </a>
      </div>
    </div>
  );
}

export default function MuseumsPage() {
  const { t } = useTranslation("museums");

  const articleElements = [
    {
      icon: <FirstIcon className="h-10 w-10" />,
      image: Image1,
      title: t("article_heading_1"),
    },
    {
      icon: <SecondIcon className="h-10 w-10" />,
      image: Image2,
      bg: "bg-gradient-to-b from-day-gradient-start to-day-gradient-stop dark:from-sp-fawn/40 dark:to-sp-fawn/30 rounded-sp-14",
      title: t("article_heading_2"),
    },
    {
      icon: <ThirdIcon className="h-10 w-10" />,
      image: Image3,
      title: t("article_heading_3"),
      list: [
        t("article_heading_3_list_element_1"),
        t("article_heading_3_list_element_2"),
        t("article_heading_3_list_element_3"),
      ],
    },
  ];

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_about_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_about_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - About Us" />
        <meta property="og:url" content="https://spiritus.app/en/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Find out more about our Mission, Vision, potential partnerships and out unique team of experts."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        <meta
          property="og:image:url"
          itemProp="image"
          content="https://spiritus.app/images/share/banner.jpg"
        />
        {/* <meta property="og:image:secure_url" itemProp="image" content="https://spiritus.app/images/share/banner.jpg"/> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div className="mx-auto mb-96 h-full min-h-screen max-w-7xl flex-col px-4">
        <MuseumsCTA />
        <div className="lg:my-24">
          {articleElements.map((elem, idx) => {
            return (
              <Article idx={idx} elem={elem} key={`elem-article-idx-${idx}`} />
            );
          })}
        </div>
        <BecomeGuardianCTA />
      </div>
    </FullWidthLayout>
  );
}

// fetch top 10 popular spirituses
export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "about",
        "faq",
        "auth",
        "museums",
      ])),
    },
  };
}
