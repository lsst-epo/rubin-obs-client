"use client";

import { FunctionComponent, PropsWithChildren, useState } from "react";
import Headroom from "react-headroom";
import styles from "./styles.module.scss";
import { HeadroomProvider } from "@/contexts/Headroom";
import Center from "@rubin-epo/epo-react-lib/Center";

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
        <Center maxWidth="inherit">
          <header className={styles.header}>{children}</header>
        </Center>
      </HeadroomProvider>
    </Headroom>
  );
};

CollapsibleHeader.displayName = "Molecule.CollapsibleHeader";

export default CollapsibleHeader;
