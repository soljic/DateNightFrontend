import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import AvatarEditor from "react-avatar-editor";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { SetSpiritusProfileImage } from "@/service/http/spiritus_crud";

import { cn } from "@/utils/cn";
import { HashFilename } from "@/utils/filenames";

import { Spinner } from "../Status";
import { Slider } from "../ui/slider";

export function SelectExistingImageCropEditor({
  spiritusId,
  open,
  setOpen,
  imageToCrop,
}) {
  const { t } = useTranslation(["common", "settings"]);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const croppedImageRef = useRef(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  useEffect(() => {
    const getImage = async () => {
      // hash the URL and use as name
      const fileName = await HashFilename(imageToCrop.url);
      const image = await fetch(imageToCrop.url);
      const blob = await image.blob();
      const file = new File([blob], fileName, {
        type: blob.type,
      });
      setOriginalImage(file);
    };
    getImage();
  }, []);

  const onChangeSetOpen = (openState) => {
    if (!openState) {
      onCancel();
    }
    setOpen(openState);
  };

  const onSave = async () => {
    try {
      setSaving(true);
      if (!session?.user?.accessToken) {
        return;
      }
      // useState is async; it's not guaranteed that the croppedImage is set
      // so we take the current croppedImage and recalculate the crop if needed
      let imgToSaveDataURL = croppedImage;
      if (!imgToSaveDataURL) {
        imgToSaveDataURL = getCroppedImageDataURL();
        setCroppedImage(imgToSaveDataURL);
      }
      const form = new FormData();
      const fileName = originalImage.name;
      const data = await fetch(imgToSaveDataURL);
      const croppedBlob = await data.blob();
      const croppedFile = new File([croppedBlob], fileName, {
        type: croppedBlob.type,
      });
      const croppedFilename = "C_" + fileName;
      form.append("file", croppedFile, croppedFilename);
      await SetSpiritusProfileImage(
        session.user.accessToken,
        spiritusId,
        imageToCrop.id,
        form
      );
      router.reload();
    } catch (error) {
      setSaving(false);
      setErrorMsg(error.message);
    }
  };

  const getCroppedImageDataURL = () => {
    return croppedImageRef.current?.getImageScaledToCanvas().toDataURL();
  };

  const onCropImage = () => {
    const dataUrl = getCroppedImageDataURL();
    setCroppedImage(dataUrl);
  };

  const onCancel = () => {
    croppedImageRef.current?.clearImage();
    setCroppedImage(null);
    setOpen(false);
    setScale(1);
    setRotate(0);
  };

  return (
    <Dialog open={open} onOpenChange={onChangeSetOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="block w-full flex-col px-2 py-12 md:max-w-3xl md:p-12">
        <div className="flex flex-col space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {t("settings:crop_dialog_title")}
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-sm">
              {t("settings:crop_dialog_subtitle")}
            </DialogDescription>
          </DialogHeader>
          {originalImage ? (
            <>
              <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:justify-between">
                <AvatarEditor
                  ref={croppedImageRef}
                  className="mt-5 rounded-sp-10 shadow"
                  image={originalImage}
                  width={220}
                  height={238}
                  border={20}
                  color={[255, 255, 255, 0.85]} // RGBA
                  scale={scale}
                  rotate={rotate}
                />
                <div className="flex w-full flex-col justify-between space-y-6 md:mt-0">
                  <div className="flex flex-col space-y-4 font-medium">
                    <div className="space-y-2">
                      <label>{t("settings:crop_dialog_action_zoom")}</label>
                      <Slider
                        onValueChange={setScale}
                        defaultValue={[1]}
                        max={3}
                        min={1}
                        step={0.1}
                      />
                    </div>
                    <div className="space-y-2">
                      <label>{t("settings:crop_dialog_action_rotate")}</label>
                      <Slider
                        onValueChange={setRotate}
                        defaultValue={[0]}
                        max={360}
                        min={0}
                        step={10}
                      />
                    </div>
                  </div>
                  <button
                    className="w-full rounded-sp-10 border border-sp-day-400 py-2"
                    onClick={() => onCropImage()}
                  >
                    {t("settings:crop_dialog_action_crop")}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-medium">
                  {t("settings:crop_dialog_preview_title")}
                </h3>
                <p className="whitespace-pre-line text-sm">
                  {t("settings:crop_dialog_preview_subtitle")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between space-y-4 md:block">
                {croppedImage ? (
                  <div className="h-[220px] w-[192px] overflow-hidden rounded-sp-10 border border-dashed border-sp-day-400">
                    <Image
                      src={croppedImage}
                      className=""
                      alt="cropped-image"
                      height={220}
                      width={192}
                    />
                  </div>
                ) : (
                  <div className="h-[220px] w-[192px] rounded-sp-10 border border-dashed border-sp-day-400"></div>
                )}
                <div className="flex w-full flex-col justify-between space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                  <button
                    type="button"
                    onClick={() => onSave()}
                    disabled={saving || !croppedImage || errorMsg}
                    className={cn(
                      "w-full rounded-sp-10 border border-sp-day-400 py-2",
                      saving || !croppedImage || errorMsg
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    )}
                  >
                    {saving ? <Spinner /> : t("common:save")}
                  </button>
                  <button
                    className="w-full rounded-sp-10 border border-sp-day-400 py-2"
                    onClick={() => onCancel()}
                  >
                    {t("common:cancel")}
                  </button>
                </div>
                {!!errorMsg && (
                  <p className="font-medium text-red-500 text-sm">{errorMsg}</p>
                )}
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
