import { FunctionComponent, ReactNode } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

export interface MetadataItem {
  key: ReactNode;
  value: ReactNode;
}

interface MetadataListProps {
  items: Array<MetadataItem>;
  separator?: string;
  className?: string;
}

const MetadataList: FunctionComponent<MetadataListProps> = ({
  items,
  separator = ":",
  className,
}) => {
  return (
    <dl className={clsx(styles.metadataList, className)}>
      {items.map(({ key, value }, i) => {
        return (
          <div className={styles.metadataSet} key={i}>
            <dt>
              {key}
              {separator}
            </dt>
            <dd>{value}</dd>
          </div>
        );
      })}
    </dl>
  );
};

MetadataList.displayName = "Molecule.MetadataList";

export default MetadataList;
