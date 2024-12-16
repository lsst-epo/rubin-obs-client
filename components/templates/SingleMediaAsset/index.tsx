import { FunctionComponent, PropsWithChildren, ReactNode } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import styles from "./styles.module.css";

interface SingleMediaAssetProps {
  title: string;
  asset: ReactNode;
  metadataBlocks: ReactNode;
  metadataLinks: ReactNode;
}

const SingleMediaAsset: FunctionComponent<
  PropsWithChildren<SingleMediaAssetProps>
> = ({ title, asset, metadataBlocks, metadataLinks, children }) => {
  return (
    <Container>
      <Stack>
        <h1>{title}</h1>
        {asset}
        <div className={styles.metadataGrid}>
          <div className={styles.metadataBlocks}>{metadataBlocks}</div>
          <div className={styles.metadataLinks}>{metadataLinks}</div>
        </div>
        {children}
      </Stack>
    </Container>
  );
};

SingleMediaAsset.displayName = "Template.SingleMediaAsset";

export default SingleMediaAsset;
