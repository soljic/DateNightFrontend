import Link from "next/link";
import { useTranslation } from "next-i18next";

export default function Facts() {
  const { t } = useTranslation("about");

  const elements = [
    {
      icon: <SavedMemorialsIcon width={6} height={6} />,
      title: t("facts_1"),
      number: t("facts_1_number"),
    },
    {
      icon: <CemeteryDealsIcon width={6} height={6} />,
      title: t("facts_2"),
      number: t("facts_2_number"),
    },
    {
      icon: <MemoryGuardiansIcon width={6} height={6} />,
      title: t("facts_3"),
      number: t("facts_3_number"),
    },
  ];

  return (
    <section className="mt-14 flex justify-evenly py-8 bg-gradient-to-r from-day-gradient-start to-day-gradient-stop dark:from-sp-dark-brown dark:to-sp-brown rounded-sp-14 text-sp-black dark:text-sp-white">
      {elements.map((elem, index) => {
        return (
          <div
            className="flex flex-col justify-center items-center gap-1.5"
            key={`fact-${index}`}
          >
            <div className="flex items-center gap-1">
              <h2 className="font-bold text-2xl md:text-cta md:tracking-wide">
                {elem.number}
              </h2>
              <ArrowUpIcon width={5} height={5} />
            </div>
            <div className="flex items-center gap-1.5">
              {elem.icon}
              <p className="text-xs sm:text-sm tracking-sp-tighten dark:text-sp-white">
                {elem.title}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function ArrowUpIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="16"
      height="9"
      viewBox="0 0 16 9"
      className={`${w} ${h} dark:fill-sp-white fill-sp-lighter`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2.10204 8.98145C1.0281 8.98145 0.454118 7.71655 1.16132 6.90832L6.68315 0.597654C7.38037 -0.199167 8.61995 -0.199169 9.31717 0.597654L14.839 6.90831C15.5462 7.71654 14.9722 8.98145 13.8983 8.98145H2.10204Z" />
    </svg>
  );
}

function SavedMemorialsIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="15"
      height="14"
      viewBox="0 0 15 14"
      className={`${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8342 1.06544L10.9106 1.21801L11.4871 2.75099C11.5324 2.87171 11.6276 2.96697 11.7483 3.01226L13.2284 3.56753C13.8779 3.81121 14.2269 4.50524 14.0539 5.1619L14.0122 5.29259L13.3237 6.81541C13.2703 6.9328 13.2703 7.06751 13.3237 7.1849L13.9776 8.62411C14.2646 9.25568 14.0206 9.99324 13.4339 10.3352L13.2813 10.4116L11.7483 10.9881C11.6276 11.0333 11.5324 11.1286 11.4871 11.2493L10.9318 12.7294C10.6881 13.3789 9.99409 13.7279 9.33744 13.5549L9.20675 13.5132L7.68393 12.8246C7.56654 12.7713 7.43182 12.7713 7.31443 12.8246L5.87523 13.4786C5.24366 13.7655 4.5061 13.5216 4.16416 12.9349L4.08774 12.7823L3.51128 11.2493C3.46599 11.1286 3.37074 11.0333 3.25001 10.9881L1.76994 10.4328C1.12044 10.1891 0.771413 9.49507 0.944487 8.83842L0.986129 8.70773L1.6747 7.1849C1.72803 7.06751 1.72803 6.9328 1.6747 6.81541L1.02076 5.3762C0.733798 4.74463 0.97776 4.00708 1.56447 3.66513L1.71703 3.58871L3.25001 3.01226C3.37074 2.96697 3.46599 2.87171 3.51128 2.75099L4.06656 1.27092C4.31023 0.621413 5.00427 0.27239 5.66092 0.445464L5.79161 0.487106L7.31443 1.17567C7.43182 1.22901 7.56654 1.22901 7.68393 1.17567L9.12313 0.521741C9.7547 0.234775 10.4923 0.478737 10.8342 1.06544ZM9.66308 4.70607L6.47743 8.34681L5.31498 7.18436C5.14057 7.00995 4.85779 7.00995 4.68339 7.18436C4.50898 7.35877 4.50898 7.64154 4.68339 7.81595L6.18338 9.31595C6.36606 9.49863 6.66516 9.48867 6.83528 9.29425L10.3353 5.29425C10.4977 5.10862 10.4789 4.82648 10.2933 4.66405C10.1076 4.50163 9.8255 4.52044 9.66308 4.70607Z"
        fill="url(#paint0_linear_7364_2728)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7364_2728"
          x1="0.900391"
          y1="7.00015"
          x2="14.098"
          y2="7.00015"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CemeteryDealsIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="13"
      height="13"
      className={`${w} ${h}`}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.79198 0.711852C6.21018 0.392267 6.79058 0.392274 7.20877 0.711868L12.1713 4.50435C12.8034 4.98739 12.4636 5.99595 11.6698 5.99979H1.33066C0.536867 5.99595 0.197117 4.98737 0.829212 4.50433L5.79198 0.711852ZM6.5 4.24979C6.91421 4.24979 7.25 3.914 7.25 3.49979C7.25 3.08557 6.91421 2.74979 6.5 2.74979C6.08579 2.74979 5.75 3.08557 5.75 3.49979C5.75 3.914 6.08579 4.24979 6.5 4.24979ZM2 6.99979V9.99979H3.5V6.99979H2ZM4.5 6.99979V9.99979H6V6.99979H4.5ZM7 6.99979V9.99979H8.5V6.99979H7ZM9.5 6.99979V9.99979H11V6.99979H9.5ZM0.5 12.2498C0.5 11.5594 1.05964 10.9998 1.75 10.9998H11.25C11.9404 10.9998 12.5 11.5594 12.5 12.2498V12.4998C12.5 12.7759 12.2761 12.9998 12 12.9998H1C0.723858 12.9998 0.5 12.7759 0.5 12.4998V12.2498Z"
        fill="url(#paint0_linear_7364_6582)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7364_6582"
          x1="0.5"
          y1="6.73597"
          x2="12.5003"
          y2="6.73597"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function MemoryGuardiansIcon({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      width="13"
      height="14"
      viewBox="0 0 13 14"
      className={`${w} ${h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.20039 1.2001C9.20039 0.868727 9.46902 0.600098 9.80039 0.600098H11.8004C12.1318 0.600098 12.4004 0.868727 12.4004 1.2001V3.2001C12.4004 3.53147 12.1318 3.8001 11.8004 3.8001C11.469 3.8001 11.2004 3.53147 11.2004 3.2001V2.64863L7.62465 6.22436C7.39034 6.45868 7.01044 6.45868 6.77613 6.22436L4.80039 4.24863L1.42465 7.62436C1.19034 7.85868 0.810441 7.85868 0.576127 7.62436C0.341812 7.39005 0.341812 7.01015 0.576127 6.77583L4.37613 2.97583C4.61044 2.74152 4.99034 2.74152 5.22465 2.97583L7.20039 4.95157L10.3519 1.8001H9.80039C9.46902 1.8001 9.20039 1.53147 9.20039 1.2001ZM1.00039 10.2001C1.33176 10.2001 1.60039 10.4687 1.60039 10.8001V12.8001C1.60039 13.1315 1.33176 13.4001 1.00039 13.4001C0.66902 13.4001 0.400391 13.1315 0.400391 12.8001V10.8001C0.400391 10.4687 0.66902 10.2001 1.00039 10.2001ZM4.80039 8.4001C4.80039 8.06873 4.53176 7.8001 4.20039 7.8001C3.86902 7.8001 3.60039 8.06873 3.60039 8.4001V12.8001C3.60039 13.1315 3.86902 13.4001 4.20039 13.4001C4.53176 13.4001 4.80039 13.1315 4.80039 12.8001V8.4001ZM7.40039 9.4001C7.73176 9.4001 8.00039 9.66873 8.00039 10.0001V12.8001C8.00039 13.1315 7.73176 13.4001 7.40039 13.4001C7.06902 13.4001 6.80039 13.1315 6.80039 12.8001V10.0001C6.80039 9.66873 7.06902 9.4001 7.40039 9.4001ZM11.2004 6.8001C11.2004 6.46873 10.9318 6.2001 10.6004 6.2001C10.269 6.2001 10.0004 6.46873 10.0004 6.8001V12.8001C10.0004 13.1315 10.269 13.4001 10.6004 13.4001C10.9318 13.4001 11.2004 13.1315 11.2004 12.8001V6.8001Z"
        fill="url(#paint0_linear_7364_1086)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_7364_1086"
          x1="0.400391"
          y1="7.00009"
          x2="12.4004"
          y2="7.00009"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}
