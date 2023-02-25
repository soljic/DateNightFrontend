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

const obs = {
  spiritus: {
    id: 647247,
    slug: "miroslav-blazevic-31a94216",
    name: "Miroslav",
    surname: "Blažević",
    birth: "1935-02-10",
    death: "2023-02-08",
    description: "",
    status: "APPROVED",
    shortLink: "https://spiritus.page.link/8iF9qn7KTiNsZMGe8",
    flags: [],
    location: {
      id: 14,
      latitude: 45.08097457885742,
      longitude: 13.642401695251465,
      address: "Rovinj",
      country: "Croatia",
    },
    users: [
      {
        id: 89184,
        name: "Partner",
        surname: "ADMIN",
        email: "partnermanager@spiritus.app",
        code: "67760024-eb40-4475-8402-1a580b02881c",
      },
    ],
    images: [],
    numberOfRoses: null,
    numberOfTributes: null,
    sources: [],
  },
  obituary: {
    id: 6,
    religiousImage: {
      id: 2,
      url: "/images/2/religious",
      height: 60,
      width: 60,
    },
    obituaryImage: null,
    texts: [
      {
        type: "TOP",
        templateId: 1,
        templateLocaleId: 1,
        text: "Lorem ipsum",
      },
      {
        type: "MIDDLE",
        templateId: 3,
        templateLocaleId: 5,
        text: "Amet",
      },
      {
        type: "FAREWELL",
        templateId: 5,
        templateLocaleId: 9,
        text: "Dolor sit",
      },
      {
        type: "BEREAVED",
        templateId: 7,
        templateLocaleId: 13,
        text: "Svi",
      },
    ],
  },
  organization: null,
};

export default function SpiritusNotice({
  spiritus,
  obituary,
  stories,
  isLastPage,
}) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  return (
    <Layout>
      <Head>
        {/* <!-- Google font --> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={""}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <title>{`Spiritus | Notices ${spiritus.surname} - ${spiritus.name}`}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content={
            spiritus.description ||
            `${t("meta_story_description")} ${spiritus.name} ${
              spiritus.surname
            }.`
          }
        />
      </Head>
      <div className="flex flex-col items-center my-20">
        <h1 className="text-5xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
          Funeral Notice
        </h1>

        <div className="inline-flex mt-3 items-center gap-3">
          <Link href={"/notices"}>
            <a className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-1.5 px-4 text-base font-medium gap-x-4">
              <ArrowLeftIcon className="h-5 w-4" /> <span>See all</span>
            </a>
          </Link>
          <div className="border-r-3 h-5 w-1 border-sp-brown rounded-sm"></div>
          <button className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none inline-flex items-center gap-1 rounded-full py-2 px-4 text-base font-medium">
            Our Partners
          </button>
        </div>
      </div>
      <section
        className="flex flex-col justify-center items-center mt-8"
        key="obituary"
      >
        <div className="w-full lg:w-5/6 pb-8">
          <ObituaryFull spiritus={spiritus} obituary={obituary} />
        </div>

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
                sessionStatus={status}
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
      key: `${context.locale}-notices-homepage`,
      ...(await serverSideTranslations(context.locale, [
        "common",
        "settings",
        "auth",
      ])),
      obituary: res.data.obituary,
      spiritus: res.data.spiritus,
      stories,
      isLastPage: resStories.last,
    },
  };
}
