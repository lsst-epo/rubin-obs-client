"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./styles.module.css";

// Time intervals in ms. Upper limit of approx 24 days.
const MS_PER_SEC = 1000;
const MS_PER_5_SEC = 5000;
const MS_PER_MIN = 60 * 1000;
const MS_PER_HALF_HOUR = 30 * 60 * 1000;
const MS_PER_HOUR = 60 * 60 * 1000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

interface GallerySpotlightProps {
  gallerySlug: string;
  images: any;
  randomizeImageOrder?: boolean;
  imageSwapInterval?: number;
  width?: number;
  height?: number;
}

const GallerySpotlight: FC<GallerySpotlightProps> = ({
  gallerySlug,
  images,
  randomizeImageOrder = false,
  imageSwapInterval = MS_PER_DAY,
  width = 500,
  height = 500,
}) => {
  const [currentDate, setCurrentDate] = useState(Date.now());
  const galleryStr = "/gallery/collections/" + gallerySlug + "/";
  const startDate = new Date("2026-01-01T00:00:00.000Z").getTime();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(Date.now());
    }, imageSwapInterval);
    return () => clearInterval(intervalId);
  }, [imageSwapInterval]);

  function calculateImageIndex() {
    const elapsedMS = currentDate - startDate;
    const elapsedInterval = Math.floor(elapsedMS / imageSwapInterval);
    return elapsedInterval % images.length;
  }

  const currentImage = images[calculateImageIndex()];

  const {
    additional: { AltTextEN: altTextEn, CaptionEN: captionEn, Credit: credit },
    url: { directUrlOriginal: imageUrl },
    id: cantoImageId,
  } = currentImage;

  const galleryLink = galleryStr + cantoImageId;

  return (
    <div className={clsx(styles.container)}>
      <Link href={galleryLink}>
        <Image
          className={clsx(styles.galleryImg)}
          src={imageUrl}
          width={width}
          height={height}
          alt={altTextEn}
        />
      </Link>
    </div>
  );
};

GallerySpotlight.displayName = "Molecule.Gallery.Spotlight";

export default GallerySpotlight;
