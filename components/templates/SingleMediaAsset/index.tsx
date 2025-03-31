import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.css";
import GalleryFigure, {
  GalleryFigureProps,
} from "@/components/molecules/GalleryFigure";

interface SingleMediaAssetProps extends GalleryFigureProps {
  title: string;
  asset: ReactNode;
  caption: ReactNode;

  metadataBlocks?: ReactNode;
  metadataLinks?: ReactNode;
}

const SingleMediaAsset: FunctionComponent<SingleMediaAssetProps> = ({
  title,
  asset,
  metadataBlocks,
  metadataLinks,
  ...galleryFigureProps
}) => {
  return (
    <>
      <h1>{title}</h1>
      <GalleryFigure {...galleryFigureProps}>{asset}</GalleryFigure>
      <div className={styles.metadataGrid}>
        {metadataBlocks && (
          <div className={styles.metadataBlocks}>{metadataBlocks}</div>
        )}
        {metadataLinks && (
          <div className={styles.metadataLinks}>{metadataLinks}</div>
        )}
      </div>
    </>
  );
};

SingleMediaAsset.displayName = "Template.SingleMediaAsset";

export default SingleMediaAsset;
