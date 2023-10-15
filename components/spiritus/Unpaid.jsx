import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { ClockIcon } from "@heroicons/react/outline";
import { useTranslation } from "next-i18next";

const dateOptions = { year: "numeric", month: "short", day: "numeric" };

export function UnpaidSpiritusList({ spiritusList }) {
  const router = useRouter();
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start gap-3">
      <div>
        <h2 className="font-bold text-sp-black text-2xl dark:text-sp-white">
          {t("continue_create_spiritus")}
        </h2>
        <p className="text-sp-day-400 text-sm">
          {t("continue_create_spiritus_subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {spiritusList.map((spiritus, idx) => (
          <UnpaidSpiritus
            spiritus={spiritus}
            locale={router.locale}
            key={`unpaid-spiritus-${idx}`}
          />
        ))}
      </div>
    </div>
  );
}

function UnpaidSpiritus({ spiritus, locale }) {
  const birthDate = spiritus.birth ? new Date(spiritus.birth) : null;
  const deathDate = spiritus.death ? new Date(spiritus.death) : null;

  return (
    <Link
      href={`/checkout/create/${spiritus.id}`}
      className="flex w-full rounded-sp-14 border-2 border-transparent bg-gradient-to-r from-sp-day-300 to-sp-day-100 p-2 text-sp-medlight hover:border-sp-dark-fawn dark:from-sp-dark-brown dark:to-sp-brown dark:text-sp-white"
    >
      {spiritus?.image?.url ? (
        <div className="relative mr-2 h-20 w-20 overflow-hidden rounded-sp-14 bg-sp-fawn bg-opacity-50 dark:bg-sp-medium">
          <Image
            src={spiritus.image.url}
            alt={`${spiritus.name} ${spiritus.surname} profile`}
            layout="fill"
          />
        </div>
      ) : (
        <div className="flex h-20 w-20 items-center justify-center">
          <ClockIcon className="h-7 w-7 text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60" />
        </div>
      )}
      <div className="flex w-full flex-col justify-center px-2 py-2 tracking-sp-tighten">
        <p className="break-words pr-4 capitalize text-lg">{`${spiritus.name} ${
          spiritus.surname
        }${spiritus.maidenName ? " (" + spiritus.maidenName + ")" : ""}`}</p>
        <p className="capitalize text-sp-black text-opacity-60 text-sm tracking-sp-tighten dark:text-sp-white dark:text-opacity-60">
          {`${
            birthDate
              ? new Intl.DateTimeFormat(locale || "en", dateOptions).format(
                  birthDate
                )
              : "?"
          } - ${
            deathDate
              ? new Intl.DateTimeFormat(locale || "en", dateOptions).format(
                  deathDate
                )
              : "?"
          }`}
        </p>
      </div>
    </Link>
  );
}
