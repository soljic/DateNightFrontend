export function SpiritusOverview({ name, surname, birth, death, description }) {
  return (
    <div className="w-full lg:max-w-full lg:flex mb-4 text-sp-black dark:text-sp-white">
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          <div className="text-sm flex items-center mb-2">
            <button className="px-2.5 py-1 dark:from-sp-lighter dark:to-sp-lighter bg-gradient-to-r from-sp-day-300 to-sp-day-100 text-sm font-medium rounded-full">
              🇭🇷 Croatia
            </button>
            <span className="pl-3">
              {birth ? new Date(birth).toLocaleDateString("hr") : "?"}
              {death && ` — ${new Date(death).toLocaleDateString("hr")}`}
            </span>
          </div>
          <h2 className="font-bold text-3xl">
            {name} {surname}
          </h2>
        </div>
        {description && (
          <p className="text-base border-l-4 border-sp-day-900 dark:border-sp-fawn pl-2">
            {`"${description}"`}
          </p>
        )}
      </div>
    </div>
  );
}
