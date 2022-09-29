export function GuardianID() {
  return (
    <div className="flex flex-col items-center gap-y-2.5 pt-1">
      <div className="mb-4">
        <svg
          width="45"
          height="52"
          viewBox="0 0 45 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.4996 24.3988C26.0342 24.3988 28.8996 21.5334 28.8996 17.9988C28.8996 14.4642 26.0342 11.5988 22.4996 11.5988C18.965 11.5988 16.0996 14.4642 16.0996 17.9988C16.0996 21.5334 18.965 24.3988 22.4996 24.3988ZM22.4996 40.3988C30.4996 40.3988 33.6996 36.3835 33.6996 32.3988C33.6996 29.7479 31.5506 27.5988 28.8996 27.5988H16.0996C13.4486 27.5988 11.2996 29.7479 11.2996 32.3988C11.2996 36.3985 14.4996 40.3989 22.4996 40.3988ZM23.3871 0.66911C22.8497 0.310817 22.1495 0.310817 21.6121 0.66911C15.4099 4.80392 8.70227 7.38377 1.47334 8.41647C0.685097 8.52908 0.0996094 9.20415 0.0996094 10.0004V24.4004C0.0996094 36.8526 7.48199 45.9386 21.9252 51.4937C22.295 51.6359 22.7043 51.6359 23.074 51.4937C37.5172 45.9386 44.8996 36.8526 44.8996 24.4004V10.0004C44.8996 9.20415 44.3141 8.52908 43.5259 8.41647C36.2969 7.38377 29.5893 4.80392 23.3871 0.66911ZM3.29961 11.3696C9.65293 10.2901 15.6284 8.06779 21.2168 4.70703L22.4996 3.91126L23.7824 4.70703C29.3708 8.06779 35.3463 10.2901 41.6996 11.3696V24.4004C41.6996 35.2549 35.4022 43.1632 22.4996 48.2827C9.59704 43.1632 3.29961 35.2549 3.29961 24.4004V11.3696Z"
            fill="url(#paint0_linear_7210_1009)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_7210_1009"
              x1="0.0996094"
              y1="26.0004"
              x2="44.8996"
              y2="26.0004"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ED9A4C" />
              <stop offset="1" stopColor="#E3AA6D" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h2 className="font-bold text-3xl tracking-sp-tighten subpixel-antialiased">
        My Guardian ID
      </h2>
      <p className="w-4/5 text-lg tracking-sp-tighten text-center subpixel-antialiased">
        You can ask another person to add you as another Guardian for their
        Spiritus. Send them your own Guardian ID.
      </p>
      <p className="text-sm text-sp-black text-opacity-60 dark:text-sp-white dark:text-opacity-60 tracking-sp-tighten text-center subpixel-antialiased mb-5">
        {" "}
        My code is 8e6929...3c9001
      </p>
      <button
        className="inline-flex bg-gradient-to-r from-sp-day-900 to-sp-dark-fawn dark:from-sp-dark-fawn dark:to-sp-fawn border-4 border-sp-fawn dark:border-sp-dark-brown dark:border-opacity-90 rounded-full py-3 px-7 text-sp-white dark:text-sp-black"
      >
        <span className="font-semibold ml-1">Copy my ID</span>
      </button>
    </div>
  );
}
