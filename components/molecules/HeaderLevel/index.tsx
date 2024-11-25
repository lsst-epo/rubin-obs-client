import classNames from "classnames";
import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Center from "@rubin-epo/epo-react-lib/Center";

interface HeaderLevelProps {
  className?: string;
}

const HeaderLevel: FunctionComponent<PropsWithChildren<HeaderLevelProps>> = ({
  children,
  className,
}) => {
  return (
    <div className={classNames(className)}>
      <Center className={styles.headerLevel} maxWidth="2000px">
        {children}
      </Center>
    </div>
  );
};

HeaderLevel.displayName = "Molecule.HeaderLevel";

export default HeaderLevel;
