import { ImageResponse, SpiritusImagesResponse, TemplateType } from "../types";

export function parseObituaryText(texts: ObituaryText[]): ParsedObituaryText {
  const map = new Map<string, string>()
  texts.forEach((text) => {
    map.set(text.type, text.text || "")
  })
  return map
}

export type ViewObituaryProps = {
  id: number,
  sex?: string,
  religiousImage: ImageResponse | null,
  obituaryImage: ImageResponse | null,
  texts: ObituaryText[]
}

export type ParsedObituaryText = Map<string, string>

export type ObituaryText = {
  type: TemplateType;
  templateId?: number | null;
  templateLocaleId?: number | null;
  text: string | null;
};



export type SpiritusImagePreview = {
  file: File;
  previewURL: string;
  url?: string;
};


export function ObituaryImageView({
  id,
  url,
  height,
  width,
}: ImageResponse) {
  return (
    <div className="relative w-30 h-38 rounded-sp-5 overflow-clip">
      <img
        src={url || ""}
        alt="spiritus-obituary-image"
        className="object-center w-30 h-38"
      />
    </div>
  )
}

export function ReligiousImageView({
  id,
  url,
  height,
  width,
}: SpiritusImagesResponse) {

  return (
    <div className="flex items-center space-x-2">
      <div className="flex justify-center items-center px-4">
        <img alt={`"religioust-image-${id}"`} src={url || ""}
          width={width
            ? width > 84
              ? 84
              : width
            : 84}
          height={height
            ? height > 84
              ? 84
              : height
            : 84} />
      </div>
    </div>
  )
}
