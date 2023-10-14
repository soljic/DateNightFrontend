import { useRef, useState } from "react";

import Image from "next/image";

import { useTranslation } from "next-i18next";
import AvatarEditor from "react-avatar-editor";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/utils/cn";

import { ImageIcon } from "../Icons";
import { Spinner } from "../Status";
import { Slider } from "../ui/slider";

export function CropEditor({ open, setOpen, onAdd, onRemove }) {
  const { t } = useTranslation(["common", "settings"]);

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [saving, setSaving] = useState(false);

  const editorRef = useRef(null);
  const [canvasImage, setCanvasImage] = useState(null);
  const [initialImage, setInitialImage] = useState(null);

  const inputFile = useRef(null);

  const onChangeSetOpen = (openState) => {
    if (!openState) {
      onCancel();
    }
    setOpen(openState);
  };

  const onOpenFileDialog = (event) => {
    event.preventDefault();
    inputFile.current.click();
  };

  const onChangeFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.target.files;
    if (files.length === 0) return;
    setInitialImage(files[0]);
    cropImage();
  };

  const cropImage = () => {
    const dataUrl = editorRef.current?.getImageScaledToCanvas().toDataURL();
    setCanvasImage(dataUrl);
  };

  const onCancel = () => {
    editorRef.current?.clearImage();
    setInitialImage(null);
    setCanvasImage(null);
    setOpen(false);
    setScale(1);
    setRotate(0);
  };

  // if image was not cropped return initial image
  const onSave = () => {
    setSaving(true);
    if (!canvasImage) {
      // image was not cropped
      onAdd(URL.createObjectURL(initialImage), initialImage, false);
      return;
    }
    onAdd(canvasImage, initialImage, true);
    setSaving(false);
  };

  return (
    <Dialog open={open} onOpenChange={onChangeSetOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent
        className={cn(
          initialImage ? "bottom-0 min-h-screen md:min-h-fit" : "",
          "w-full overflow-y-auto rounded-sp-10 py-12 md:max-w-3xl md:p-10"
        )}
      >
        <div className="flex flex-col space-y-4 md:space-y-6">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {t("settings:crop_dialog_title")}
            </DialogTitle>
            <DialogDescription className="whitespace-pre-line text-sm">
              {t("settings:crop_dialog_subtitle")}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:justify-between">
            <input
              type="file"
              id="crop-image-select"
              className="sr-only"
              ref={inputFile}
              accept="image/*"
              onChange={onChangeFile}
            />
            {initialImage ? (
              <>
                <AvatarEditor
                  ref={editorRef}
                  className="mt-5 rounded-sp-10 shadow"
                  image={initialImage}
                  width={192}
                  height={220}
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
                    onClick={() => cropImage()}
                  >
                    {t("settings:crop_dialog_action_crop")}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex h-[220px] w-[200px] rounded-sp-10 border border-dashed border-sp-day-400 bg-sp-day-50 p-12 font-medium text-sp-day-400 text-sm dark:bg-sp-black">
                <button
                  onClick={onOpenFileDialog}
                  className="relative mx-auto cursor-pointer rounded-sp-10 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2"
                >
                  <ImageIcon
                    className="mx-auto h-7 w-7 fill-sp-day-400"
                    aria-hidden="true"
                  />
                  <p className="mt-1">{t("upload_spiritus_images_button")}</p>
                </button>
              </div>
            )}
          </div>
          {initialImage && (
            <>
              <div>
                <h3 className="font-medium">
                  {t("settings:crop_dialog_preview_title")}
                </h3>
                <p className="whitespace-pre-line text-sm">
                  {t("settings:crop_dialog_preview_subtitle")}
                </p>
              </div>
              <div className="flex flex-col items-center justify-between space-y-4 md:block">
                {canvasImage ? (
                  <div className="h-[220px] w-[192px] overflow-hidden rounded-sp-10 border border-dashed border-sp-day-400">
                    <Image
                      src={canvasImage}
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
                    disabled={saving || !canvasImage}
                    className={cn(
                      "w-full rounded-sp-10 border border-sp-day-400 py-2",
                      saving || !canvasImage
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
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
