import { FC, PropsWithChildren } from "react";
import classNames from "classnames";
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
    <section className={classNames(styles.section, className)}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </section>
  );
};

AsideSection.displayName = "Page.Aside.Section";

export default AsideSection;
