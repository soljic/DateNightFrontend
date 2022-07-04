import Link from "next/link";

import { ChevronDownIcon } from "@heroicons/react/outline";

export function NavItem({ text, link, textsize }) {
  const size = textsize || "base";
  return (
    <div className="px-3 md:mx-1 py-2 font-medium hover:bg-gradient-to-r from-sp-day-300 to-sp-day-100 dark:hover:from-sp-dark-brown dark:hover:to-sp-brown focus:outline-none hover:rounded-full">
      <Link href={link || "/"}>
        <a className={`text-${size}`}>{text}</a>
      </Link>
    </div>
  );
}

export function Logo({ width, height }) {
  const w = width ? `w-${width}` : `w-6`;
  const h = height ? `h-${height}` : `h-6`;

  return (
    <svg
      viewBox="0 0 22 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${w} ${h} fill-sp-cotta dark:fill-sp-fawn`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.7784 16.3285C20.455 17.6985 20.89 19.1651 21.0364 20.5692C21.1923 22.0317 21.0435 23.5058 20.6072 24.8293C20.2181 26.0191 19.5813 27.1436 18.7661 28.0803C18.0936 28.8531 17.3154 29.5027 16.4529 30.0093C15.7881 30.4052 15.0923 30.7153 14.3871 30.9285C14.0851 31.0238 13.78 31.099 13.4631 31.1567C13.4203 31.1642 13.3771 31.168 13.3342 31.168C13.153 31.168 12.9782 31.1012 12.8497 30.978C12.6907 30.8263 12.6256 30.6099 12.6756 30.4034C12.7346 30.1594 12.7994 29.877 12.8655 29.571C12.9539 29.1236 13.0663 28.513 13.1284 27.843C13.1902 27.1044 13.1898 26.4674 13.1267 25.8993C13.0582 25.2538 12.9104 24.6412 12.6857 24.076C12.4866 23.5791 12.2197 23.0819 11.8461 22.5132C11.4955 21.9809 11.1139 21.4611 10.6799 20.925C10.2871 20.4379 9.81133 19.8874 9.13644 19.1375L9.12598 19.1274C9.06836 19.0704 9.01639 19.0131 8.95502 18.9454L8.94275 18.9318C8.87053 18.8516 8.79967 18.7729 8.70046 18.6685L8.55873 18.5177C8.55811 18.517 8.54759 18.5055 8.52991 18.4862C8.44222 18.3907 8.1784 18.1033 8.07113 17.9794C7.63853 17.5057 7.20153 16.9414 6.74565 16.2665C5.88314 14.9701 5.25786 13.5544 4.93492 12.1681C4.59478 10.736 4.5634 9.19268 4.84719 7.82488C5.09588 6.58186 5.61656 5.38461 6.35219 4.36668C6.95149 3.53372 7.67328 2.81612 8.49698 2.23521C9.14285 1.78095 9.81774 1.41949 10.5038 1.15959C10.8304 1.0342 11.1604 0.930741 11.4824 0.85268C11.698 0.799699 11.9281 0.850172 12.0968 0.986857C12.2652 1.12323 12.3499 1.32826 12.3233 1.53423C12.2888 1.7985 12.2537 2.09758 12.2227 2.43553C12.1798 2.94309 12.1383 3.55159 12.1586 4.18485C12.1792 4.89806 12.2558 5.54387 12.387 6.1066C12.5254 6.72795 12.7441 7.3026 13.0363 7.81893C13.2887 8.27225 13.5924 8.70707 14.0223 9.23281C14.3894 9.67923 14.8129 10.1467 15.3164 10.6608C15.3194 10.6641 15.3224 10.6673 15.3253 10.6705C15.3318 10.6775 15.3382 10.6844 15.3444 10.6915C15.4101 10.7682 15.4833 10.8371 15.5495 10.8995C15.5548 10.9044 15.56 10.9093 15.5651 10.9141C15.6191 10.9652 15.6673 11.011 15.7122 11.0567C15.7203 11.0649 15.7281 11.073 15.7352 11.0815C15.8276 11.1862 15.939 11.2909 16.047 11.3919L16.1458 11.485C16.213 11.5461 16.2808 11.6151 16.3615 11.701L16.6918 12.0364C16.8352 12.174 17.1129 12.4725 17.3863 12.7841C18.3591 13.8873 19.1646 15.0808 19.7784 16.3285ZM6.71503 22.7882C7.15741 23.2895 7.52523 23.835 7.80632 24.4062C8.11474 25.0313 8.31316 25.7006 8.38065 26.3417C8.45016 26.9994 8.38065 27.6907 8.18392 28.2873C8.00609 28.8302 7.71555 29.3438 7.34368 29.7707C7.03492 30.125 6.67892 30.4222 6.28512 30.6526C6.06578 30.7833 5.83328 30.8962 5.59842 30.9849C5.51676 31.0156 5.43037 31.0307 5.345 31.0307C5.19349 31.0307 5.04366 30.9834 4.92185 30.8928C4.73119 30.7501 4.63839 30.5225 4.6799 30.2984C4.72242 30.0667 4.75245 29.8579 4.77067 29.6601C4.79834 29.3271 4.79834 29.0362 4.76966 28.7776C4.73828 28.481 4.67045 28.2004 4.56787 27.9421C4.4771 27.7151 4.35528 27.4885 4.18554 27.2308C4.02661 26.9884 3.85282 26.7514 3.65373 26.506C3.42461 26.2216 3.15634 25.9197 2.94814 25.6887L2.93768 25.6783C2.91507 25.6564 2.89077 25.6297 2.86242 25.5975C2.82969 25.5605 2.79629 25.5235 2.74871 25.4736L2.68864 25.4103L2.68965 25.4094L2.67448 25.393C2.61511 25.329 2.5084 25.2139 2.45682 25.1545C2.26515 24.9444 2.06606 24.6871 1.85785 24.3795C1.46271 23.7854 1.17723 23.1387 1.02977 22.5051C0.874541 21.8524 0.860706 21.147 0.990622 20.5213C1.13404 19.8056 1.44347 19.2682 1.67766 18.9444C1.95031 18.5651 2.27966 18.2378 2.65557 17.9722C2.89043 17.8073 3.13575 17.6681 3.38546 17.5575C3.60244 17.4619 3.85755 17.48 4.05596 17.6058C4.25438 17.7315 4.36574 17.9459 4.34853 18.1682C4.33537 18.3365 4.31917 18.5917 4.32761 18.8616C4.33706 19.1867 4.37181 19.4814 4.4312 19.7375C4.49498 20.0225 4.59419 20.284 4.72748 20.5197C4.87325 20.7806 5.03826 20.994 5.18067 21.1693C5.34905 21.3734 5.54038 21.5844 5.76276 21.811C5.77086 21.8192 5.77862 21.8276 5.78604 21.8361C5.81339 21.8678 5.84503 21.898 5.87746 21.9291L5.88221 21.9336L5.94059 21.99C5.94869 21.9979 5.95645 22.0063 5.96387 22.0145C6.00572 22.0609 6.05498 22.1076 6.10425 22.1534L6.14677 22.1932C6.17781 22.2223 6.20717 22.2518 6.24766 22.2941L6.40323 22.4521C6.46903 22.5154 6.60367 22.6612 6.71503 22.7882Z"
      ></path>
    </svg>
  );
}

export function ImagePlaceholder() {
  return (
    <div className="flex w-full h-full mx-auto border-3 dark:border border-sp-day-200 dark:border-sp-medium rounded-md justify-center items-center">
      <div className="mx-auto">
        <svg
          className="h-16 w-16 text-gray-500"
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
  );
}

export function HorizontalDivider() {
  return (
    <div className="relative flex w-full items-center py-5">
      <div className="flex-grow border-t-3 border-sp-day-200 dark:border-sp-medium"></div>
      <div className="bg-sp-day-900 bg-opacity-10 dark:bg-sp-dark-brown rounded-lg p-1.5 mx-2">
        <ChevronDownIcon className="h-5 w-5 text-sp-day-900 dark:text-sp-fawn" />
      </div>
      <div className="flex-grow border-t-3 border-sp-day-200 dark:border-sp-medium"></div>
    </div>
  );
}
