import { NavItem } from "./Common";

export function Footer() {
  return (
    <div className="container mx-auto text-sp-medium dark:text-sp-white mt-12">
      <div className="flex flex-row xl:w-4/5 lg:w-full mx-auto items-center justify-around">
        <div className="inline-flex">
          <NavItem text={"About"} textsize={"sm"} />
          <NavItem text={"Stories"} textsize={"sm"} />
          <NavItem text={"Mobile app"} textsize={"sm"} />
          <NavItem text={"Terms of Service"} textsize={"sm"} />
          <NavItem text={"Privacy"} textsize={"sm"} />
          <NavItem text={"Contact"} textsize={"sm"} />
        </div>
      </div>
      <div className="my-2 pb-4 mx-auto xl:w-4/5 lg:w-full border-t border-sp-gray-100 dark:border-sp-lighter"></div>
      <div className="container xl:w-4/5 lg:w-full mx-auto justify-between pb-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-row gap-2">
            <a
              href="https://www.facebook.com/spiritusmemoria"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="fill-sp-black dark:fill-sp-white"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                // fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="#ED9A4C"
                />
                <path d="M17.722 11.1585H19V9.09154C18.7795 9.06338 18.0212 9 17.1382 9C15.2956 9 14.0333 10.0763 14.0333 12.0545V13.875H12V16.1858H14.0333V22H16.5263V16.1863H18.4774L18.7871 13.8755H16.5257V12.2836C16.5263 11.6157 16.7199 11.1585 17.722 11.1585Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/spiritus.app/?hl=hr"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="fill-sp-black dark:fill-sp-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="#ED9A4C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.0022 9.60156C14.264 9.60156 14.0459 9.60916 13.3632 9.64023C12.6819 9.67143 12.2168 9.7793 11.8099 9.93757C11.3889 10.101 11.0318 10.3197 10.6761 10.6756C10.3201 11.0313 10.1014 11.3884 9.93743 11.8092C9.77876 12.2163 9.67076 12.6815 9.6401 13.3625C9.60956 14.0452 9.60156 14.2635 9.60156 16.0016C9.60156 17.7398 9.6093 17.9572 9.64023 18.6399C9.67156 19.3213 9.77943 19.7863 9.93757 20.1933C10.1012 20.6142 10.3198 20.9713 10.6757 21.327C11.0313 21.683 11.3884 21.9022 11.8091 22.0657C12.2163 22.224 12.6815 22.3318 13.3627 22.363C14.0453 22.3941 14.2633 22.4017 16.0014 22.4017C17.7396 22.4017 17.9571 22.3941 18.6398 22.363C19.3211 22.3318 19.7867 22.224 20.1939 22.0657C20.6147 21.9022 20.9713 21.683 21.3269 21.327C21.6829 20.9713 21.9016 20.6142 22.0656 20.1934C22.2229 19.7863 22.3309 19.3211 22.3629 18.6401C22.3936 17.9574 22.4016 17.7398 22.4016 16.0016C22.4016 14.2635 22.3936 14.0453 22.3629 13.3627C22.3309 12.6813 22.2229 12.2163 22.0656 11.8093C21.9016 11.3884 21.6829 11.0313 21.3269 10.6756C20.9709 10.3196 20.6149 10.1009 20.1935 9.93757C19.7855 9.7793 19.3202 9.67143 18.6389 9.64023C17.9562 9.60916 17.7388 9.60156 16.0002 9.60156H16.0022ZM15.428 10.7549C15.5984 10.7546 15.7885 10.7549 16.0021 10.7549C17.711 10.7549 17.9135 10.761 18.5883 10.7917C19.2123 10.8202 19.551 10.9245 19.7766 11.0121C20.0752 11.1281 20.2882 11.2668 20.512 11.4908C20.7361 11.7148 20.8747 11.9281 20.991 12.2268C21.0786 12.4521 21.183 12.7908 21.2114 13.4148C21.2421 14.0895 21.2487 14.2921 21.2487 16.0001C21.2487 17.7082 21.2421 17.9108 21.2114 18.5855C21.1829 19.2095 21.0786 19.5482 20.991 19.7735C20.875 20.0722 20.7361 20.2849 20.512 20.5087C20.288 20.7327 20.0754 20.8714 19.7766 20.9874C19.5512 21.0754 19.2123 21.1794 18.5883 21.2079C17.9136 21.2386 17.711 21.2453 16.0021 21.2453C14.2932 21.2453 14.0906 21.2386 13.416 21.2079C12.792 21.1791 12.4533 21.0749 12.2276 20.9873C11.9289 20.8713 11.7156 20.7326 11.4916 20.5086C11.2676 20.2846 11.1289 20.0718 11.0126 19.773C10.925 19.5476 10.8206 19.209 10.7922 18.585C10.7615 17.9103 10.7554 17.7076 10.7554 15.9985C10.7554 14.2895 10.7615 14.0879 10.7922 13.4132C10.8207 12.7892 10.925 12.4505 11.0126 12.2249C11.1286 11.9262 11.2676 11.7129 11.4916 11.4889C11.7156 11.2649 11.9289 11.1262 12.2276 11.01C12.4532 10.922 12.792 10.818 13.416 10.7893C14.0064 10.7626 14.2352 10.7546 15.428 10.7533V10.7549ZM19.4184 11.8176C18.9944 11.8176 18.6504 12.1612 18.6504 12.5853C18.6504 13.0093 18.9944 13.3533 19.4184 13.3533C19.8424 13.3533 20.1864 13.0093 20.1864 12.5853C20.1864 12.1613 19.8424 11.8176 19.4184 11.8176ZM16.0022 12.7149C14.1871 12.7149 12.7155 14.1865 12.7155 16.0016C12.7155 17.8167 14.1871 19.2876 16.0022 19.2876C17.8173 19.2876 19.2883 17.8167 19.2883 16.0016C19.2883 14.1865 17.8173 12.7149 16.0022 12.7149ZM16.0021 13.8683C17.1803 13.8683 18.1355 14.8233 18.1355 16.0016C18.1355 17.1798 17.1803 18.135 16.0021 18.135C14.8239 18.135 13.8688 17.1798 13.8688 16.0016C13.8688 14.8233 14.8239 13.8683 16.0021 13.8683Z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/spiritus-memoria/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                className="fill-sp-black dark:fill-sp-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
                  fill="#ED9A4C"
                />
                <path d="M11.0335 14.2418H13.1343V20.9988H11.0335V14.2418ZM12.0848 13.318C12.7555 13.318 13.3024 12.7729 13.3024 12.1004C13.3024 11.9405 13.2709 11.7822 13.2097 11.6345C13.1485 11.4867 13.0588 11.3525 12.9458 11.2394C12.8327 11.1264 12.6985 11.0367 12.5507 10.9755C12.403 10.9143 12.2447 10.8828 12.0848 10.8828C11.9249 10.8828 11.7666 10.9143 11.6188 10.9755C11.4711 11.0367 11.3369 11.1264 11.2238 11.2394C11.1108 11.3525 11.0211 11.4867 10.9599 11.6345C10.8987 11.7822 10.8672 11.9405 10.8672 12.1004C10.8654 12.7729 11.4105 13.318 12.0848 13.318ZM16.5499 17.6557C16.5499 16.7743 16.718 15.9213 17.81 15.9213C18.886 15.9213 18.9019 16.9283 18.9019 17.7123V20.9988H21.0008V17.2929C21.0008 15.4736 20.608 14.0737 18.4825 14.0737C17.4613 14.0737 16.7764 14.6347 16.495 15.1656H16.4667V14.2418H14.451V20.9988H16.5499V17.6557Z" />
              </svg>
            </a>
          </div>
          <div className="text-sm text-sp-lighter">
            ©{new Date().getFullYear()} Spiritus Memoria. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
