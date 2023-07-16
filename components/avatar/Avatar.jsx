import { useState } from "react";

import AvatarEditor from "react-avatar-editor";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Slider } from "../ui/slider";

export function CropEditor() {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="block w-full flex-col px-2 py-12 md:max-w-3xl md:p-12">
        {/* <div>
        <img src={croppedImage} alt="Cropped" />
      </div> */}
        <div className="flex flex-col space-y-6">
          <DialogHeader className="">
            <DialogTitle className="text-xl">Resize profile image</DialogTitle>
            <DialogDescription className="text-sm">
              Profile images are required to be 360x360 pixel square images.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-between rounded-xl md:flex-row md:items-stretch md:justify-start md:space-x-6">
            <AvatarEditor
              className="rounded-sp-14 shadow"
              image="/images/img_hero_mobile.jpg"
              // image="https://staging.spiritus.app/_next/image?url=https%3A%2F%2Fwalk.spiritusapp.com%2Fimages%2F683%2Fstory&w=3840&q=75"
              // image="http://localhost:3000/_next/image?url=https%3A%2F%2Fwalk.spiritusapp.com%2Fimages%2F607%2Fstory&w=3840&q=75"
              width={300}
              height={300}
              border={20}
              color={[255, 255, 255, 0.85]} // RGBA
              scale={scale}
            />
            <div className="mt-12 flex w-full flex-col justify-between space-y-4 md:mt-0">
              <div className="flex flex-col space-y-2 font-medium">
                <label>Zoom</label>
                <Slider
                  onValueChange={setScale}
                  defaultValue={[1]}
                  max={3}
                  min={1}
                  step={0.1}
                />
              </div>
              <button className="w-full rounded-sp-10 border border-sp-day-400 py-2">
                Save
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
