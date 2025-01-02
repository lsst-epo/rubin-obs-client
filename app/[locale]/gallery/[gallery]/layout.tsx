import { getAllGalleries } from "@/lib/api/galleries";
import { FunctionComponent, PropsWithChildren } from "react";

export const dynamicParams = false;

export async function generateStaticParams({
  params: { locale },
}: LocaleProps) {
  return getAllGalleries(locale);
}

export const GalleryLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return <>{children}</>;
};

export default GalleryLayout;
