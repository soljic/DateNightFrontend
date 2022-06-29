import Link from "next/link";
import Image from "next/image";

import {
  BookmarkIcon,
  UploadIcon,
  ReplyIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";

export function Tags({ tags }) {
  return (
    <div className="flex flex-row gap-3 px-2">
      {tags.map((t) => {
        return (
          <button
            key={t.id}
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-sp-dark-brown to-sp-brown text-sp-white font-semibold text-sm"
          >
            {t.value}
          </button>
        );
      })}
    </div>
  );
}

export function Tribute() {
  return (
    <div className="container w-full mx-auto items-center px-14 py-8 mt-14 sm:px-2 lg:px-14 md:px-8">
      <div className="flex flex-col mx-auto gap-3">
        <label htmlFor="tribute" className="hidden">
          Your message
        </label>
        <textarea
          id="tribute"
          type="text"
          rows="1"
          className="w-full text-2xl py-3 px-8 text-bottom bg-sp-black rounded-3xl border border-sp-lighter placeholder-sp-lighter"
          placeholder="Write tribute"
        ></textarea>

        <button
          rows="1"
          className="flex justify-center bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-4 border-sp-medium border-opacity-80 rounded-full py-3 px-7"
        >
          <svg
            width="17"
            height="22"
            viewBox="0 0 17 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4628_40040)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.89077 0.650489L8.99107 0.695166C9.06929 0.729786 10.4516 1.36114 11.4938 2.85718C11.7942 3.28836 11.6166 3.8641 11.1749 4.14878C10.9832 4.27239 10.7906 4.40048 10.5972 4.5331C10.3957 4.67135 10.1926 4.81414 9.98946 4.96225C9.91578 5.01465 9.8428 5.06857 9.76912 5.12325C9.56028 5.27781 9.35627 5.43353 9.15725 5.59043C8.7727 5.89357 8.22733 5.89424 7.84289 5.59097C7.64335 5.43357 7.43909 5.27728 7.23067 5.12249C7.15778 5.06857 7.08566 5.01541 7.01269 4.96301C6.82297 4.82476 6.63396 4.69114 6.44494 4.56199C6.24974 4.42777 6.05519 4.29799 5.86138 4.17259C5.41134 3.88142 5.2406 3.29039 5.55852 2.85883C6.05122 2.18999 6.78365 1.44239 7.86513 0.771152L7.95583 0.714755C8.23753 0.539591 8.58775 0.515517 8.89077 0.650489ZM3.68586 16.3516C3.35567 14.3943 3.73448 12.3177 4.75315 10.5055C5.1303 9.83414 5.58569 9.17307 6.1177 8.52447C6.48176 8.08063 6.44405 7.41868 5.98646 7.07206C5.92532 7.02574 5.86372 6.97954 5.80165 6.93346C4.83334 6.21688 3.89552 5.62254 2.99061 5.1515C2.34273 4.81426 1.63767 5.4874 1.75117 6.20893C2.04209 8.07786 1.57959 9.79652 1.13263 11.4574L1.13245 11.4581C0.738763 12.9202 0.367861 14.3011 0.545834 15.6652C0.86271 18.0849 2.58463 20.2346 5 20.4352C5.26652 20.4579 5.41781 20.0849 5.25081 19.8759C5.09088 19.6758 4.94132 19.468 4.80256 19.2531C4.24499 18.3864 3.86305 17.4059 3.68586 16.3516ZM15.8676 11.4588C15.4199 9.79691 14.958 8.07804 15.2489 6.20962C15.3617 5.48707 14.657 4.81405 14.0083 5.15177C13.1035 5.62284 12.1658 6.21729 11.1977 6.93422C10.1523 7.70895 9.25123 8.50643 8.49995 9.32067C7.81218 10.0657 7.24991 10.8253 6.81856 11.594C5.4376 14.0534 5.49406 17.6931 8.32034 19.5927C8.37992 19.6322 8.43951 19.6709 8.49995 19.7081C8.56267 19.7468 8.62617 19.7833 8.68975 19.819C9.00576 19.9937 9.33595 20.1327 9.67632 20.2337C10.259 20.4061 10.873 20.4692 11.498 20.4175C13.9142 20.2163 16.1375 18.0842 16.4535 15.6643C16.6322 14.3018 16.2611 12.9218 15.8684 11.4615L15.8676 11.4588Z"
                fill="#171411"
              />
            </g>
            <defs>
              <clipPath id="clip0_4628_40040">
                <rect
                  width="16"
                  height="22"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
          <span className="text-lg font-semibold text-sp-black ml-1">
            Give Rose
          </span>
        </button>

        <div className="container w-full mx-auto items-center px-14 py-4">
          <div className="flex mx-auto justify-around gap-4">
            <button className="flex flex-col w-1/3 items-center hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg p-4">
              <BookmarkIcon className="w-6 h-6" />
              Save
            </button>
            <button className="flex flex-col w-1/3 items-center hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg p-4">
              <UploadIcon className="w-6 h-6" />
              Share
            </button>

            <button className="flex flex-col w-1/3 items-center hover:bg-gradient-to-r hover:from-sp-dark-brown hover:to-sp-brown rounded-lg p-4">
              <ReplyIcon className="w-6 h-6 -scale-x-100" />
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpiritusOverview({ name, surname, birth, death, description }) {
  return (
    <div className="w-full lg:max-w-full lg:flex mb-4">
      <div className="p-4 flex flex-col justify-between leading-normal">
        <div className="mb-2">
          <div className="text-sm flex items-center mb-2">
            <button className="px-2.5 py-1 bg-sp-lighter text-sp-white text-sm font-medium rounded-full">
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
          <p className="text-base border-l-4 border-sp-fawn pl-2">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

export function MoreStories({ stories, spiritus }) {
  return (
    <section key={"stories-showcase"}>
      <div className="container mx-auto px-5 pt-20 pb-10">
        <div className="mb-4 flex w-full flex-row justify-between items-center">
          <h1 className="title-font text-2xl font-medium sm:text-3xl">
            Stories
          </h1>
          <a
            href="/create"
            className="inline-flex bg-gradient-to-r from-sp-dark-fawn to-sp-fawn rounded-full py-2 px-6 text-sp-black"
          >
            <PlusCircleIcon className="h-6 w-6" />
            <span className="font-semibold ml-1">Add Story</span>
          </a>
        </div>
        <div className="-m-4 flex flex-wrap">
          {stories.map((s) => {
            return <StoryHook {...s} spiritus={spiritus} key={s.title}/>;
          })}
        </div>
      </div>
    </section>
  );
}

export function StoryHook({
  id,
  title,
  subtitle,
  description,
  date,
  spiritus,
}) {
  return (
    <div className="p-4 md:w-1/2">
      <div className="flex h-full flex-col rounded-lg bg-gradient-to-r from-sp-dark-brown to-sp-brown p-8">
        <div className="mr-3 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sp-fawn bg-opacity-10 p-1.5">
          <svg className="h-6 w-6 text-sp-fawn" viewBox="0 0 16 16" fill="none">
            <path
              d="M8.375 1.0625C8.375 0.75184 8.12316 0.5 7.8125 0.5C7.50184 0.5 7.25 0.75184 7.25 1.0625V1.25H2.9375C1.59131 1.25 0.5 2.34131 0.5 3.6875V10.8125C0.5 12.1587 1.59131 13.25 2.9375 13.25H4.73635L3.62999 14.5774C3.4311 14.8161 3.46332 15.1708 3.70196 15.3697C3.9406 15.5686 4.2953 15.5364 4.49419 15.2977L6.20086 13.25H8.02189C8.00738 13.1261 8 13.001 8 12.875V12.5C8 12.3716 8.01291 12.2462 8.03751 12.125H2.9375C2.21263 12.125 1.625 11.5374 1.625 10.8125V3.6875C1.625 2.96263 2.21263 2.375 2.9375 2.375H13.0625C13.7874 2.375 14.375 2.96263 14.375 3.6875V6.46615C14.9504 6.98114 15.3125 7.72953 15.3125 8.5625C15.3125 8.62551 15.3104 8.68803 15.3063 8.75H15.5V3.6875C15.5 2.34131 14.4087 1.25 13.0625 1.25H8.375V1.0625ZM14.5541 8.75C14.5597 8.68824 14.5625 8.6257 14.5625 8.5625C14.5625 8.25539 14.4954 7.96395 14.375 7.70207C14.0489 6.99261 13.332 6.5 12.5 6.5C11.3609 6.5 10.4375 7.42341 10.4375 8.5625C10.4375 9.70159 11.3609 10.625 12.5 10.625C13.5759 10.625 14.4594 9.80122 14.5541 8.75ZM15.125 11.375C15.2288 11.375 15.3294 11.3891 15.4249 11.4154C15.9006 11.5466 16.25 11.9825 16.25 12.5V12.875C16.25 14.3536 14.8554 15.875 12.5 15.875C10.3438 15.875 8.99269 14.6 8.77964 13.25C8.75997 13.1253 8.75 13 8.75 12.875V12.5C8.75 12.3685 8.77256 12.2423 8.81401 12.125C8.96845 11.6881 9.38517 11.375 9.875 11.375H15.125ZM3.5 4.8125C3.5 4.50184 3.75184 4.25 4.0625 4.25H7.0625C7.37316 4.25 7.625 4.50184 7.625 4.8125C7.625 5.12316 7.37316 5.375 7.0625 5.375H4.0625C3.75184 5.375 3.5 5.12316 3.5 4.8125ZM4.0625 6.5C3.75184 6.5 3.5 6.75184 3.5 7.0625C3.5 7.37316 3.75184 7.625 4.0625 7.625H8.9375C9.24816 7.625 9.5 7.37316 9.5 7.0625C9.5 6.75184 9.24816 6.5 8.9375 6.5H4.0625ZM3.5 9.3125C3.5 9.00184 3.75184 8.75 4.0625 8.75H8.1875C8.49816 8.75 8.75 9.00184 8.75 9.3125C8.75 9.62316 8.49816 9.875 8.1875 9.875H4.0625C3.75184 9.875 3.5 9.62316 3.5 9.3125Z"
              fill="currentColor"
            />
          </svg>
        </div>
        {/*  */}
        <Link
          href={`/stories/spiritus/${spiritus.slug}?id=${spiritus.id}&story=${id}`}
        >
          <a className="title-font text-xl font-bold py-1">{title}</a>
        </Link>
        <div className="flex-grow">
          <p className="text-base leading-relaxed">{subtitle || description}</p>
          <p className="mt-3 inline-flex items-center text-sp-lighter text-sm">
            {date || ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CTAAddMemory() {
  return (
    <div className="flex flex-row justify-between rounded-2xl border-3 border-sp-medium overflow-hidden">
      <div className="flex h-full flex-col py-3 pl-4">
        <h2 className="title-font py-1 text-xl font-medium text-sp-white">
          Have a memory of Pavao?
        </h2>
        <p className="text-base ">Stories, photos, suggestions...</p>
        <p className="mt-6 inline-flex items-center font-bold text-sp-fawn">
          Send a memory
          <ChevronRightIcon className="w-4 h-4 text-sp-fawn" />
        </p>
      </div>
      <Image
        src={"/images/memory_cta_bg.png"}
        alt={"Add Memories Img"}
        width={130}
        height={130}
        layout="fixed"
      />
    </div>
  );
}
