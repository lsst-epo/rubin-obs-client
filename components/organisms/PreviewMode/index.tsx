import { draftMode } from "next/headers";
import { FC } from "react";
import { env } from "@/env";
import Banner from "./Banner";
import DisablePreviewMode from "./Disable";
import RevalidateCurrentPath from "./Revalidate";

const PreviewMode: FC = () => {
  const { isEnabled } = draftMode();

  if (!isEnabled) return null;

  return (
    <Banner>
      <RevalidateCurrentPath token={env.CRAFT_REVALIDATE_SECRET_TOKEN} />
      <DisablePreviewMode />
    </Banner>
  );
};

PreviewMode.displayName = "Organism.PreviewMode";

export default PreviewMode;
