import AsideImage from "@/components/molecules/Aside/Image";
import { cantoToImageShape } from "@/lib/api/canto";
import { assetTitle } from "@/lib/api/canto/metadata";
import { getGalleryForAsset } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/server";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import { FC, Suspense } from "react";

interface GalleryAssetProps {
  asset: any;
}

interface GalleryAssetContentProps {
  id: string;
  image: ImageShape;
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

  return <AsideImage {...{ image, caption }} link={link} />;
};

const GalleryAsset: FC<GalleryAssetProps> = ({ asset }) => {
  const image = cantoToImageShape(asset, 240);
  const caption = assetTitle(asset.metadata);

  if (!image) return null;

  return (
    <Suspense fallback={<AsideImage {...{ image, caption }} />}>
      <GalleryAssetContent id={asset.id} {...{ image, caption }} />
    </Suspense>
  );
};

GalleryAsset.displayName = "Organism.MediaAside.GalleryAsset";

export default GalleryAsset;
