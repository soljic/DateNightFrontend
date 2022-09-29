import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useTranslation } from "next-i18next";
import { useSession } from "next-auth/react";

import { Spinner } from "../../components/Status";

import { ProxyProfileSpiritus } from "../../service/http/auth";

export function MySpiritusGrid({ spiritus, isLastPage }) {
  const { t } = useTranslation("common");
  const { data: session, status } = useSession();

  const [current, setCurrent] = useState(0);
  const [isLast, setIsLast] = useState(isLastPage);
  const [items, setItems] = useState(spiritus);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const res = await ProxyProfileSpiritus(
        session.user.accessToken,
        current + 1
      );
      setItems((prev) => [...prev, ...res.data.content]);
      setCurrent((prev) => prev + 1);
      setIsLast(res.data.last);
      setIsLoading(false);
    } catch (err) {
      // TODO: handle this
      setIsLoading(false);
      console.log("#### ERR", err.message);
    }
  };

  return (
    <div className="mx-4 mb-80">
      <h1 className="text-2xl font-bold subpixel-antialiased tracking-tight text-sp-black dark:text-sp-white">
        My Spiritus
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 mb-12">
        {items.map((item) => {
          if (item.image) {
            return (
              <Tile
                key={item.id}
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                imageUrl={item.image.url}
              />
            );
          }
          return (
            <PlaceHolderTile
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              itemType={item.itemNavigationType}
            />
          );
        })}
      </div>

      {!isLast && (
        <div className="flex justify-center">
          <button
            onClick={() => {
              loadMore();
            }}
            disabled={isLast}
            className="dark:bg-sp-medlight border border-sp-lighter dark:border-sp-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none rounded-full py-3 px-8 font-semibold cursor-pointer"
          >
            {isLoading ? (
              <Spinner text={t("loading")} />
            ) : (
              t("action_load_more")
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function PlaceHolderTile({ id, title, subtitle }) {
  return (
    <Link href={`/edit/spiritus/${id}`} key={title}>
      <a className="group w-full h-full">
        <div className="flex min-h-[248px] min-w-[192px] border-2 dark:border-2 border-sp-day-200 dark:border-sp-fawn dark:border-opacity-10 rounded-sp-14 justify-center items-center">
          <div className="mx-auto grow-1">
            <svg
              className="h-16 w-16 text-sp-fawn text-opacity-20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1988 7.1998C11.1988 7.47378 11.1713 7.74132 11.1188 7.9998H15.9988C16.8825 7.9998 17.5988 8.71615 17.5988 9.5998V12.7998H15.9988C14.2315 12.7998 12.7988 14.2325 12.7988 15.9998V17.5998H9.59883C8.71517 17.5998 7.99883 16.8835 7.99883 15.9998V11.1198C7.74034 11.1723 7.4728 11.1998 7.19883 11.1998C6.92486 11.1998 6.65732 11.1723 6.39883 11.1198V15.9998C6.39883 17.7671 7.83152 19.1998 9.59883 19.1998H12.7988V22.3998C12.7988 24.1671 14.2315 25.5998 15.9988 25.5998H20.8788C20.8264 25.3413 20.7988 25.0738 20.7988 24.7998C20.7988 24.5258 20.8264 24.2583 20.8788 23.9998H15.9988C15.1152 23.9998 14.3988 23.2835 14.3988 22.3998V19.1998H15.9988C17.7661 19.1998 19.1988 17.7671 19.1988 15.9998V14.3998H22.3988C23.2825 14.3998 23.9988 15.1161 23.9988 15.9998V20.8798C24.2573 20.8274 24.5249 20.7998 24.7988 20.7998C25.0728 20.7998 25.3403 20.8274 25.5988 20.8798V15.9998C25.5988 14.2325 24.1661 12.7998 22.3988 12.7998H19.1988V9.5998C19.1988 7.83249 17.7661 6.3998 15.9988 6.3998H11.1188C11.1713 6.65829 11.1988 6.92583 11.1988 7.1998ZM17.5988 14.3998V15.9998C17.5988 16.8835 16.8825 17.5998 15.9988 17.5998H14.3988V15.9998C14.3988 15.1161 15.1152 14.3998 15.9988 14.3998H17.5988ZM9.59883 7.1998C9.59883 8.52529 8.52431 9.5998 7.19883 9.5998C5.87334 9.5998 4.79883 8.52529 4.79883 7.1998C4.79883 5.87432 5.87334 4.7998 7.19883 4.7998C8.52431 4.7998 9.59883 5.87432 9.59883 7.1998ZM27.1988 24.7998C27.1988 26.1253 26.1243 27.1998 24.7988 27.1998C23.4733 27.1998 22.3988 26.1253 22.3988 24.7998C22.3988 23.4743 23.4733 22.3998 24.7988 22.3998C26.1243 22.3998 27.1988 23.4743 27.1988 24.7998ZM27.1988 7.1998C27.1988 8.52529 26.1243 9.5998 24.7988 9.5998C23.4733 9.5998 22.3988 8.52529 22.3988 7.1998C22.3988 5.87432 23.4733 4.7998 24.7988 4.7998C26.1243 4.7998 27.1988 5.87432 27.1988 7.1998ZM9.59883 24.7998C9.59883 26.1253 8.52431 27.1998 7.19883 27.1998C5.87334 27.1998 4.79883 26.1253 4.79883 24.7998C4.79883 23.4743 5.87334 22.3998 7.19883 22.3998C8.52431 22.3998 9.59883 23.4743 9.59883 24.7998Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
        <div className="mt-3 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">{title}</h3>
          <p className="dark:text-sp-white dark:text-opacity-60">{subtitle}</p>
        </div>
      </a>
    </Link>
  );
}

function Tile({ id, title, subtitle, imageUrl }) {
  return (
    <Link href={`/edit/spiritus/${id}`} key={title}>
      <a className="group w-full h-full">
        <div className="group-hover:opacity-75">
          <Image
            src={imageUrl}
            className="object-cover rounded-sp-14"
            width={220}
            height={248}
            layout="responsive"
          />
        </div>
        <div className="mt-3 flex flex-col justify-between">
          <h3 className="text-lg dark:text-sp-white">{title}</h3>
          <p className="dark:text-sp-white dark:text-opacity-60">{subtitle}</p>
        </div>
      </a>
    </Link>
  );
}
