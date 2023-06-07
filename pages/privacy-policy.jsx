import Head from "next/head";
import Link from "next/link";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../components/layout/Layout";

export default function PrivacyPage() {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{t("meta_home_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_home_description")} />
      </Head>
      <div className="mx-auto mt-24 box-border w-full px-3 leading-6 text-neutral-800 dark:text-sp-white">
        <div className="box-border flex-none leading-6">
          <div className="mb-5 box-border font-medium leading-6 text-2xl tracking-normal">
            <div className="flex flex-col justify-start">
              <div className="flex w-16 justify-center rounded-sp-14 bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-3 dark:border-sp-medium dark:from-sp-medlight dark:to-sp-medlight">
                <svg
                  width="20"
                  height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.400391 3.2002C0.400391 1.54334 1.74354 0.200195 3.40039 0.200195L14.2004 0.200195C15.8572 0.200195 17.2004 1.54334 17.2004 3.2002V6.2002H16.0004V3.2002C16.0004 2.20608 15.1945 1.4002 14.2004 1.4002L3.40039 1.4002C2.40628 1.4002 1.60039 2.20608 1.60039 3.2002L1.60039 14.0002C1.60039 14.9943 2.40628 15.8002 3.40039 15.8002L7.60039 15.8002V17.0002H3.40039C1.74354 17.0002 0.400391 15.6571 0.400391 14.0002L0.400391 3.2002ZM4.60039 6.2002L11.2004 6.2002C10.1342 6.2002 9.17625 6.6637 8.51706 7.4002H4.60039C4.26902 7.4002 4.00039 7.13157 4.00039 6.8002C4.00039 6.46882 4.26902 6.2002 4.60039 6.2002ZM7.80524 8.6002L4.60039 8.6002C4.26902 8.6002 4.00039 8.86882 4.00039 9.2002C4.00039 9.53157 4.26902 9.8002 4.60039 9.8002L7.60039 9.80019C7.60039 9.37943 7.67258 8.97553 7.80524 8.6002ZM4.60039 3.8002C4.26902 3.8002 4.00039 4.06882 4.00039 4.4002C4.00039 4.73157 4.26902 5.0002 4.60039 5.0002L13.0004 5.0002C13.3318 5.0002 13.6004 4.73157 13.6004 4.4002C13.6004 4.06882 13.3318 3.8002 13.0004 3.8002L4.60039 3.8002ZM19.6004 9.8002C19.6004 8.47471 18.5259 7.4002 17.2004 7.4002L11.2004 7.4002C9.87491 7.4002 8.80039 8.47471 8.80039 9.80019L8.80039 19.4002C8.80039 20.7257 9.87491 21.8002 11.2004 21.8002L19.0004 21.8002C19.3318 21.8002 19.6004 21.5316 19.6004 21.2002C19.6004 20.8688 19.3318 20.6002 19.0004 20.6002L11.2004 20.6002C10.5377 20.6002 10.0004 20.0629 10.0004 19.4002V19.3965L19.0004 19.3965C19.3318 19.3965 19.6004 19.1279 19.6004 18.7965L19.6004 9.8002ZM10.0004 18.1965L10.0004 9.80019C10.0004 9.13745 10.5376 8.6002 11.2004 8.6002L17.2004 8.6002C17.8631 8.6002 18.4004 9.13745 18.4004 9.8002L18.4004 18.1965L10.0004 18.1965Z"
                    fill="url(#paint0_linear_7281_5436)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_7281_5436"
                      x1="0.400391"
                      y1="11.0002"
                      x2="19.6004"
                      y2="11.0002"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#DB6D56" />
                      <stop offset="1" stopColor="#DB6D56" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p className="mb-4 mt-4 box-border font-medium leading-6 opacity-60 text-xs tracking-normal">
                Updated October 27, 2022
              </p>
            </div>

            <h1 className="mb-10 box-border font-bold leading-6 text-5xl tracking-normal">
              Privacy Policy
            </h1>

            <div className="mt-24 flex flex-col items-start justify-start">
              <p className="mb-2  box-border py-0 font-bold leading-6 text-sm  tracking-normal">
                SECTIONS:
              </p>
              <ul className="mb-4 mt-0 box-border list-none font-medium text-sm tracking-normal">
                <Link href="#personal-info">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (01) PERSONAL INFORMATION WE COLLECT
                    </p>
                  </li>
                </Link>
                <Link href="#use-info">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0 box-border font-medium leading-6  tracking-normal">
                      (02) HOW DO WE USE YOUR PERSONAL INFORMATION?
                    </p>
                  </li>
                </Link>
                <Link href="#share-info">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (03) SHARING YOUR PERSONAL INFORMATION
                    </p>
                  </li>
                </Link>
                <Link href="#bihevioral-add">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (04) BEHAVIOURAL ADVERTISING
                    </p>
                  </li>
                </Link>
                <Link href="#not-track">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (05) DO NOT TRACK
                    </p>
                  </li>
                </Link>
                <Link href="#your-right">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (06) YOUR RIGHTS
                    </p>
                  </li>
                </Link>
                <Link href="#data-retention">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (07) DATA RETENTION
                    </p>
                  </li>
                </Link>
                <Link href="#minors">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0 box-border font-medium leading-6  tracking-normal">
                      (08) MINORS
                    </p>
                  </li>
                </Link>
                <Link href="#changes">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (09) CHANGES
                    </p>
                  </li>
                </Link>
                <Link href="#contact">
                  <li className="flex items-center">
                    <p className="mb-1 mt-0  box-border font-medium leading-6  tracking-normal">
                      (10) CONTACT US
                    </p>
                  </li>
                </Link>
              </ul>
            </div>
            <div
              id="personal-info"
              className="mb-5  box-border py-10 font-bold leading-6 text-xl  tracking-normal"
            >
              <p>
                This Privacy Policy describes how your personal information is
                collected, used, and shared when you visit or make a purchase
                from www.spiritus.app, including any related websites, mobile
                applications, services, and platforms (collectively, the
                "Site").
              </p>
            </div>
          </div>
        </div>
        <div
          id="use-info"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          (1) PERSONAL INFORMATION WE COLLECT
        </div>
        <div className="mb-5 box-border font-medium leading-6  tracking-normal">
          <p>
            When you visit the Site, we automatically collect certain
            information about your device, including information about your web
            browser, IP address, time zone, and some of the cookies that are
            installed on your device. Additionally, as you browse the Site, we
            collect information about the individual web pages or products that
            you view, what websites or search terms referred you to the Site,
            and information about how you interact with the Site. We refer to
            this automatically-collected information as “Device Information.”
          </p>
        </div>
        <div className="box-border font-medium leading-6  tracking-normal">
          We collect Device Information using the following technologies:
          <ul className="mb-5 mt-3 box-border list-disc pl-8 font-medium leading-6 tracking-normal">
            <li className="py-1">
              “Cookies” are data files that are placed on your device or
              computer and often include an anonymous unique identifier. For
              more information about cookies, and how to disable cookies, visit
              http://www.allaboutcookies.org.
            </li>
            <li className="py-1">
              “Log files” track actions occurring on the Site, and collect data
              including your IP address, browser type, Internet service
              provider, referring/exit pages, and date/time stamps.
            </li>
            <li className="py-1">
              “Web beacons,” “tags,” and “pixels” are electronic files used to
              record information about how you browse the Site.
            </li>
          </ul>
        </div>
        <div className="mb-5 box-border font-medium leading-6 tracking-normal">
          <p>
            Additionally when you make a purchase or attempt to make a purchase
            through the Site, we collect certain information from you, including
            your name, billing address, shipping address, payment information
            (including credit card numbers, email address, and phone number. We
            refer to this information as “Order Information.”
          </p>
        </div>
        <div className="mb-20 box-border font-medium leading-6 tracking-normal">
          <p>
            When we talk about “Personal Information” in this Privacy Policy, we
            are talking both about Device Information and Order Information.
          </p>
        </div>
        <div
          id="share-info"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p> (2) HOW DO WE USE YOUR PERSONAL INFORMATION?</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            We use the Order Information that we collect generally to fulfill
            any orders placed through the Site (including processing your
            payment information, arranging for shipping, and providing you with
            invoices and/or order confirmations). Additionally, we use this
            Order Information to: communicate with you, screen our orders for
            potential risk or fraud, and when in line with the preferences you
            have shared with us, provide you with information or advertising
            relating to our products or services. Also, by accepting this policy
            terms, users allow the "Site" to monitor the content that user
            created and allow the "Site" to use the content you create for
            marketing use and for future content creation. We use the Device
            Information that we collect to help us screen for potential risk and
            fraud (in particular, your IP address), and more generally to
            improve and optimize our Site (for example, by generating analytics
            about how our customers browse and interact with the Site, and to
            assess the success of our marketing and advertising campaigns).{" "}
          </p>
        </div>
        <div
          id="bihevioral-add"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(3) SHARING YOUR PERSONAL INFORMATION</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            We share your Personal Information with third parties to help us use
            your Personal Information, as described above. For example, we use
            Shopify to power our online store--you can read more about how
            Shopify uses your Personal Information here:
            https://www.shopify.com/legal/privacy. We also use Google Analytics
            to help us understand how our customers use the Site--you can read
            more about how Google uses your Personal Information here:
            https://www.google.com/intl/ en/policies/privacy/. You can also
            opt-out of Google Analytics here: https://tools.google.com/
            dlpage/gaoptout. Finally, we may also share your Personal
            Information to comply with applicable laws and regulations, to
            respond to a subpoena, search warrant or other lawful request for
            information we receive, or to otherwise protect our rights.{" "}
          </p>
        </div>

        <div
          id="not-track"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(4) BEHAVIOURAL ADVERTISING</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you. For more information about how targeted
            advertising works, you can visit the Network Advertising
            Initiative’s (“NAI”) educational page at
            http://www.networkadvertising.org/understanding-onlineadvertising/how-does-it-work.
            You can opt out of targeted advertising by: <br />
            FACEBOOK - https://www.facebook.com/settings/?tab=ads
            <br /> GOOGLE - https://www.google.com/settings/ads/anonymous <br />
            BING -
            https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            Additionally, you can opt out of some of these services by visiting
            the Digital Advertising Alliance’s opt-out portal at:
            http://optout.aboutads.info/.{" "}
          </p>
        </div>
        <div
          id="your-right"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(5) DO NOT TRACK</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            Please note that we do not alter our Site’s data collection and use
            practices when we see a Do Not Track signal from your browser.{" "}
          </p>
        </div>
        <div
          id="data-retention"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(6) YOUR RIGHTS</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            If you are a European resident, you have the right to access
            personal information we hold about you and to ask that your personal
            information be corrected, updated, or deleted. If you would like to
            exercise this right, please contact us through the contact
            information below. Additionally, if you are a European resident we
            note that we are processing your information in order to fulfill
            contracts we might have with you (for example if you make an order
            through the Site), or otherwise to pursue our legitimate business
            interests listed above. Additionally, please note that your
            information will be transferred outside of Europe, including to
            Canada and the United States{" "}
          </p>
        </div>
        <div
          id="minors"
          className="mb-5 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(7) DATA RETENTION</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            When you place an order through the Site, we will maintain your
            Order Information for our records unless and until you ask us to
            delete this information.{" "}
          </p>
        </div>
        <div
          id="changes"
          className="mb-6 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p>(8) MINORS</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p> The Site is not intended for individuals under the age of 18. </p>
        </div>
        <div
          id="contact"
          className="mb-6 box-border font-bold leading-6 text-2xl tracking-normal"
        >
          <p> (9) CHANGES</p>
        </div>
        <div className="mb-20  box-border font-medium leading-6  tracking-normal">
          <p>
            We may update this privacy policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal or regulatory reasons.{" "}
          </p>
        </div>
        <div className="mb-6 box-border py-2 font-bold leading-6 text-2xl tracking-normal sm:px-10 md:px-40 lg:px-60">
          (10) CONTACT US
        </div>
        <div className="box-border font-medium leading-6  tracking-normal">
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at{" "}
            <a href="mailto:hello@spiritus.app">
              <span className="box-border border-b border-solid border-zinc-100">
                hello@spiritus.app
              </span>
            </a>{" "}
            or by mail using the details provided below:
          </p>
        </div>
        <div className="font-medium leading-6 tracking-normal">
          <span className="box-border border-b border-solid border-zinc-100 font-medium leading-7 tracking-normal">
            Ivana Meštrovića 35, Sesvete, 21, 10000, Croatia ↗
          </span>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
    },
  };
}
