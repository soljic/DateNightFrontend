import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Partnership() {
  const { t } = useTranslation("about");

  return (
    <section className="my-16 mb-3 flex flex-col items-center justify-center gap-4 px-4 md:flex-row">
      <div className="flex w-full flex-col items-start justify-start md:w-1/2">
        <p className="text-center font-bold leading-5 text-sp-fawn tracking-sp-tighten">
          {t("partnerships_title")}
        </p>
        <p className="mt-2.5 w-full font-bold leading-5 text-xl tracking-wide dark:text-sp-white lg:w-3/4">
          {t("partnerships_subtitle")}
        </p>
        <Link
          href="mailto:hello@spiritus.app?subject=Hello! Partnership Contact Form"
          className="mt-3 flex w-full items-center justify-center gap-1 rounded-sp-40 border-4 border-sp-fawn bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn px-5 py-3.5 font-semibold text-sp-black dark:border-sp-medium dark:border-opacity-80 dark:from-sp-dark-fawn dark:to-sp-fawn md:w-2/3 lg:w-1/2 2xl:w-1/2"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5014 0.5C17.8527 0.5 23.0014 5.64873 23.0014 12C23.0014 18.3513 17.8527 23.5 11.5014 23.5C9.55138 23.5 7.67162 23.0132 6.00126 22.1018L1.27666 23.4623C0.745935 23.6151 0.19183 23.3087 0.0390329 22.778C-0.0130543 22.5971 -0.0130103 22.4052 0.0391614 22.2242L1.40095 17.5025C0.487902 15.8299 0.00144902 13.9497 0.00144902 12C0.00144902 5.64873 5.15017 0.5 11.5014 0.5ZM12.2497 13.5H7.75145L7.64968 13.5068C7.2836 13.5565 7.00145 13.8703 7.00145 14.25C7.00145 14.6297 7.2836 14.9435 7.64968 14.9932L7.75145 15H12.2497L12.3515 14.9932C12.7176 14.9435 12.9997 14.6297 12.9997 14.25C12.9997 13.8703 12.7176 13.5565 12.3515 13.5068L12.2497 13.5ZM15.2559 9H7.75145L7.64968 9.00685C7.2836 9.05651 7.00145 9.3703 7.00145 9.75C7.00145 10.1297 7.2836 10.4435 7.64968 10.4932L7.75145 10.5H15.2559L15.3577 10.4932C15.7238 10.4435 16.0059 10.1297 16.0059 9.75C16.0059 9.3703 15.7238 9.05651 15.3577 9.00685L15.2559 9Z"
              fill="#171411"
            />
          </svg>
          <span className="font-semibold tracking-sp-tighten">
            {t("hero_contact")}
          </span>
        </Link>
      </div>
      <div className="w-full md:w-1/2 lg:pr-20">
        <p className="tracking-sp-tighter leading-4 opacity-70 text-sm dark:text-sp-white">
          {t("partnerships_text")}
        </p>
      </div>
    </section>
  );
}
