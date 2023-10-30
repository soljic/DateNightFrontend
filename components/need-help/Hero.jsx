import Image from "next/legacy/image";

import { useTranslation } from "next-i18next";

import hero from "../../public/images/need-help/img_spiritus_grid_faq.png";

export default function Hero() {
  const { t } = useTranslation("needhelp");

  return (
    <section id="hero" key="hero-section">
      <div className="flex max-h-fit max-w-full items-center justify-center">
        <Image src={hero} alt="Representative spiritus" priority className="" />
      </div>
      <div className="my-12 flex justify-center">
        <div className="mt-4 flex w-full flex-col items-center justify-center sm:w-full md:w-3/4 lg:w-2/3">
          <h1 className="mb-3 text-center font-bold tracking-tight text-cta dark:text-sp-white">
            {t("hero_title")}
          </h1>
          <h2 className="mb-3 text-center font-bold tracking-tight text-cta dark:text-sp-white">
            {t("hero_subtitle")}
          </h2>
          <p className="mb-3 mt-2 text-center font-medium leading-6 text-lg tracking-sp-tighten dark:text-sp-white">
            {t("hero_explanation")}{" "}
            <span className="text-[#D17615]">
              <a
                className="hover:underline"
                href="mailto:hello@spiritus.app?subject=FAQ - Contact Form"
              >
                {t("hero_subtitle_email_span")}
              </a>
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
