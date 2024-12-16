import { FunctionComponent, ReactNode } from "react";
import styles from "./styles.module.css";

interface MetadataSectionProps {
  title: string;
  metadata: ReactNode;
}

const MetadataSection: FunctionComponent<MetadataSectionProps> = ({
  title,
  metadata,
}) => {
  return (
    <section className={styles.section}>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {metadata}
    </section>
  );
};

MetadataSection.displayName = "Organism.Gallery.Metadata.Section";

export default MetadataSection;
