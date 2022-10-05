import Link from "next/link";

export function SpiritusOverview({
  id,
  slug,
  name,
  surname,
  birth,
  death,
  description,
  location,
}) {
  return (
    <div className="w-full md:w-3/4 flex flex-col justify-between items-center py-4 mb-4">
      <div className="flex flex-col tracking-sp-tighten text-sp-black dark:text-sp-white">
        <Link href={`/spiritus/${slug}`}>
          <a className="flex flex-col items-center">
            {location && location?.address ? (
              <button className="px-5 py-1 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown text-sm font-medium rounded-full">
                {location.address}<br></br>{location.country}
              </button>
            ) : (
              <></>
            )}
            <span className="pt-3.5 pb-2.5">
              {birth ? new Date(birth).toLocaleDateString("hr") : "?"}
              {death && ` — ${new Date(death).toLocaleDateString("hr")}`}
            </span>
            <h2 className="font-bold text-cta pb-4">
              {name} {surname}
            </h2>
          </a>
        </Link>
        {!!description && (
          <p className="border-l-4 pl-2 border-sp-day-900 dark:border-sp-fawn">
            {`"${description}"`}
          </p>
        )}
      </div>
    </div>
  );
}
