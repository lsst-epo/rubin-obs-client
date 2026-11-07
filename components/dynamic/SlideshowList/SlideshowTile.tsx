"use client";

import { Tile } from "@/components/atomic";
import SlideshowDialog from "@/components/molecules/SlideshowDialog";
import { striptags } from "@/lib/utils/strings";
import { useId, useRef } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  id?: string;
  gridType?: string;
  description?: string;
  title?: string;
  image?: React.ComponentProps<typeof Tile>["image"];
  uri: string;
  slideshow: React.ComponentProps<typeof SlideshowDialog>["slideshow"];
}

export default function SlideshowTile({
  id,
  gridType,
  image,
  description,
  title,
  slideshow,
}: Props) {
  const { t } = useTranslation();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const slideshowId = useId();

  const handleOpen = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <Tile
        key={id}
        footer={
          gridType === "darkSlide" || gridType === "slideshows"
            ? {
                buttonComponent: (
                  <button
                    type="button"
                    className={`c-buttonish c-buttonish--inert`}
                    onClick={handleOpen}
                    aria-controls={slideshowId}
                  >
                    {t(`gallery.start-slideshow`)}
                  </button>
                ),
              }
            : null
        }
        image={image?.[0]}
        isFeature={true}
        pretitle={
          gridType === "darkSlide" || gridType === "slideshows"
            ? t(`gallery.slideshow`)
            : null
        }
        text={description ? striptags(description) : ""}
        title={title}
        titleTag={"h2"}
        type={gridType}
      />
      <SlideshowDialog id={slideshowId} ref={dialogRef} slideshow={slideshow} />
    </>
  );
}
