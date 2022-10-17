// Unused, was used for fulltext spiritus search
function SearchResults({ results }) {
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col rounded-sp-14 py-2">
      <p className="p-2 text-sp-lighter text-center">
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
    <Link href={`/spiritus/${slug}`}>
      <a className="flex w-full p-2 hover:bg-gradient-to-r hover:from-sp-day-300 hover:to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown rounded-sp-14 text-sp-medlight dark:text-sp-white">
        {images.length ? (
          <div className="relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
            <Image
              src={images[0].url}
              alt={"Search result thumbnail"}
              layout="fill"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-20 w-20">
            <ClockIcon className="w-7 h-7 text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60" />
          </div>
        )}
        <div className="flex w-full flex-col justify-center py-2 px-2 text-lg tracking-sp-tighten">
          <p className="break-words pr-4 capitalize">
            {`${name} ${surname}`.toLowerCase()}
          </p>
          <p className="text-opacity-60 dark:text-opacity-60 text-sp-black dark:text-sp-white tracking-sp-tighten">
            {birth ? new Date(birth).getFullYear() : "?"}
            {death && ` — ${new Date(death).getFullYear()}`}
          </p>
        </div>
      </a>
    </Link>
  );
}
