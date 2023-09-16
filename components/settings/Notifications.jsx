import { useState } from "react";

import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ReadAllNotifications } from "@/service/http/notifications";

import { cn } from "@/utils/cn";

import { Spinner } from "../Status";

export function NotificationList({ notifications }) {
  const { t } = useTranslation(["settings"]);

  const { data: session, status } = useSession();
  const router = useRouter();

  const [pending, setPending] = useState(false);

  const readAll = async () => {
    setPending(true);
    try {
      await ReadAllNotifications(session.user.accessToken);
      router.reload();
    } catch {
      setPending(false);
    }
  };

  return (
    <section className="mx-auto min-h-screen w-full p-2">
      <div className="flex flex-col justify-between gap-y-2 pb-4 xs:flex-row md:items-end">
        <h1 className="font-bold leading-none text-sp-black subpixel-antialiased text-2xl tracking-tight dark:text-sp-white">
          {t("notifications")}
        </h1>
        <button
          onClick={(e) => {
            e.preventDefault();
            readAll();
          }}
          disabled={pending}
          className={`w-32 rounded-sp-14 bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn p-2.5 text-sp-white dark:border-sp-medium dark:from-sp-dark-fawn dark:to-sp-fawn dark:text-sp-black`}
        >
          {pending ? <Spinner text={""} /> : t("notifications_read_all")}
        </button>
      </div>
      <div className="flex flex-col divide-y-2 divide-sp-day-200/90 overflow-hidden rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:divide-sp-black dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
        {notifications && notifications.length > 0
          ? notifications.map((n, idx) => (
              <div
                key={`notification-elem-${idx}`}
                className={cn(
                  "flex flex-col items-start justify-between px-4 py-3.5",
                  n.read ? "opacity-50" : ""
                )}
              >
                <h2>{n.title}</h2>
                <p>{n.subtitle}</p>
                <div className="opacity-60 text-sm">{n.createdDate}</div>
              </div>
            ))
          : null}
      </div>
    </section>
  );
}
