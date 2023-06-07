import { ObituaryImageView, ReligiousImageView, ObituaryText } from "./util";
import { ImageResponse, SpiritusImagesResponse } from "../types";


type ClassicObituary_1_Props = {
  image?: ImageResponse,
  religImage?: SpiritusImagesResponse,
  texts: ObituaryText[],
}

// transformDateFromISO transforms date string from ISO (YYYY-MM-DD) to DD.MM.YYYY
export function transformDateFromISO(date: string): string {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}.`;
}

export function parseTexts(texts: ObituaryText[]): Map<string, string> {
  const parsed: Map<string, string> = new Map<string, string>()
  texts.forEach(t => {
    parsed.set(t.type, t.text || "")
  })
  return parsed;
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// styles shared by all template field
const sharedStylesClassic_1 = "break-word text-center text-black italic tracking-sp-tighten"


export function ClassicObituary_1({
  image,
  religImage,
  texts,
}: ClassicObituary_1_Props) {
  const parsedTexts = parseTexts(texts)

  return (
    <div id="printable-ob" className="flex justify-start items-center bg-white p-7.5 max-w-obituary max-h-obituary border-8 border-black rounded-sp-5 font-fancy">
      <div className={`flex ${image ? "" : "justify-center"} gap-x-5 overflow-hidden`}>
        {
          image && (
            <ObituaryImageView {...image} />
          )
        }
        <div className="w-3/4">
          <div className="flex flex-col items-center">
            {
              religImage && (
                <ReligiousImageView {...religImage} />
              )
            }

            <div className="mt-4 max-w-full">
              <p className={classNames(sharedStylesClassic_1, "text-[24px] italic font-medium leading-[110%] text-center")} >
                {parsedTexts.get("TOP")}
              </p>
            </div>

            <div className="mt-3">
              <h2 className={classNames(sharedStylesClassic_1, "px-3 font-bold leading-none text-[58px]")}>
                {parsedTexts.get("NAME")}
              </h2>
            </div>

            <div className="mt-0">
              <p className={classNames(sharedStylesClassic_1, "py-1 font-bold text-[24px] leading-[110%]")}>
                {parsedTexts.get("DATE")}
              </p>
            </div>

            <div className="mt-3">
              <p className={classNames(sharedStylesClassic_1, "font-medium text-[24px] leading-[110%]")}>
                {parsedTexts.get("FAREWELL")}
              </p>
            </div>

          </div>

          <div className="mt-3 max-w-full">
            <p className={classNames(sharedStylesClassic_1, "font-medium text-[24px] leading-[110%]")}>
              {parsedTexts.get("BEREAVED")}
            </p>
          </div>

          <div className="mt-4">
            <p className={classNames(sharedStylesClassic_1, "font-bold text-[28px] leading-[110%]")}>
              {parsedTexts.get("BOLD_BOTTOM")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
