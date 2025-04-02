import { FC, Suspense } from "react";
import { ImageProps } from "next/image";
import AsideImage from "@/components/molecules/Aside/Image";
import { cantoToImageProps } from "@/lib/api/canto";
import { assetTitle } from "@/lib/api/canto/metadata";
import { getGalleryForAsset } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";

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
  const uri = await getGalleryForAsset(id);
  const link = uri
    ? { href: addLocaleUriSegment(getLocale(), `${uri}/${id}`) }
    : undefined;

  return <AsideImage title={caption} {...{ image, link }} />;
};

const GalleryAsset: FC<GalleryAssetProps> = ({ asset }) => {
  const image = cantoToImageProps(asset);
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
