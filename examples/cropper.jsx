import Head from "next/head";

import { useTranslation } from "next-i18next";

import { CropEditor } from "@/components/cropper/SpiritusProfileImage";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/NavBar";

export default function Cropper() {
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("meta_home_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={t("meta_home_description")} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Spiritus" />
        <meta property="og:title" content="Spiritus Stories" />
        <meta property="og:url" content="https://spiritus.app/en/" />
        <meta
          property="og:description"
          content="Spiritus is the first digital assets platform that keeps your memories - forever! Read the latest beautiful stories, memorials and anniversaries."
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
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <main>
        <div className="w-full bg-sp-day-50 dark:bg-sp-black">
          <div className="z-10 mx-auto w-full max-w-7xl p-2">
            <Navbar />
          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl p-2">
          <CropEditor />
        </div>
      </main>
      <div className="mx-auto w-full max-w-7xl p-2">
        <Footer />
      </div>
    </>
  );
}

// export async function getStaticProps(context) {
//   if (process.env.NODE_ENV === "production") {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       ...(await serverSideTranslations(context.locale, [
//         "common",
//         "homepage",
//         "settings",
//         "auth",
//         "about",
//       ])),
//       key: `${context.locale}-cropper-index-page`,
//     },
//   };
// }
