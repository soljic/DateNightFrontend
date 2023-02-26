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
      <div className="flex flex-col items-center my-20">
        <h1 className="text-5xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          {t("funeral_notice")}
        </h1>

        <div className="inline-flex mt-3 items-center gap-3">
          <Link href={"/notices"}>
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-1.5 px-4 text-base font-medium gap-x-4">
              <ArrowLeftIcon className="h-5 w-4" /> <span>{t("see_all")}</span>
            </a>
          </Link>
          <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>
          <Link href="/partners">
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 text-base font-medium">
              {t("funeral_notices_partners")}
            </a>
          </Link>
        </div>
      </div>
      <section
        className="flex flex-col justify-center items-center mt-8"
        key="obituary"
      >
        <div className="w-full lg:w-5/6 pb-12">
          <ObituaryFull spiritus={spiritus} obituary={obituary} />
        </div>

        {partner && partner?.name ? (
          <div className="flex items-center gap-2 text-sp-black/70 dark:text-sp-white/70">
            {t("funeral_partner_org")}:{" "}
            <span>
              <a
                href={
                  partner.name.startsWith("http")
                    ? partner.name
                    : `https://${partner.name}`
                }
                target="_blank"
                rel="noreferrer"
                className="flex gap-2 justify-center items-center border rounded-lg py-1 px-3 text-sp-black dark:text-sp-white border-black/40 dark:border-white/40"
              >
                <ObFuneralPartner width={4} height={4} /> {partner.name}
              </a>
            </span>
          </div>
        ) : null}

        <div className="w-full md:w-3/4 lg:w-3/5 mx-auto text-sp-white mt-14 mb-4 lg:text-lg">
          <Tribute id={spiritus.id} />
          <HorizontalDivider />
        </div>
        <div className="w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
          <SpiritusOverview {...spiritus} />
          <SpiritusCarousel images={spiritus.images} />
          <div className="w-full text-sp-white mt-4">
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
