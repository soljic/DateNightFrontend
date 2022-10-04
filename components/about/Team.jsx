import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import dino from "../../public/images/about/people/people_01.png";
import marko from "../../public/images/about/people/people_02.png";
import mateo from "../../public/images/about/people/people_03.png";
import petar from "../../public/images/about/people/people_04.png";
import marin from "../../public/images/about/people/people_05.png";
import matija from "../../public/images/about/people/people_06.png";
import petra from "../../public/images/about/people/people_07.png";
import mislav from "../../public/images/about/people/people_08.png";


export default function Team() {
  const { t } = useTranslation("about");
  
  return (
    <section id="team" key={"team-section"}>
      <div className="flex justify-center items-center my-24 subpixel-antialiased mx-auto">
        <div className="flex flex-col items-center justify-start w-2/3">
          <h2 className="font-bold text-center tracking-sp-tighten leading-5 text-sp-fawn">
            {t("team_title")}
          </h2>
          <p className="my-2.5 text-2xl md:tex sm:w-full md:w-3/4 text-center font-bold tracking-tight dark:text-sp-white">
            {t("team_subtitle")}
          </p>
          <p className="w-full md:w-5/6 text-center font-medium tracking-sp-tighten leading-5 opacity-70 dark:text-sp-white">
            {t("team_text")}
          </p>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-x-1 md:gap-x-8 gap-y-10 md:grid-cols-4 sm:grid-cols-2">
        {team.map((item, idx) => (
          <Card
            key={`image-${idx}`}
            img={item.img}
            name={item.name}
            position={item.postition}
            socials={item.socials}
          />
        ))}
      </div>
    </section>
  );
}

function Card({ img, name, position, socials }) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-40 h-40 md:w-24 md:h-24 flex justify-start items-center rounded-full overflow-hidden">
        <Image src={img} alt={`${name} ${position}`} />
      </div>

      <a
        href={socials || "#"}
        className="flex flex-col items-center justify-center cursor-pointer pt-4"
      >
        <p className="mt-2 text-sm text-center font-medium tracking-sp-tighter leading-4 dark:text-sp-white">
          {name}
        </p>
        <p className="text-sm font-semibold tracking-sp-tighter leading-5 text-sp-fawn">
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
    postition: "Blokchain",
    socials: "https://github.com/MSalopek",
  },
  {
    img: petra,
    name: "Petra Sever",
    postition: "Content",
    socials: "",
  },
  {
    img: mislav,
    name: "Mislav Žokalj",
    postition: "Design",
    socials: "",
  },
];
