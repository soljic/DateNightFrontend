export function SpiritusOverview({
  id,
  name,
  surname,
  birth,
  death,
  description,
}) {
  return (
    <div className="w-3/4 flex flex-col justify-between items-center py-4 mb-4">
      <div className="flex flex-col tracking-sp-tighten text-sp-black dark:text-sp-white">
        <div className="flex flex-col items-center">
          <button className="px-2.5 py-1 bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:from-sp-dark-brown dark:to-sp-brown text-sm font-medium rounded-full">
            🇭🇷 Požega
          </button>
          <span className="pt-3.5 pb-2.5">
            {birth ? new Date(birth).toLocaleDateString("hr") : "?"}
            {death && ` — ${new Date(death).toLocaleDateString("hr")}`}
          </span>
          <h2 className="font-bold text-xl md:text-cta pb-4">
            {name} {surname}
          </h2>
        </div>
        {!!description && (
          <p className="border-l-4 pl-2 border-sp-day-900 dark:border-sp-fawn">
            {`"${description}"`}
          </p>
        )}
      </div>
    </div>
  );
}
