import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useSession } from "next-auth/react";

import Layout from "../../../components/layout/Layout";

import { ObituaryFull } from "../../../components/sections/Obituaries";
import { GetSingleObituary } from "../../../service/http/obituary";
import { GetSpiritusById } from "../../../service/http/spiritus";
import { GetSpiritusStoriesBySlug } from "../../../service/http/story";
import { SpiritusOverview } from "../../../components/spiritus/Overview";
import { SpiritusCarousel } from "../../../components/spiritus/Carousel";
import {
  CTAAddMemory,
  MoreStories,
  Tribute,
} from "../../../components/stories/StoryPage";
import BecomeGuardianCTA from "../../../components/about/BecomeGuardianComponent";
import { HorizontalDivider } from "../../../components/layout/Common";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { ObFuneralPartner } from "../../../components/Icons";

export default function SpiritusNotice({
  spiritus,
  obituary,
  partner,
  stories,
  isLastPage,
}) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
        <title>{`Spiritus | Notice - ${spiritus.surname} ${spiritus.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description || `${spiritus.name} ${spiritus.surname}.`
          }
        />
      </Head>
      <div className="my-20 flex flex-col items-center">
        <h1 className="font-bold text-sp-black subpixel-antialiased text-5xl tracking-tight dark:text-sp-white">
          {t("funeral_notice")}
        </h1>

        <div className="mt-3 inline-flex items-center gap-3">
          <Link
            href={"/notices"}
            className="inline-flex items-center gap-1 gap-x-4 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-1.5 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
          >
            <ArrowLeftIcon className="h-5 w-4" /> <span>{t("see_all")}</span>
          </Link>
          <div className="h-5 w-1 rounded-sm border-r-3 border-sp-brown"></div>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1 rounded-full border border-sp-lighter from-sp-day-300 to-sp-day-100 px-4 py-2 font-medium text-base hover:bg-gradient-to-r focus:outline-none dark:border-sp-medium dark:bg-sp-medlight dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
          >
            {t("funeral_notices_partners")}
          </Link>
        </div>
      </div>
      <section
        className="mt-8 flex flex-col items-center justify-center"
        key="obituary"
      >
        <ObituaryFull spiritus={spiritus} obituary={obituary} />

        {partner && partner?.name ? (
          <div className="flex items-center gap-2 text-sp-black/70 dark:text-sp-white/70">
            {t("funeral_partner_org")}:{" "}
            <span>
              <a
                href={
                  partner.webpage.startsWith("http")
                    ? partner.webpage
                    : `https://${partner.webpage}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-lg border border-black/40 px-3 py-1 text-sp-black dark:border-white/40 dark:text-sp-white"
              >
                <ObFuneralPartner width={4} height={4} /> {partner.name}
              </a>
            </span>
          </div>
        ) : null}

        <div className="mx-auto mb-4 mt-14 w-full text-sp-white md:w-3/4 lg:w-3/5 lg:text-lg">
          <Tribute id={spiritus.id} />
          <HorizontalDivider />
        </div>
        <div className="mt-4 flex w-full flex-col items-center justify-center text-sp-white lg:w-4/5 xl:w-5/6">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={spiritus.images} />
          <div className="mt-4 w-full text-sp-white">
            <MoreStories
              stories={stories}
              spiritus={spiritus}
              isGuardian={false}
              isLastPage={isLastPage}
            />
            <div className="flex-1 items-center justify-center">
              <CTAAddMemory
                sessionStatus={"unauthanticated"}
                spiritusId={spiritus.id}
                name={spiritus.name}
              />
            </div>
          </div>
        </div>
      </section>
      <BecomeGuardianCTA />
    </Layout>
  );
}

function filterStories(items, isOwner) {
  if (isOwner) {
    return items;
  }

  return items.filter((s) => s.flags.includes("PUBLIC"));
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await GetSingleObituary(id);
  const { data: resSpiritus } = await GetSpiritusById(res.data.spiritus.id);
  const { data: resStories } = await GetSpiritusStoriesBySlug(resSpiritus.slug);
  const stories = filterStories(resStories?.content || [], false);

  return {
    props: {
      key: `${context.locale}-notices-single-${id}`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
        "about",
      ])),
      obituary: res.data.obituary,
      spiritus: res.data.spiritus,
      partner: res.data.organization,
      stories,
      isLastPage: resStories.last,
    },
  };
}
