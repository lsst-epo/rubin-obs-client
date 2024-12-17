import { FunctionComponent, PropsWithChildren } from "react";
import { getRecentAssets } from "@/lib/api/galleries/asset";

export async function generateStaticParams({
  params: { locale, gallery },
}: GalleryProps) {
  return getRecentAssets(locale, gallery);
}

const AssetLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default AssetLayout;
