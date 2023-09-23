import { useState } from "react";

import { useRouter } from "next/router";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";

import { ReadAllNotifications } from "@/service/http/notifications";

import { cn } from "@/utils/cn";

import { Spinner } from "../Status";

export function NotificationList({ unread, read }) {
  const { t } = useTranslation("settings");

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
        {unread && unread.length > 0
          ? unread.map((n, idx) => (
              <Notification
                key={`notification-elem-${idx}-read`}
                title={n.title}
                subtitle={n.subtitle}
                date={n.createdDate}
                read={n.read}
                createdDate={n.createdDate}
              />
            ))
          : null}
      </div>
      {read && read.length > 0 && (
        <SeenNotificationsAccordion notifications={read} />
      )}
    </section>
  );
}

function Notification({ title, subtitle, createdDate, read }) {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-between px-4 py-3.5",
        read ? "opacity-50" : ""
      )}
    >
      <h2>{title}</h2>
      {!!subtitle && <p>{subtitle}</p>}
      <div className="opacity-60 text-sm">{createdDate}</div>
    </div>
  );
}

function SeenNotificationsAccordion({ notifications }) {
  const { t } = useTranslation("settings");

  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="py-4">
      <div className="flex w-full items-center justify-between pb-2">
        <h2 className="font-semibold leading-none text-sp-black subpixel-antialiased text-2xl tracking-tight dark:text-sp-white">
          {t("read_notifications")}
        </h2>
        <button
          onClick={toggleOpen}
          className="flex items-center rounded-sp-10 p-2 hover:bg-gradient-to-r  hover:from-day-gradient-start hover:to-day-gradient-stop dark:text-sp-white dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
        >
          {open ? (
            <ChevronUpIcon className="h-5 w-5 text-sp-lighter" />
          ) : (
            <ChevronDownIcon className="h-5 w-5 text-sp-lighter" />
          )}
        </button>
      </div>
      {open && (
        <div className="flex flex-col divide-y-2 divide-sp-day-200/90 overflow-hidden rounded-sp-14 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:divide-sp-black dark:bg-gradient-to-r dark:from-sp-dark-brown dark:to-sp-brown">
          {notifications && notifications.length > 0
            ? notifications.map((n, idx) => (
                <Notification
                  key={`notification-elem-${idx}-read`}
                  title={n.title}
                  date={n.createdDate}
                  read={n.read}
                  createdDate={n.createdDate}
                />
              ))
            : null}
        </div>
      )}
    </div>
  );
}
