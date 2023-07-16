import { useState } from "react";

import Link from "next/link";

import { PlusIcon, XIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

export default function FAQSection() {
  const { t } = useTranslation(["about", "faq"]);
  return (
    <section id="features" key={"features-section"}>
      <div className="mx-auto my-24 flex items-center justify-center subpixel-antialiased">
        <div className="flex w-2/3 flex-col items-center justify-start lg:w-1/2">
          <h2 className="text-center font-bold leading-5 text-sp-fawn tracking-sp-tighten">
            {t("faq_title")}
          </h2>
          <p className="text-2xlh my-2.5 text-center font-bold tracking-tight dark:text-sp-white sm:w-full md:w-3/4">
            {t("faq_subtitle")}
          </p>
          <p className="text-center font-medium leading-5 opacity-70 tracking-sp-tighten dark:text-sp-white md:w-full">
            <Link
              href="mailto:hello@spiritus.app?subject=FAQ - Contact Form"
              className="mr-1 underline underline-offset-2"
            >
              {t("faq_cta_text")}
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
    <div className="flex w-full flex-col items-center justify-center gap-2.5">
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
      className={`w-full cursor-pointer rounded-sp-10 md:w-2/3 ${
        open
          ? "bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown"
          : ""
      }`}
    >
      <button
        onClick={toggleOpen}
        className="flex w-full items-center justify-between rounded-sp-10 px-4 py-2.5 hover:bg-gradient-to-r hover:from-day-gradient-start  hover:to-day-gradient-stop dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown lg:py-5"
      >
        <div className="text-left font-medium leading-[22px] text-lg tracking-sp-tighten lg:text-xl">
          {title}
        </div>
        {open ? (
          <XIcon className="h-5 w-5 text-sp-lighter" />
        ) : (
          <PlusIcon className="h-5 w-5 text-sp-lighter" />
        )}
      </button>
      {open && (
        <p className="whitespace-pre-line px-4 pb-3 font-medium leading-6 text-sp-black text-opacity-70 text-base tracking-sp-tighten dark:text-sp-white dark:text-opacity-70 md:pb-6 lg:pb-8">
          {text}
        </p>
      )}
    </div>
  );
}
