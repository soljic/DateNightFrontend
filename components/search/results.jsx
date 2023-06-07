// Unused, was used for fulltext spiritus search
function SearchResults({ results }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col rounded-sp-14 py-2">
      <p className="p-2 text-center text-sp-lighter">
        {results.length} <span> {t("search_results")}</span>
      </p>
      <div className="flex flex-col items-start">
        {results.map((res) => {
          return <Row key={`${res.name}-${res.surname}-${res.id}`} {...res} />;
        })}
      </div>
    </div>
  );
}

// Unused, was used for fulltext spiritus search
function Row({ name, surname, images, birth, death, slug }) {
  return (
    <Link
      href={`/spiritus/${slug}`}
      className="flex w-full rounded-sp-14 p-2 text-sp-medlight hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
    >
      {images.length ? (
        <div className="relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
          <Image
            src={images[0].url}
            alt={"Search result thumbnail"}
            layout="fill"
          />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center">
          <ClockIcon className="h-7 w-7 text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60" />
        </div>
      )}
      <div className="flex w-full flex-col justify-center px-2 py-2 text-lg tracking-sp-tighten">
        <p className="break-words pr-4 capitalize">
          {`${name} ${surname}`.toLowerCase()}
        </p>
        <p className="text-sp-black text-opacity-60 tracking-sp-tighten dark:text-sp-white dark:text-opacity-60">
          {birth ? new Date(birth).getFullYear() : "?"}
          {death && ` — ${new Date(death).getFullYear()}`}
        </p>
      </div>
    </Link>
  );
}
