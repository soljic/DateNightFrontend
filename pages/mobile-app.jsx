import Head from "next/head";
import Image from "next/legacy/image";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FullWidthLayout from "@/components/layout/LayoutV2";

import appStore from "../public/images/mobile/appStore.svg";
import iphoneCut from "../public/images/mobile/iphoneCut.png";
import playStore from "../public/images/mobile/playStore.svg";
import qrCode from "../public/images/mobile/qrCode.svg";
import spiritusiOS from "../public/images/mobile/spiritusiOS.svg";

export default function MobileAppCTA() {
  const { t } = useTranslation(["mobile", "common"]);

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("common:meta_title_mobile_app")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("common:meta_desc_mobile_app")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus - Download Our App" />
        <meta property="og:url" content="https://spiritus.app/mobile-app" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Download our App and create beautiful memorials of your loved ones."
        />
        <meta
          property="og:image"
          itemProp="image"
          content="https://spiritus.app/images/share/banner_mobile.jpg"
        />
        <meta
          property="og:image:url"
          itemProp="image"
          content="https://spiritus.app/images/share/banner_mobile.jpg"
        />
        {/* <meta property="og:image:secure_url" itemProp="image" content="https://spiritus.app/images/share/banner_mobile.jpg"/> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center rounded-lg bg-gradient-to-b from-sp-day-50 to-sp-day-300 text-sp-black dark:from-sp-black dark:to-sp-brown dark:text-sp-white lg:w-5/6">
        <div className="mx-auto text-center">
          <div className="mt-14">
            <Image src={spiritusiOS} />
          </div>
          <div className="flex-col items-center justify-center text-center">
            <h2
              className="break mb-4 text-center font-bold text-cta"
              dangerouslySetInnerHTML={{ __html: t("all_of_your_loved") }}
            />
            <p className="mt-5 font-semibold">
              <span className="text-sp-cotta dark:text-sp-fawn">↘ </span>
              {t("scan_to_downoad_the_app")}
              <span className="text-sp-cotta dark:text-sp-fawn"> ↙</span>
            </p>

            <div className="my-3">
              <Image src={qrCode} className="rounded-sp-10" />
            </div>

            <p className="mb-1.5 opacity-75">{t("go_directly_to the_store")}</p>

            <div className="flex items-center justify-center gap-2 pb-20">
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

            <div className="flex w-auto max-w-4xl items-center justify-center pt-16">
              <Image src={iphoneCut} />
            </div>
          </div>
        </div>
      </div>
    </FullWidthLayout>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      ...(await serverSideTranslations(context.locale, [
        "common",
        "mobile",
        "settings",
        "auth",
        "cookies",
      ])),
    },
  };
}
