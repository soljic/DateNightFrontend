import Image from "next/image";

import Layout from "../../../components/layout/Layout";
import SpiritusCarousel from "../../../components/carousel/SpiritusCarousel";
import {
  CTAAddMemory,
  MoreStories,
  SpiritusOverview,
  Tags,
  Tribute,
} from "../../../components/stories/StoryPage";
import { HorizontalDivider } from "../../../components/layout/Common";

import { GetSpiritusBySlug } from "../../../service/http/spiritus";
import { GetSpiritusStoriesByID } from "../../../service/http/story";

export default function StoryPage({
  first,
  stories,
  spiritus,
  hasMore,
  total,
}) {
  return (
    <Layout>
      <section className="container mx-auto px-5" key="story">
        <div className="flex flex-col items-center py-8">
          <div className="flex flex-col w-full mb-12 text-left">
            <div className="w-full sm:w-full lg:w-1/2  mx-auto text-sp-white">
              <h1 className="mx-auto mb-6 font-semibold text-center uppercase">
                {first.title}
              </h1>
              <h2 className="mx-auto mb-6 text-2xl px-4 font-semibold text-center lg:text-3xl">
                {first.subtitle}
              </h2>
              <h2 className="mx-auto mb-6 text-2xl px-4 font-semibold text-center lg:text-3xl">
                {first.description}
              </h2>
              {first.paragraphs &&
                first.paragraphs.map((p, i) => {
                  if (p.imageUrl) {
                    return (
                      <div
                        className="object-fill rounded-lg overflow-hidden px-4"
                        key={`para-${i}`}
                      >
                        <Image
                          src={p.imageUrl}
                          alt={`Paragraph image ${p.id}`}
                          width={400}
                          height={400}
                          layout="responsive"
                        />
                      </div>
                    );
                  }
                  // check if text is empty -> don't render if it is
                  return (
                    <p
                      className="mx-auto leading-relaxed pt-4 px-2 pb-10"
                      key={`para-${i}`}
                    >
                      {p.text}
                    </p>
                  );
                })}
            </div>
            <div className="w-full mx-auto lg:w-1/2 text-sp-white mt-4">
              {first.tags && <Tags tags={first.tags} />}

              <Tribute />
              <HorizontalDivider />
              <SpiritusOverview {...spiritus} />
            </div>
            <div className="w-full mx-autotext-sp-white mt-4">
              <SpiritusCarousel images={spiritus.images} />
            </div>
            <div className="w-full mx-auto lg:w-1/2 text-sp-white mt-4">
              <MoreStories stories={stories} spiritus={spiritus} />
              <CTAAddMemory />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

// fetch first 5 spiritus stories
export async function getServerSideProps(context) {
  const { slug, id, story } = context.query;
  const resSpiritus = await GetSpiritusBySlug(slug);
  const spiritus = resSpiritus.data;


  const resStories = await GetSpiritusStoriesByID(id, 0, 5);
  const content = resStories.data?.content;
  // if (story) {
  //   content.length > 1
  //       ? content.filter((x) => {
  //           // story is string, so this is comparing strings
  //           return x.id != story;
  //         })
  //       : [];
  // }
  const first = content.length ? content[0] : {};
  const stories = content.length > 1 ? content.slice(1) : [];

  // sort paragraphs by index
  if (first.paragraphs) {
    first.paragraphs.sort((p1, p2) => {
      if (p1.index < p2.index) {
        return -1;
      }
      if (p1.index > p2.index) {
        return 1;
      }
      // if equal
      return 0;
    });
  }

  return {
    props: {
      first,
      stories,
      spiritus,
      hasMore: !resStories.data.last,
      total: resStories.data.numberOfElements,
    },
  };
}
