import Head from "next/head";
import Image from "next/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import spiritusiOS from "../public/images/mobile/spiritusiOS.svg";
import playStore from "../public/images/mobile/playStore.svg";
import appStore from "../public/images/mobile/appStore.svg";
import qrCode from "../public/images/mobile/qrCode.svg";
import iphoneCut from "../public/images/mobile/iphoneCut.png";

import Layout from "../components/layout/Layout";

export default function MobileAppCTA() {
  const { t } = useTranslation(["mobile", "common"]);

  return (
    <Layout>
      <Head>
        <title>{t("common:meta_home_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("common:meta_home_description")} />
      </Head>

      <div className="flex flex-col justify-center items-center bg-gradient-to-b from-sp-day-50 to-sp-day-300 text-sp-black dark:text-sp-white dark:from-sp-black dark:to-sp-brown rounded-lg">
        <div className="text-center mx-auto">
          <div className="mt-14">
            <Image src={spiritusiOS} />
          </div>
          <div className="flex-col justify-center items-center text-center">
            <h2
              className="text-center text-cta font-bold mb-4 break"
              dangerouslySetInnerHTML={{ __html: t("all_of_your_loved") }}
            />
            <p className="mt-5 font-semibold">
              <span className="text-sp-cotta dark:text-sp-fawn">↘ </span>
              {t("scan_to_downoad_the_app")}
              <span className="text-sp-cotta dark:text-sp-fawn"> ↙</span>
            </p>

            <div className="my-3">
              <Image src={qrCode} />
            </div>

            <p className="opacity-75 mb-1.5">{t("go_directly_to the_store")}</p>

            <div className="flex justify-center items-center pb-20 gap-2">
              <a
                href="https://apps.apple.com/hr/app/spiritus/id1584613380"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={appStore} />
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=app.spiritus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src={playStore} />
              </a>
            </div>

            <div className="flex justify-center items-center w-auto">
              <Image src={iphoneCut} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "mobile"])),
    },
  };
}