import Link from "next/link";

// asHref uses regular <a> tag instead of next/link
export function NavItem({ text, link, asHref }) {
  return (
    <>
      {asHref ? (
        <a
          href={link || "/"}
          className="from-day-gradient-start to-day-gradient-stop px-1.5 py-2 text-center leading-5 hover:rounded-sp-10 hover:bg-gradient-to-r focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown md:mx-0.5 xl:text-lg"
        >
          {text}
        </a>
      ) : (
        <Link
          href={link || "/"}
          className="from-day-gradient-start to-day-gradient-stop px-1.5 py-2 text-center leading-5 hover:rounded-sp-10 hover:bg-gradient-to-r focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown md:mx-0.5 xl:text-lg"
        >
          {text}
        </Link>
      )}
    </>
  );
}

export function SubNavItem({ text, link }) {
  return (
    <Link
      href={link || "/"}
      className="w-full from-day-gradient-start to-day-gradient-stop p-2 text-start hover:rounded-sp-10 hover:bg-gradient-to-r focus:outline-none dark:hover:from-sp-dark-brown dark:hover:to-sp-brown"
    >
      {text}
    </Link>
  );
}

export function Logo({ className }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9853 15.224C21.4466 16.1581 21.7431 17.158 21.843 18.1154C21.9493 19.1125 21.8478 20.1176 21.5503 21.02C21.2851 21.8312 20.8509 22.5979 20.2951 23.2366C19.8365 23.7635 19.306 24.2064 18.7179 24.5518C18.2646 24.8217 17.7902 25.0331 17.3094 25.1785C17.1034 25.2435 16.8955 25.2948 16.6794 25.3341C16.6502 25.3392 16.6207 25.3418 16.5915 25.3418C16.468 25.3418 16.3488 25.2963 16.2611 25.2123C16.1528 25.1088 16.1084 24.9613 16.1424 24.8205C16.1827 24.6542 16.2269 24.4616 16.272 24.253C16.3322 23.9479 16.4088 23.5316 16.4512 23.0748C16.4933 22.5712 16.4931 22.1368 16.45 21.7495C16.4033 21.3094 16.3026 20.8918 16.1493 20.5064C16.0136 20.1676 15.8316 19.8286 15.5769 19.4408C15.3378 19.0779 15.0776 18.7235 14.7818 18.358C14.5139 18.0258 14.1895 17.6505 13.7294 17.1392L13.7223 17.1323C13.683 17.0935 13.6476 17.0544 13.6057 17.0082L13.5973 16.999C13.5481 16.9442 13.4998 16.8906 13.4321 16.8194L13.3355 16.7166C13.3351 16.7161 13.3279 16.7083 13.3158 16.6951C13.256 16.63 13.0762 16.4341 13.003 16.3496C12.7081 16.0266 12.4101 15.6419 12.0993 15.1817C11.5112 14.2978 11.0849 13.3325 10.8647 12.3873C10.6328 11.4109 10.6114 10.3586 10.8049 9.42606C10.9745 8.57854 11.3295 7.76224 11.831 7.06819C12.2397 6.50026 12.7318 6.01099 13.2934 5.61491C13.7338 5.30519 14.1939 5.05874 14.6617 4.88154C14.8844 4.79604 15.1094 4.72551 15.3289 4.67228C15.4759 4.63616 15.6328 4.67057 15.7478 4.76377C15.8627 4.85675 15.9204 4.99654 15.9022 5.13697C15.8788 5.31716 15.8548 5.52108 15.8337 5.7515C15.8044 6.09756 15.7761 6.51245 15.7899 6.94422C15.804 7.4305 15.8562 7.87082 15.9457 8.2545C16.04 8.67815 16.1891 9.06995 16.3884 9.422C16.5605 9.73108 16.7675 10.0275 17.0607 10.386C17.311 10.6904 17.5997 11.0091 17.943 11.3596C17.9494 11.3667 17.9559 11.3735 17.9621 11.3806C18.0069 11.4329 18.0568 11.4799 18.102 11.5224C18.1055 11.5257 18.1091 11.529 18.1126 11.5323C18.1494 11.5672 18.1823 11.5984 18.2129 11.6296C18.2184 11.6352 18.2237 11.6407 18.2285 11.6465C18.2916 11.7179 18.3675 11.7893 18.4411 11.8581L18.5085 11.9216C18.5543 11.9633 18.6005 12.0103 18.6555 12.0688L18.8808 12.2976C18.9786 12.3914 19.1679 12.5949 19.3543 12.8074C20.0176 13.5595 20.5668 14.3733 20.9853 15.224ZM12.0784 19.6303C12.3801 19.9721 12.6308 20.344 12.8225 20.7335C13.0328 21.1597 13.1681 21.616 13.2141 22.0531C13.2615 22.5016 13.2141 22.9729 13.0799 23.3797C12.9587 23.7499 12.7606 24.1 12.5071 24.3911C12.2965 24.6327 12.0538 24.8353 11.7853 24.9924C11.6358 25.0815 11.4772 25.1585 11.3171 25.219C11.2614 25.2399 11.2025 25.2502 11.1443 25.2502C11.041 25.2502 10.9389 25.2179 10.8558 25.1561C10.7258 25.0589 10.6625 24.9037 10.6908 24.7509C10.7198 24.5929 10.7403 24.4505 10.7527 24.3157C10.7716 24.0887 10.7716 23.8903 10.752 23.714C10.7306 23.5118 10.6844 23.3205 10.6145 23.1443C10.5526 22.9896 10.4695 22.835 10.3538 22.6593C10.2454 22.4941 10.1269 22.3325 9.99118 22.1651C9.83496 21.9713 9.65205 21.7654 9.51009 21.6079L9.50296 21.6008C9.48755 21.5859 9.47098 21.5677 9.45165 21.5457C9.42934 21.5205 9.40656 21.4953 9.37412 21.4613L9.33316 21.4181L9.33385 21.4174L9.32344 21.4062C9.28295 21.3625 9.21025 21.2841 9.1751 21.2437C9.04442 21.1005 8.90867 20.925 8.76672 20.7153C8.4973 20.3102 8.30266 19.8693 8.20211 19.4373C8.09628 18.9923 8.08685 18.5113 8.17542 18.0847C8.27321 17.5967 8.48419 17.2303 8.64386 17.0095C8.82976 16.7509 9.05431 16.5277 9.31062 16.3467C9.47075 16.2343 9.63801 16.1393 9.80827 16.0639C9.95621 15.9987 10.1301 16.0111 10.2654 16.0968C10.4007 16.1825 10.4766 16.3287 10.4649 16.4803C10.4559 16.5951 10.4449 16.7691 10.4506 16.9531C10.4571 17.1747 10.4808 17.3757 10.5213 17.5503C10.5648 17.7446 10.6324 17.9229 10.7233 18.0836C10.8227 18.2614 10.9352 18.407 11.0323 18.5265C11.1471 18.6656 11.2775 18.8095 11.4292 18.964C11.4347 18.9696 11.44 18.9754 11.445 18.9811C11.4637 19.0027 11.4853 19.0234 11.5074 19.0445L11.5106 19.0476L11.5504 19.0861C11.5559 19.0914 11.5612 19.0972 11.5663 19.1028C11.5948 19.1344 11.6284 19.1662 11.662 19.1975L11.691 19.2246C11.7121 19.2445 11.7322 19.2646 11.7598 19.2934L11.8658 19.4012C11.9107 19.4443 12.0025 19.5437 12.0784 19.6303Z"
        fill="url(#paint0_linear_9983_1266)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_9983_1266"
          x1="8.11523"
          y1="15"
          x2="21.884"
          y2="15"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ED9A4C" />
          <stop offset="1" stopColor="#E3AA6D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ImagePlaceholder() {
  return (
    <div className="mx-auto flex h-full w-full items-center justify-center rounded-xl border-2 border-sp-day-200 dark:border-2 dark:border-sp-fawn dark:border-opacity-10">
      <div className="mx-auto">
        <svg
          className="h-16 w-16 text-sp-day-400 text-opacity-80"
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
    <div className="relative flex w-full items-center">
      <div className="flex-grow border-t-2 border-sp-day-200 dark:border-sp-medium"></div>
      <div className="mx-2 p-1.5 opacity-20">
        <Logo className="h-6 w-6" />
      </div>
      <div className="flex-grow border-t-2 border-sp-day-200 dark:border-sp-medium"></div>
    </div>
  );
}
