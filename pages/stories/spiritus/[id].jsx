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

import {
  GetSpiritusStories,
  GetStory,
  SearchSpiritus,
} from "../../../service/http/spiritus";

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
// NOTE:
// Spiritus is fetched using fistname and lastname
// -> not ideal
// -> it would be better to fetch by ID
//
// This whole thing is buggy because I cannot request a spiritus by ID
// since there are duplicates in DB it can behave unexpectedly...
export async function getServerSideProps(context) {
  const { id, firstname, lastname, story } = context.query;
  const resStories = await GetSpiritusStories(id, 0, 5);
  const content = resStories.data?.content;

  let first;
  let stories;
  // NOTE: REFACTOR
  // fetch single story, remove it from list of stories and display as first
  if (story) {
    const resStory = await GetStory(story);
    first = resStory.data;
    stories =
      content.length > 1
        ? content.filter((x) => {
            // story is string, so this is comparing strings
            return x.id != story;
          })
        : [];
  } else {
    first = content.length ? content[0] : {};
    stories = content.length > 1 ? content.slice(1) : [];
  }
  // sort paras by index
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

  let spiritus = {};
  if (firstname && lastname) {
    // force getting single spiritus using limit=1 and offset=0
    const resSpiritus = await SearchSpiritus(`${firstname} ${lastname}`, 0, 1);
    const content = resSpiritus.data?.content;
    if (content && content.length) {
      spiritus = content[0];
    }
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
