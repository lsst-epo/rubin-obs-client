import { FunctionComponent } from "react";
import Link from "next/link";
import { generateAllPreviewSizes } from "@/lib/api/canto/resize";
import MetadataSection from "../Section";
import styles from "./styles.module.css";

interface ImageSizesProps {
  directUrlPreview: string;
  width: string;
  height: string;
}

const ImageSizes: FunctionComponent<ImageSizesProps> = ({
  directUrlPreview,
  width,
  height,
}) => {
  const sizes = generateAllPreviewSizes(directUrlPreview, width, height);

  const labelFromSize = (width: number, height: number) => {
    const longest = Math.max(width, height);

    if (longest <= 100) {
      return "Thumbnail";
    }

    if (longest < 500) {
      return "Small";
    }

    if (longest < 1024) {
      return "Medium";
    }

    return "Large";
  };

  return (
    <MetadataSection
      title="Sizes"
      metadata={
        <ul>
          {sizes.map(({ url, width, height }) => {
            return (
              <li className={styles.sizeItem} key={url}>
                <Link href={url}>{labelFromSize(width, height)}</Link>
                <span>
                  ({width} × {height})
                </span>
              </li>
            );
          })}
        </ul>
      }
    />
  );
};

ImageSizes.displayName = "Organism.Gallery.Metadata.Sizes";

export default ImageSizes;
