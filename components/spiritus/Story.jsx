import Image from "next/image";

import { Tags } from "../stories/StoryPage";

export function SpiritusStory({ story }) {
  const isSingleParagraphStory =
    story.paragraphs.length === 1 && story.images.length > 0;

  return (
    <article className="flex flex-col justify-start" key="story">
      {!!story.tags?.length && (
        <div className="mb-4">
          <Tags tags={story.tags} />
        </div>
      )}
      <div className="flex w-full flex-col text-left subpixel-antialiased">
        <div className="font-bold text-sp-black dark:text-sp-white">
          <h1 className="mb-2 leading-8 text-3xl">{story.title}</h1>
          <h2 className="italic leading-6 text-lg">{story.description}</h2>
        </div>
        {isSingleParagraphStory ? (
          <>
            {story.images.length > 0 && (
              <div className="mx-auto">
                <Image
                  src={story.images[0].url}
                  alt={`Paragraph image ${story.images[0].id}`}
                  className="aspect-auto h-auto max-h-story-mobile min-h-story-mobile w-full rounded-sp-14 object-cover lg:max-h-story-desktop"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            )}
            <p
              className="my-3 w-full whitespace-pre-line break-words pt-5 text-sp-black subpixel-antialiased text-base tracking-sp-tighten dark:text-sp-white"
              key={"first-paragraph"}
            >
              {story.paragraphs[0].text}
            </p>
          </>
        ) : (
          <>
            <p
              className="my-3 w-full whitespace-pre-line break-words pt-5 text-sp-black subpixel-antialiased text-base tracking-sp-tighten dark:text-sp-white"
              key={"first-paragraph"}
            >
              {story.paragraphs[0].text}
            </p>
            {story.images.length > 0 && (
              <div className="mx-auto">
                <Image
                  src={story.images[0].url}
                  alt={`Paragraph image ${story.images[0].id}`}
                  className="aspect-auto h-auto max-h-story-mobile min-h-story-mobile w-full rounded-sp-14 object-cover lg:max-h-story-desktop"
                  width={0}
                  height={0}
                  sizes="100vw"
                />
              </div>
            )}
            {story.paragraphs.length > 1 && (
              <div className="my-3 w-full text-sp-black dark:text-sp-white">
                {story.paragraphs
                  .slice(1, story.paragraphs.length + 1)
                  .map((p, i) => (
                    <p
                      className="whitespace-pre-line break-words pt-5 subpixel-antialiased text-base tracking-sp-tighten"
                      key={`para-${i}`}
                    >
                      {p.text}
                    </p>
                  ))}
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
}
