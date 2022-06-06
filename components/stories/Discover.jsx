import Link from "next/link";
import Image from "next/image";
import { ImagePlaceholder } from "../layout/Common";

const stories = [
  {
    id: 1,
    images: [],
    // images: [{url: "/images/top-story.png"}],
    description: "Ruka koja život znači",
    name: "Pavao",
    surname: "Vukelić",
  },
  {
    id: 2,
    images: [{ url: "/images/spiritus-1.png" }],
    description: "Grad, to ste vi!",
    name: "Devon",
    surname: "Lane",
  },
  {
    id: 3,
    images: [{ url: "/images/spiritus-2.png" }],
    description: "Ruka koja život znači",
    name: "Pavao",
    surname: "Vukelić",
  },
  {
    id: 4,
    images: [{ url: "/images/spiritus-3.png" }],
    description: "Grad, to ste vi!",
    name: "Devon",
    surname: "Lane",
  },
];

export function Discover({ popular }) {
  return (
    <div id={"Discover"}>
      {popular && (
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-sp-white">
            Discover
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {popular.map((s) => (
              <PopularSpiritus
                id={s.id}
                name={s.name}
                surname={s.surname}
                description={s.description}
                images={s.images}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PopularSpiritus({ id, name, surname, description, images }) {
  const image = images.length ? images[0] : null;
  return (
    <div key={id} className="group relative">
      <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 h-80 lg:aspect-none">
        {image ? (
          <Image
            src={image.url}
            className="w-full h-full object-center object-cover lg:w-full lg:h-full"
            width={280}
            height={320}
            layout="responsive"
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-xl text-sp-white">
            <Link
              href={`/stories/spiritus/${id}?firstname=${name}&lastname=${surname}`}
            >
              <a>
                <span aria-hidden="true" className="absolute inset-0" />
                {description}
              </a>
            </Link>
          </h3>
          <p className="mt-1 text-lg text-sp-white opacity-50">{`${name} ${surname}`}</p>
        </div>
      </div>
    </div>
  );
}
