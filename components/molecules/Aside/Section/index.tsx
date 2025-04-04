import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface AsideSectionProps {
  title?: string;
  className?: string;
}

const AsideSection: FC<PropsWithChildren<AsideSectionProps>> = ({
  title,
  children,
  className,
}) => {
  return (
    <section className={clsx(styles.section, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </section>
  );
};

AsideSection.displayName = "Page.Aside.Section";

export default AsideSection;
