import Link from "next/link";
import {
  PlusCircleIcon,
  StarIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import Image from "next/image";

export function CreateSpiritusCTA() {
  return (
    <>
      <div className="container w-full xl:w-4/5 mx-auto bg-gradient-to-r from-sp-dark-brown to-sp-brown rounded-lg bg-opacity-80">
        <div className="text-center mx-auto py-16 px-4 sm:px lg:py-20 lg:px-8">
          <h2 className="text-5xl font-extrabold text-sp-white mb-4">
            Keep memories of your<br></br> loved ones, forever
          </h2>
          <CTACreateButton />
        </div>
      </div>
      <div className="flex flex-col mx-auto items-center">
        <CTADownloadLinks />
        <CTAPartners />
      </div>
    </>
  );
}

export function CreateSpiritusCTABgImage() {
  return (
    <>
      <div className="container w-full xl:w-4/5 mx-auto bg-gradient-to-r from-sp-dark-brown to-sp-brown rounded-lg bg-opacity-80">
        <div className="relative overflow-hidden text-center mx-auto">
          <Image
            src={"/images/banner.png"}
            alt={"Create Spiritus Banner"}
            className=" object-cover rounded-lg"
            width={200}
            height={100}
            layout="responsive"
          />
          <div className="absolute top-10 lg:pt-20 md:pt-10 sm:pt-0 left-5 w-full text-white">
            <h2 className="text-5xl font-extrabold text-sp-white mb-4">
              Keep memories of your<br></br> loved ones, forever
            </h2>
            <CTACreateButton />
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-auto items-center">
        <CTADownloadLinks />
        <CTAPartners />
      </div>
    </>
  );
}

export function SearchSpiritusCTA() {
  return (
    <div className="container w-full xl:w-4/5 mx-auto bg-gradient-to-r from-sp-dark-brown to-sp-brown rounded-lg pt-4 pb-6">
      <div className="text-center mx-auto py-16 px-4 sm:px lg:py-20 lg:px-8">
        <Image
          src="/images/circle_images_sm.png"
          alt="Featured Stories Images"
          width={170}
          height={70}
        />
        <h2 className="text-4xl font-extrabold text-sp-white mb-4">
          Find your loved ones!
        </h2>
        <p className="mx-auto w-2/5 text-center text-sp-white opacity-60 mb-6">
          Over 15 000 Spiritus loved ones from many of biggest Croatian
          graveyards and institutions.
        </p>
        <CTASearchButton />
      </div>
    </div>
  );
}

function CTACreateButton() {
  return (
    <a
      href="/create/spiritus"
      className="inline-flex bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-full py-3 px-7"
    >
      <PlusCircleIcon className="h-6 w-6 text-sp-dark" />
      <span className="font-semibold ml-1">Create Spiritus</span>
    </a>
  );
}

function CTASearchButton() {
  return (
    <a
      href="/search"
      className="inline-flex bg-gradient-to-r from-sp-dark-fawn to-sp-fawn border-5 border-sp-medium border-opacity-80 rounded-full py-3 px-7"
    >
      <ArrowCircleRightIcon className="h-6 w-6 text-sp-dark" />
      <span className="font-semibold ml-1">Go to search</span>
    </a>
  );
}

function CTADownloadLinks() {
  return (
    <div className="pt-8 text-sp-lighter">
      <ul className="inline-flex align-middle mr-2">
        <li>
          <StarIcon className="h-4 w-4 text-sp-fawn" />
        </li>
        <li>
          <StarIcon className="h-4 w-4 text-sp-fawn" />
        </li>
        <li>
          <StarIcon className="h-4 w-4 text-sp-fawn" />
        </li>
        <li>
          <StarIcon className="h-4 w-4 text-sp-fawn" />
        </li>
        <li>
          <StarIcon className="h-4 w-4 text-sp-fawn" />
        </li>
      </ul>
      <span className="text-xs">Rated 4.8 on</span>
      <Link href="https://play.google.com/store/apps/details?id=app.spiritus">
        <a className="inline-flex align-middle px-2 gap-1" target="_blank">
          <svg
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.205 8.00014L0.24125 14.9639C0.1625 14.7989 0.125 14.6189 0.125 14.4314V1.56889C0.125 1.38139 0.1625 1.20139 0.24125 1.03639L7.205 8.00014ZM8 8.79514L10.3287 11.1239L2.06 15.5864C1.865 15.6914 1.65125 15.7439 1.4375 15.7439C1.32125 15.7439 1.20875 15.7289 1.09625 15.6989L8 8.79514ZM8 7.20514L1.1 0.305137C1.41875 0.215137 1.76 0.252637 2.06 0.413887L10.3287 4.87639L8 7.20514ZM14.6713 8.00014C14.6713 8.48389 14.405 8.92639 13.9813 9.15514L11.3638 10.5689L8.795 8.00014L11.3638 5.43139L13.9813 6.84514C14.405 7.07389 14.6713 7.51639 14.6713 8.00014Z"
              fill="#666461"
            />
          </svg>
          <span className="text-sm font-semibold ">Google Play</span>
        </a>
      </Link>
      <span className="text-sm">and</span>
      <Link href="https://apps.apple.com/hr/app/spiritus/id1584613380">
        <a className="inline-flex px-2 gap-1 align-middle" target="_blank">
          <svg
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.5625 0.25C2.01581 0.25 0.75 1.51581 0.75 3.0625V10.9375C0.75 12.4842 2.01581 13.75 3.5625 13.75H11.4375C12.9842 13.75 14.25 12.4842 14.25 10.9375V3.0625C14.25 1.51581 12.9842 0.25 11.4375 0.25H3.5625ZM6.52002 2.4231C6.70052 2.43566 6.87144 2.5334 6.96753 2.70215L7.5 3.625L8.03247 2.70215C8.18622 2.43215 8.53151 2.34259 8.80151 2.49634C9.07151 2.65384 9.16107 2.99465 9.00732 3.26465L6.20215 8.125H7.93506L8.58032 9.25H3.1875C2.87625 9.25 2.625 8.99875 2.625 8.6875C2.625 8.37625 2.87625 8.125 3.1875 8.125H4.90137L6.85107 4.75L5.99268 3.26465C5.83893 2.99465 5.92849 2.65384 6.19849 2.49634C6.29974 2.43868 6.41172 2.41556 6.52002 2.4231ZM8.58398 5.5L10.0986 8.125H11.8125C12.1237 8.125 12.375 8.37625 12.375 8.6875C12.375 8.99875 12.1237 9.25 11.8125 9.25H10.7476L11.28 10.1729C11.4338 10.4429 11.3435 10.7837 11.0735 10.9412C10.9835 10.9899 10.8897 11.0166 10.7922 11.0166C10.5972 11.0166 10.4102 10.9154 10.3052 10.7354L7.93506 6.625L8.58398 5.5ZM3.82104 10H5.1189L4.69482 10.7354C4.58982 10.9154 4.40276 11.0166 4.20776 11.0166C4.11026 11.0166 4.01651 10.9899 3.92651 10.9412C3.65651 10.7837 3.56622 10.4429 3.71997 10.1729L3.82104 10Z"
              fill="#666461"
            />
          </svg>

          <span className="text-sm font-semibold">App Store</span>
        </a>
      </Link>
    </div>
  );
}

function CTAPartners() {
  return (
    <div className="mt-4 flex gap-4 items-center">
      <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
        <Image
          src="/partners/frc.png"
          alt="Fil Rouge Capital"
          width={140}
          height={50}
        />

        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-sp-dark opacity-25"></div>
      </div>

      <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
        <Image
          src="/partners/zicer.png"
          alt="Zagrebački inovacijski cantar"
          width={92}
          height={50}
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-sp-dark opacity-25"></div>
      </div>
      <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
        <Image
          src="/partners/esf.png"
          alt="ESF Financial Instruments"
          width={86}
          height={54}
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-sp-dark opacity-25"></div>
      </div>
      <div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs">
        <Image
          src="/partners/eu.png"
          alt="European Union"
          width={70}
          height={50}
        />
        <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed bg-sp-dark opacity-25"></div>
      </div>
    </div>
  );
}
