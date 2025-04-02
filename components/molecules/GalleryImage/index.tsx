"use client";

import { FC, useState } from "react";
import classNames from "classnames";
import Image from "next/image";
import { ImageObject } from "schema-dts";
import Skeleton from "react-loading-skeleton";
import { tokens } from "@rubin-epo/epo-react-lib/styles";
import StructuredData from "@/components/atomic/StructuredData";
import styles from "./styles.module.css";

interface GalleryImageProps {
  width: number;
  height: number;
  src: string;
  alt: string;
  metadata: ImageObject;
  title: string;
  className?: string;
}

const GalleryImage: FC<GalleryImageProps> = ({
  width,
  height,
  src,
  alt,
  metadata,
  title,
  className,
}) => {
  const [isLoading, setLoading] = useState(true);
  const aspectRatio = width / height;
  const landscapeSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 1435px`;
  const portraitSizes = `(max-width: ${tokens.BREAK_TABLET}) 100vw, 700px`;

  return (
    <>
      <StructuredData jsonLd={metadata} />
      <div className={classNames(styles.stack, className)}>
        <Image
          {...{ width, height, src, title, alt }}
          data-cy="gallery-image"
          sizes={aspectRatio < 1 ? portraitSizes : landscapeSizes}
          quality={85}
          priority
          fetchPriority="high"
          className={styles.image}
          onLoadingComplete={() => setLoading(false)}
        />
        {isLoading && (
          <Skeleton
            containerClassName={styles.skeletonWrapper}
            className={styles.skeleton}
          />
        )}
      </div>
    </>
  );
};

GalleryImage.displayName = "Molecule.Gallery.Image";

export default GalleryImage;
