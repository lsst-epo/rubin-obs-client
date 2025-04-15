"use client";
import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";
import clsx from "clsx";
import { Checkbox } from "@headlessui/react";
import Skeleton from "react-loading-skeleton";
import { ReactCompareSlider, styleFitContainer } from "react-compare-slider";
import styles from "./styles.module.css";

interface ImageComparisonProps {
  images: Array<ImageProps>;
  className?: string;
}

const ImageComparison: FC<ImageComparisonProps> = ({ images, className }) => {
  const [isLoading, setLoading] = useState<Array<boolean>>([true, true]);
  const [switched, setSwitched] = useState(false);

  const handleClick = () => {
    setSwitched((switched) => !switched);
  };

  const isReady = !isLoading.some((loading) => loading);

  const imageIsComplete = (index: number) => {
    isLoading[index] = false;

    setLoading([...isLoading]);
  };

  return (
    <div className={clsx(styles.container, className)}>
      <ReactCompareSlider
        position={switched ? 100 : 0}
        boundsPadding={2}
        disabled={true}
        handle={<div className={styles.handle} />}
        transition="0.8s ease-in-out"
        itemOne={
          <Image
            {...images[0]}
            style={styleFitContainer()}
            onLoadingComplete={() => imageIsComplete(0)}
          />
        }
        itemTwo={
          <Image
            {...images[1]}
            style={styleFitContainer()}
            onLoadingComplete={() => imageIsComplete(1)}
          />
        }
      />
      {!isReady && (
        <Skeleton
          containerClassName={styles.skeletonWrapper}
          className={styles.skeleton}
          style={{ aspectRatio: `${images[0].width} / ${images[0].height}` }}
        />
      )}
      <Checkbox
        className={styles.hiddenClick}
        checked={switched}
        disabled={!isReady}
        onChange={handleClick}
      />
    </div>
  );
};

ImageComparison.displayName = "Molecule.ImageComparison";

export default ImageComparison;
