import Link from "next/link";
import Image from "next/image";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { ImagePlaceholder } from "../layout/Common";

export function TopStory({ id, name, surname, images }) {
  const image = images?.length ? images[0] : null;

  return (
    <div key={id} className="container mx-auto mt-12">
      <div className="container w-full xl:w-4/5 mx-auto rounded-lg py-12">
        <div className="relative overflow-hidden">
          {image ? (
            <Image
              src={image.url}
              alt={`${name} ${surname}`}
              className="h-full w-full object-cover rounded-lg opacity-60"
              width={500}
              height={500}
              layout="responsive"
              priority // add priority since this is the first thing loaded in the UI
            />
          ) : (
            <div className="h-64">
              <ImagePlaceholder />
            </div>
          )}

          <div className="absolute bottom-10 left-5 w-full p-4 text-white">
            <h2 className="uppercase font-semibold">Story of the week</h2>
            <h3 className="text-4xl xl:text-4xl md:text-2xl sm:text-xl font-semibold mb-2">
              {`${name} ${surname}`}
            </h3>
            <Link
              href={`/stories/spiritus/${id}?firstname=${name}&lastname=${surname}`}
            >
              <a className="inline-flex bg-sp-white text-sp-dark border border-sp-dark rounded-full px-5 py-3 items-center">
                Read story
                <ArrowNarrowRightIcon className="h-5 w-5 text-sp-dark" />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
