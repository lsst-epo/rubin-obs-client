import { FC, PropsWithChildren } from "react";
import styles from "./styles.module.css";

const Aside: FC<PropsWithChildren> = ({ children }) => {
  return <aside className={styles.aside}>{children}</aside>;
};

Aside.displayName = "Molecule.Aside";

export default Aside;
