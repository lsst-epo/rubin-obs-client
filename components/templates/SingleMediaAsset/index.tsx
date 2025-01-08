import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.scss";

interface SingleMediaAssetProps {
  title: string;
  asset: ReactNode;
  metadataBlocks: ReactNode;
  metadataLinks: ReactNode;
}

const SingleMediaAsset: FunctionComponent<SingleMediaAssetProps> = ({
  title,
  asset,
  metadataBlocks,
  metadataLinks,
}) => {
  return (
    <>
      <h1>{title}</h1>
      {asset}
      <div className={styles.metadataGrid}>
        <div className={styles.metadataBlocks}>{metadataBlocks}</div>
        <div className={styles.metadataLinks}>{metadataLinks}</div>
      </div>
    </>
  );
};

SingleMediaAsset.displayName = "Template.SingleMediaAsset";

export default SingleMediaAsset;
