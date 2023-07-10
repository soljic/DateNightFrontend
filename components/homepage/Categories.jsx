import Link from "next/link";

import { ArrowRightIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

import {
  AnecdotesIcon,
  ArtIcon,
  BioIcon,
  FamilyIcon,
  HeartIcon,
  HobbyIcon,
  SportsIcon,
  StarIcon,
  TargetIcon,
  WarIcon,
} from "./Icons";

export function CategoryTiles({ categories }) {
  const { t } = useTranslation("common");

  return (
    <div className="mx-5 p-1">
      <h2 className="mb-4 text-start font-bold text-2xl">
        {t("section_categories_title")}
      </h2>
      <div className=" mt-5 rounded-sp-10 bg-gradient-to-b from-day-gradient-start to-day-gradient-stop p-8 text-sp-black dark:from-sp-fawn/40 dark:to-sp-fawn/30 dark:text-sp-white md:w-full lg:mt-2">
        {categories && categories?.items.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.items.map((item) => (
              <CategoryTile
                key={`cat-id-${item.id}`}
                title={item.title}
                sectionId={categories.id}
                categoryId={item.id}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CategoryTile({ sectionId, categoryId, title }) {
  const c = iconMap.get(categoryId);

  return (
    <Link
      href={`/category/${sectionId}/item/${categoryId}?title=${title}`}
      className="flex flex-col space-y-3 rounded-sp-10 border border-sp-day-400 bg-sp-day-50 p-4 dark:bg-sp-black"
    >
      {c ? (
        <c.icon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
      ) : null}
      <div className="flex justify-between font-medium">
        {title}
        <ArrowRightIcon className="inline-block h-5 w-5 fill-sp-black dark:fill-sp-white" />
      </div>
    </Link>
  );
}

const iconMap = new Map([
  [
    33,
    {
      id: 33,
      title: "Biografija",
      icon: BioIcon,
    },
  ],
  [
    8,
    {
      id: 8,
      title: "Znameniti",
      icon: StarIcon,
    },
  ],

  [
    31,
    {
      id: 31,
      title: "Ljubav",
      icon: HeartIcon,
    },
  ],

  [
    39,
    {
      id: 39,
      title: "Anegdote",
      icon: AnecdotesIcon,
    },
  ],

  [
    34,
    {
      id: 34,
      title: "Obitelj",
      icon: FamilyIcon,
    },
  ],

  [
    40,
    {
      id: 40,
      title: "Motivacija",
      icon: TargetIcon,
    },
  ],

  [
    41,
    {
      id: 41,
      title: "Sport",
      icon: SportsIcon,
    },
  ],

  [
    42,
    {
      id: 42,
      title: "Umjetnost",
      icon: ArtIcon,
    },
  ],

  [
    32,
    {
      id: 32,
      title: "Rat",
      icon: WarIcon,
    },
  ],

  [
    36,
    {
      id: 36,
      title: "Hobi",
      icon: HobbyIcon,
    },
  ],
]);
