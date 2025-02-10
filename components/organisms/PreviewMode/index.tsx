import { draftMode } from "next/headers";
import { FC, PropsWithChildren } from "react";
import Banner from "./Banner";

const PreviewMode: FC<PropsWithChildren> = ({ children }) => {
  const { isEnabled } = draftMode();

  return (
    <>
      {isEnabled && <Banner />}
      {children}
    </>
  );
};

PreviewMode.displayName = "Organism.PreviewMode";

export default PreviewMode;
