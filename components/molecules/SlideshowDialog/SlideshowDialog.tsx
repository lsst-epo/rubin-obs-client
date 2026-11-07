"use client";

import { forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./styles.module.scss";
import IconButton from "@/components/atomic/Button/IconButton";
import {
  Descriptions,
  Provider,
  Slide,
  Slider,
  Wrapper,
  SlideItem,
} from "@/components/layout/Slideshow";
import { useTranslation } from "react-i18next";
import { FragmentType, useFragment } from "@/gql";
import {
  SlideshowDialogFragment,
  SlideshowDialogFragmentDoc,
} from "@/gql/graphql";

interface SlideshowDialogProps {
  id: string;
  slideshow: FragmentType<typeof SlideshowDialogFragmentDoc>;
}

type Asset = SlideshowDialogFragment["coverImage"][number];
type SlideWithImage = SlideItem & Required<Pick<SlideItem, "image">>;

const toSlideImage = (asset: Asset): SlideItem["image"] => {
  if (!asset || !("url" in asset) || !asset.url) return undefined;

  return asset;
};

const SlideshowDialog = forwardRef<HTMLDialogElement, SlideshowDialogProps>(
  ({ id, slideshow }, ref) => {
    const {
      id: entryId,
      title,
      description,
      coverImage,
      items,
    } = useFragment(SlideshowDialogFragmentDoc, slideshow);
    const dialogRef = useRef<HTMLDialogElement>(null);

    const { t } = useTranslation();

    useImperativeHandle(ref, () => dialogRef.current as HTMLDialogElement);

    const handleClose = () => {
      if (dialogRef.current) {
        dialogRef.current.close();
      }
    };

    const slides: SlideItem[] = [
      {
        id: entryId,
        title,
        description,
        image: toSlideImage(coverImage[0]),
      },
      ...items.flatMap((item) =>
        item ? [{ ...item, image: toSlideImage(item.image[0]) }] : []
      ),
    ];

    return (
      <dialog ref={dialogRef} className={styles.dialog} id={id}>
        <header className={styles.header}>
          {title ? (
            <h1>{title}</h1>
          ) : (
            <h1 className="sr-only">{t("gallery.slideshow")}</h1>
          )}
          <IconButton
            icon="close"
            className={styles.close}
            onClickCallback={handleClose}
            size={16}
          />
        </header>
        <div className={styles.panel}>
          <Provider
            options={{
              length: slides.length,
            }}
          >
            <Wrapper>
              <Slider className={styles.slider}>
                {slides.map((item, i) => {
                  return (
                    <Slide
                      index={i}
                      image={item.image}
                      key={item.id || `${i}`}
                    />
                  );
                })}
              </Slider>
              <Descriptions className={styles.descriptions} items={slides} />
            </Wrapper>
          </Provider>
        </div>
      </dialog>
    );
  }
);

SlideshowDialog.displayName = "Organism.SlideshowDialog";

export default SlideshowDialog;
