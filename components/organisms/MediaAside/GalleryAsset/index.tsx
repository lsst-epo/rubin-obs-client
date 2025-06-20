import { FC, Suspense } from "react";
import { ImageProps } from "next/image";
import { getLocale } from "next-intl/server";
import AsideImage from "@/components/molecules/Aside/Image";
import { cantoToImageProps } from "@/lib/api/canto";
import { assetTitle } from "@/lib/api/canto/metadata";
import { getGalleryForAsset } from "@/lib/api/galleries/asset";
import { getPathname } from "@/lib/i18n/navigation";

interface GalleryAssetProps {
  asset: any;
}

interface GalleryAssetContentProps {
  id: string;
  image: ImageProps;
  caption?: string;
}

const GalleryAssetContent: FC<GalleryAssetContentProps> = async ({
  id,
  image,
  caption,
}) => {
  const locale = await getLocale();
  const uri = await getGalleryForAsset(id);
  const link = uri
    ? { href: getPathname({ href: `/${uri}/${id}`, locale }) }
    : undefined;

  return <AsideImage title={caption} {...{ image, link }} />;
};

const GalleryAsset: FC<GalleryAssetProps> = async ({ asset }) => {
  const locale = await getLocale();
  const image = cantoToImageProps(asset, { usePreviewUrl: true, locale });
  const caption = assetTitle(asset.metadata);

  if (!image) return null;

  return (
    <Suspense fallback={<AsideImage title={caption} {...{ image }} />}>
      <GalleryAssetContent id={asset.id} {...{ image, caption }} />
    </Suspense>
  );
};

GalleryAsset.displayName = "Organism.MediaAside.GalleryAsset";

export default GalleryAsset;
