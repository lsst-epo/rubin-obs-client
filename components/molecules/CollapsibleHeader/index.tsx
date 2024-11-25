"use client";

import { FunctionComponent, PropsWithChildren, useState } from "react";
import Headroom from "react-headroom";
import styles from "./styles.module.scss";
import { HeadroomProvider } from "@/contexts/Headroom";

const CollapsibleHeader: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [pinned, setPinned] = useState(false);

  return (
    <Headroom
      downTolerance={2}
      pin={pinned}
      style={{ zIndex: "var(--elevation-element-header, 25)" }}
    >
      <HeadroomProvider {...{ pinned, setPinned }}>
        <header className={styles.header}>{children}</header>
      </HeadroomProvider>
    </Headroom>
  );
};

CollapsibleHeader.displayName = "Molecule.CollapsibleHeader";

export default CollapsibleHeader;
