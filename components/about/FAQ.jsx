import Link from "next/link";
import { PlusIcon, XIcon } from "@heroicons/react/outline";

import { useTranslation } from "next-i18next";

import { CheckIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function FAQSection() {
  const { t } = useTranslation(["about", "faq"]);
  return (
    <section id="features" key={"features-section"}>
      <div className="flex justify-center items-center my-24 subpixel-antialiased mx-auto">
        <div className="flex flex-col items-center justify-start w-2/3 lg:w-1/2">
          <h2 className="font-bold text-center tracking-sp-tighten leading-5 text-sp-fawn">
            {t("faq_title")}
          </h2>
          <p className="my-2.5 text-2xlh sm:w-full md:w-3/4 text-center font-bold tracking-tight dark:text-sp-white">
            {t("faq_subtitle")}
          </p>
          <p className="md:w-full text-center font-medium tracking-sp-tighten leading-5 opacity-70 dark:text-sp-white">
            <Link href="mailto:hello@spiritus.app?subject=FAQ - Contact Form">
              <a className="underline underline-offset-2 mr-1">
                {t("faq_cta_text")}
              </a>
            </Link>
            {t("faq_text")}
          </p>
        </div>
      </div>
      <Questions />
    </section>
  );
}

function Questions() {
  const { t } = useTranslation("faq");

  const items = [
    {
      Q: t("faq_1_question"),
      A: t("faq_1_answer"),
    },
    {
      Q: t("faq_2_question"),
      A: t("faq_2_answer"),
    },
    {
      Q: t("faq_3_question"),
      A: t("faq_3_answer"),
    },
    {
      Q: t("faq_4_question"),
      A: t("faq_4_answer"),
    },
    {
      Q: t("faq_5_question"),
      A: t("faq_5_answer"),
    },
    {
      Q: t("faq_6_question"),
      A: t("faq_6_answer"),
    },
    {
      Q: t("faq_7_question"),
      A: t("faq_7_answer"),
    },
    {
      Q: t("faq_8_question"),
      A: t("faq_8_answer"),
    },
    {
      Q: t("faq_9_question"),
      A: t("faq_9_answer"),
    },
    {
      Q: t("faq_10_question"),
      A: t("faq_10_answer"),
    },
    {
      Q: t("faq_11_question"),
      A: t("faq_11_answer"),
    },
    {
      Q: t("faq_12_question"),
      A: t("faq_12_answer"),
    },
    {
      Q: t("faq_13_question"),
      A: t("faq_13_answer"),
    },
    {
      Q: t("faq_14_question"),
      A: t("faq_14_answer"),
    },
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center gap-2.5">
      {items.map((item, i) => (
        <Accordion
          key={`faq-section-question-${i}`}
          title={item.Q}
          text={item.A}
        />
      ))}
    </div>
  );
}

function Accordion({ title, text }) {
  const { t } = useTranslation("faq");

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full md:w-2/3 cursor-pointer rounded-sp-10 ${
        open
          ? "bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown"
          : ""
      }`}
    >
      <button
        onClick={toggleOpen}
        className="w-full py-2.5 lg:py-5 px-4 flex justify-between items-center rounded-sp-10 dark:text-sp-white  hover:bg-gradient-to-r hover:from-day-gradient-start hover:to-day-gradient-stop dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
      >
        <div className="font-medium text-lg lg:text-xl tracking-sp-tighten leading-[22px] text-left">
          {title}
        </div>
        {open ? (
          <XIcon className="w-5 h-5 text-sp-lighter" />
        ) : (
          <PlusIcon className="w-5 h-5 text-sp-lighter" />
        )}
      </button>
      {open && (
        <p className="whitespace-pre-line pb-3 md:pb-6 lg:pb-8 px-4 text-base font-medium tracking-sp-tighten leading-6 text-sp-black dark:text-sp-white text-opacity-70 dark:text-opacity-70">
          {text}
        </p>
      )}
    </div>
  );
}
