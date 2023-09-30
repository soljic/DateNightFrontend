import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { LinkIcon, UploadIcon } from "@heroicons/react/outline";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { HorizontalDivider, Logo } from "@/components/layout/Common";
import FullWidthLayout from "@/components/layout/LayoutV2";

import { GetSpiritusById } from "@/service/http/spiritus";
import { ImagePath, localFormatDate } from "@/service/util";

// const spiritus = {
//   id: 1,
//   name: "Ivan",
//   surname: "Horvat",
//   description: "Spiritus Description",
//   location: {
//     address: "Zagreb, Zagreb, Hrvatska",
//   },
//   images: [],
// };

export default function SpiritusCreatedSuccess({ spiritus }) {
  const { t } = useTranslation("common");
  const router = useRouter();

  const dates = `${
    spiritus.birth ? localFormatDate(spiritus.birth, router.locale) : "\uE132"
  } — ${
    spiritus.death ? localFormatDate(spiritus.death, router.locale) : "\uE132"
  }`;

  return (
    <FullWidthLayout>
      <Head>
        <title>{t("meta_create_spiritus_title")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={t("meta_create_spiritus_description")}
        />
      </Head>
      <div className="min-h-screen py-5">
        <div className="mx-auto my-4 flex w-full flex-col items-center gap-1 dark:text-sp-white sm:w-full md:w-1/2">
          <div className="mb-2 rounded-xl bg-sp-fawn bg-opacity-25 p-2">
            <Logo className="h-8 w-8" />
          </div>
          <h2 className="font-bold text-3xl">
            {" "}
            <span>
              {" "}
              {spiritus.name} {spiritus.surname}
            </span>
          </h2>
          <p className="mb-5 mt-1 text-center capitalize opacity-50">{dates}</p>

          {!!spiritus?.profileImage?.url && (
            <div className="overflow-hidden rounded-sp-14 px-4">
              <Image
                src={ImagePath(spiritus.profileImage.url)}
                alt="Spiritus image"
                width={192}
                height={220}
                className="rounded-sp-14"
              />
            </div>
          )}
          <div className="flex w-1/2">
            <HorizontalDivider />
          </div>
          <div className="mt-5 flex flex-col items-center gap-1">
            <h2 className="font-bold text-2xl md:text-3xl">
              {t("spiritus_success_first_story")}
            </h2>
            <p className="mb-8 mt-1 w-3/4 text-center opacity-50 text-sm md:text-base">
              <span> {spiritus.name} </span> {t("spiritus_success_text")}
            </p>
          </div>
          <Link
            href={`/edit/spiritus/${spiritus.id}/story/new`}
            className="rounded-full border-5 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-7 py-3 font-medium text-sp-black dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn"
          >
            {t("create_story")}
          </Link>
          <div className="mx-auto mt-8 flex items-center justify-center gap-4 text-sp-lighter dark:text-sp-white">
            <Link
              href={`/spiritus/${spiritus.slug}`}
              className="flex flex-col items-center justify-center gap-2 rounded-sp-14 p-4 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
            >
              <LinkIcon className="h-6 w-6" />
              <p className="text-center font-semibold">
                {t("term_view")} Spiritus
              </p>
            </Link>
            <CopyToClipboard text={spiritus.shortLink}>
              <button className="flex flex-col items-center justify-center gap-2 rounded-sp-14 p-4 hover:bg-sp-day-900 hover:bg-opacity-10 dark:hover:bg-gradient-to-r dark:hover:from-sp-dark-brown dark:hover:to-sp-brown">
                <UploadIcon className="h-6 w-6" />
                <p className="text-center font-semibold">
                  {t("share")} Spiritus
                </p>
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </FullWidthLayout>
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
