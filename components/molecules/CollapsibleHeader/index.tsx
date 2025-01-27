"use client";

import { FunctionComponent, PropsWithChildren, useRef } from "react";
import Headroom from "react-headroom";
import styles from "./styles.module.scss";
import useNavigationMenu from "@/contexts/NavigationMenu";
import Center from "@rubin-epo/epo-react-lib/Center";
import { useOnClickOutside } from "@/hooks/listeners";

const CollapsibleHeader: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { pinned, close } = useNavigationMenu();
  const ref = useRef(null);

  useOnClickOutside(ref, close);

  return (
    <Headroom
      downTolerance={2}
      pin={pinned}
      style={{ zIndex: "var(--elevation-element-header, 25)" }}
    >
      <Center maxWidth="inherit">
        <header ref={ref} className={styles.header}>
          {children}
        </header>
      </Center>
    </Headroom>
  );
};

CollapsibleHeader.displayName = "Molecule.CollapsibleHeader";

export default CollapsibleHeader;
