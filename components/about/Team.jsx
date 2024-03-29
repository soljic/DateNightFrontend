import Image from "next/legacy/image";

import { useTranslation } from "next-i18next";

import dino from "../../public/images/about/people/people_01.png";
import marko from "../../public/images/about/people/people_02.png";
import mateo from "../../public/images/about/people/people_03.png";
import petar from "../../public/images/about/people/people_04.png";
import marin from "../../public/images/about/people/people_05.png";
import matija from "../../public/images/about/people/people_06.png";
import petra from "../../public/images/about/people/people_07.png";

export default function Team() {
  const { t } = useTranslation("about");
  const row1 = team.slice(0, 3);
  const row2 = team.slice(3);

  return (
    <section id="team" key={"team-section"}>
      <div className="mx-auto my-24 flex items-center justify-center subpixel-antialiased">
        <div className="flex w-2/3 flex-col items-center justify-start">
          <h2 className="text-center font-bold leading-5 text-sp-fawn text-lg tracking-sp-tighten">
            {t("team_title")}
          </h2>
          <p className="my-2.5 text-center font-bold leading-snug text-2xl tracking-sp-tighten dark:text-sp-white md:w-3/4">
            {t("team_subtitle")}
          </p>
          <p className="w-full text-center font-medium leading-5 opacity-70 text-lg tracking-sp-tighten dark:text-sp-white md:w-5/6">
            {t("team_text")}
          </p>
        </div>
      </div>
      <div className="mt-16 space-y-16">
        <div className="col-span-1 grid grid-cols-1 gap-16 px-32 sm:grid-cols-2 md:grid-cols-3">
          {row1.map((item, idx) => (
            <Card
              key={`image-${idx}`}
              img={item.img}
              name={item.name}
              position={item.postition}
              socials={item.socials}
            />
          ))}
        </div>
        <div className="col-span-1 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {row2.map((item, idx) => (
            <Card
              key={`image-row-2-${idx}`}
              img={item.img}
              name={item.name}
              position={item.postition}
              socials={item.socials}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ img, name, position, socials }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex h-40 w-40 items-center justify-start overflow-hidden rounded-full md:h-32 md:w-32">
        <Image src={img} alt={`${name} ${position}`} />
      </div>

      <a
        href={socials || "#"}
        className="flex cursor-pointer flex-col items-center justify-center space-y-1 pt-4"
      >
        <p className="tracking-sp-tighter mt-2 text-center font-medium leading-4 dark:text-sp-white">
          {name}
        </p>
        <p className="tracking-sp-tighter font-semibold leading-5 text-sp-fawn">
          {position}
        </p>
      </a>
    </div>
  );
}

const team = [
  {
    img: dino,
    name: "Dino Jerković",
    postition: "CEO",
    socials:
      "https://www.linkedin.com/in/dino-jerkovi%C4%87-257b12110/?originalSubdomain=hr",
  },
  {
    img: marko,
    name: "Marko Šoljić",
    postition: "Co-Founder",
    socials:
      "https://www.linkedin.com/in/marko-soljic-48726a173/?originalSubdomain=hr",
  },
  {
    img: mateo,
    name: "Mateo Stjepanović",
    postition: "CTO",
    socials: "https://www.linkedin.com/in/mateo-stjepanovi%C4%87-8a618b169/",
  },
  {
    img: petar,
    name: "Petar Zeman",
    postition: "Design ",
    socials: "https://www.linkedin.com/in/zemanpetar/",
  },
  {
    img: marin,
    name: "Marin Grbić",
    postition: "iOS",
    socials: "https://www.linkedin.com/in/marin-grbi%C4%87-784192121/",
  },
  {
    img: matija,
    name: "Matija Salopek",
    postition: "Web3",
    socials: "https://github.com/MSalopek",
  },
  {
    img: petra,
    name: "Petra Sever",
    postition: "Content",
    socials: "",
  },
];
