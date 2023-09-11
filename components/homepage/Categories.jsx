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
  RequiemIcon,
  SportsIcon,
  StarIcon,
  TargetIcon,
  WarIcon,
} from "./Icons";

export function CategoryTiles({ categories }) {
  const { t } = useTranslation("common");

  return (
    <div className="mx-5 md:mx-0">
      <h2 className="mb-4 text-start font-bold text-2xl">
        {t("section_categories_title")}
      </h2>
      <div className="mt-5 rounded-sp-10 bg-gradient-to-b from-day-gradient-start to-day-gradient-stop px-4 py-4 text-sp-black dark:from-sp-fawn/40 dark:to-sp-fawn/30 dark:text-sp-white md:w-full md:px-8 md:py-8 lg:mt-2">
        {categories && categories?.items.length ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {categories.items.map((item) => (
              <CategoryTile
                key={`cat-id-${item.id}`}
                title={item.title}
                sectionId={categories.id}
                categoryId={item.id}
                categoryCode={item.code}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function CategoryTile({ sectionId, categoryId, categoryCode, title }) {
  const c = iconMap.get(categoryCode);

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
  ["BIO", { icon: BioIcon }],
  ["FAM", { icon: StarIcon }],
  ["LVE", { icon: HeartIcon }],
  ["ACD", { icon: AnecdotesIcon }],
  ["FMY", { icon: FamilyIcon }],
  ["MTV", { icon: TargetIcon }],
  ["SPT", { icon: SportsIcon }],
  ["ART", { icon: ArtIcon }],
  ["WAR", { icon: WarIcon }],
  ["HBY", { icon: HobbyIcon }],
  ["REQ", { icon: RequiemIcon }],
]);
