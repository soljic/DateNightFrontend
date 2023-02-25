import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Layout from "../../../components/layout/Layout";

import { ObituaryFull } from "../../../components/sections/Obituaries";
import { GetSingleObituary } from "../../../service/http/obituary";

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

export default function SpiritusNotice({ spiritus, obituary }) {
  const { t } = useTranslation("common");

  return (
    <Layout>
      <Head>
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
      <section
        className="flex flex-col justify-center items-center mt-8"
        key="obituary"
      >
        <ObituaryFull spiritus={spiritus} obituary={obituary} />
        {/* <div className="w-full lg:w-4/5 xl:w-5/6 flex flex-col justify-center items-center text-sp-white mt-4">
        <SpiritusOverview {...spiritus} />
        <SpiritusCarousel images={spiritus.images} />
        <div className="w-full text-sp-white mt-4">
          <MoreStories
            stories={stories}
            spiritus={spiritus}
            isGuardian={isGuardian}
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
      </div> */}
      </section>
      {/* <BecomeGuardianCTA /> */}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await GetSingleObituary(6);

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
    },
  };
}
