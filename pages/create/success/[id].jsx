import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

import { getSession } from "next-auth/react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";

import { LinkIcon, UploadIcon } from "@heroicons/react/outline";
import { CopyToClipboard } from "react-copy-to-clipboard";

import LayoutNoFooter from "../../../components/layout/LayoutNoFooter";
import { HorizontalDivider, Logo } from "../../../components/layout/Common";

import { ImagePath, localFormatDate } from "../../../service/util";
import { GetSpiritusById } from "../../../service/http/spiritus";

const spiritus = {
  id: 1,
  name: "Ivan",
  surname: "Horvat",
  description: "Spiritus Description",
  location: {
    address: "Zagreb, Zagreb, Hrvatska",
  },
  images: [],
};

export default function SpiritusCreatedSuccess({ spiritus }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const dates = `${
    spiritus.birth ? localFormatDate(spiritus.birth, locale) : "\uE132"
  } — ${spiritus.death ? localFormatDate(spiritus.death, locale) : "\uE132"}`;

  return (
    <LayoutNoFooter>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="py-5 h-screen">
        <div className="flex flex-col items-center my-4 gap-1 w-1/2 mx-auto sm:w-full md:w-1/2 dark:text-sp-white">
          <div className="bg-sp-fawn bg-opacity-25 rounded-xl p-2 mb-2">
            <Logo width={8} height={8} />
          </div>
          <h2 className="font-bold text-3xl">
            {" "}
            <span>
              {" "}
              {spiritus.name} {spiritus.surname}
            </span>
          </h2>
          <p className="mt-1 text-center opacity-50 mb-5 capitalize">{dates}</p>

          {!!spiritus?.images.length && (
            <div className="rounded-sp-14 overflow-hidden px-4">
              <Image
                src={ImagePath(spiritus.images[0].url)}
                alt="Spiritus image"
                width={270}
                height={300}
                className="rounded-sp-14"
              />
            </div>
          )}
          <HorizontalDivider />
          <div className="flex flex-col items-center gap-1 mt-5">
            <h2 className="font-bold text-3xl">
              {t("spiritus_success_first_story")}
            </h2>
            <p className="mt-1 text-center opacity-50 mb-8 w-3/4 text">
              <span> {spiritus.name} </span> {t("spiritus_success_text")}
            </p>
          </div>
          <Link href={`/create/story?spiritus=${spiritus.id}`}>
            <a className="bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-5 border-sp-fawn dark:border-sp-medium dark:border-opacity-80 rounded-full py-3 px-7 text-sp-black font-medium">
              {t("create_story")}
            </a>
          </Link>
          <div className="flex mx-auto items-center justify-center gap-4 mt-8 text-sp-lighter dark:text-sp-white">
            <Link
              href={
                spiritus?.slug
                  ? `/spiritus/${spiritus.slug}`
                  : `/spiritus/id/${spiritus.id}`
              }
            >
              <a className="flex flex-col items-center justify-center h-24 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 p-4 gap-2">
                <LinkIcon className="w-6 h-6" />
                <p className="font-semibold">
                  {t("spiritus_success_link")} Spiritus
                </p>
              </a>
            </Link>
            {/* <CopyToClipboard text={spiritus.shortLink}> */}
            <CopyToClipboard text={spiritus.shortLink}>
              <button className="flex flex-col items-center justify-center h-24 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 p-4 gap-2">
                <UploadIcon className="w-6 h-6" />
                <p className="font-semibold">{t("share")} Spiritus</p>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </LayoutNoFooter>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }

  try {
    let spiritus;
    if (session && session?.user?.accessToken) {
      const res = await GetSpiritusById(id, session?.user?.accessToken);
      spiritus = res.data;
    } else {
      throw new Error("User is not the guardian of this spiritus");
    }
    return {
      props: {
        key: `${context.locale}-spiritus-id-${id}`,
        ...(await serverSideTranslations(context.locale, [
          "common",
          "settings",
          "auth",
        ])),
        spiritus,
      },
    };
  } catch {
    return {
      redirect: {
        destination: "/400",
        permanent: false,
      },
    };
  }
}
