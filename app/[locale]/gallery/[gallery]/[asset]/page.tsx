import { ComponentType, FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportedCantoAssetScheme } from "types/canto";
import { getAssetFromGallery } from "@/lib/api/galleries/asset";
import { assetTitle, assetToPageMetadata } from "@/lib/api/canto/metadata";
import CantoFigure from "@/components/organisms/gallery/CantoFigure";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import ImageSizes from "@/components/organisms/gallery/metadata/Sizes";
import AssetTags from "@/components/organisms/gallery/metadata/Tags";
import { addLocaleUriSegment } from "@/lib/i18n";
import CantoImage from "@/components/organisms/gallery/CantoImage";
import CantoVideo from "@/components/organisms/gallery/CantoVideo";
import AssetMetadata from "@/components/organisms/gallery/metadata/Asset";

export async function generateMetadata({
  params: { locale, gallery, asset: id },
}: GalleryAssetProps): Promise<Metadata> {
  const asset = await getAssetFromGallery(gallery, id, locale);

  if (!asset) {
    notFound();
  }

  return assetToPageMetadata(asset, locale);
}

const assetComponent: Record<SupportedCantoAssetScheme, ComponentType> = {
  image: CantoImage,
  video: CantoVideo,
};

const GalleryAsset: FunctionComponent<GalleryAssetProps> = async ({
  params: { locale, gallery, asset: id },
}) => {
  const asset = await getAssetFromGallery(gallery, id, locale);

  if (!asset) {
    notFound();
  }

  const { name, width, height, url, scheme, tag, additional, size } = asset;

  const { directUrlPreview, directUrlOriginal } = url;

  const validTagsOnly =
    tag?.filter((maybeTag): maybeTag is string => {
      if (typeof maybeTag === "string") {
        return maybeTag.toLowerCase() !== "untagged";
      }
      return false;
    }) || [];

  const links: Record<SupportedCantoAssetScheme, JSX.Element> = {
    image: (
      <>
        <ImageSizes
          width={parseInt(width)}
          height={parseInt(height)}
          {...{ directUrlPreview, directUrlOriginal }}
        />
        <AssetTags tags={validTagsOnly} parentUri={`/gallery/${gallery}`} />
      </>
    ),
    video: <AssetTags tags={validTagsOnly} parentUri={`/gallery/${gallery}`} />,
  };

  const location = `${process.env.NEXT_PUBLIC_BASE_URL}${addLocaleUriSegment(
    locale
  )}/gallery/${gallery}/${id}`;

  const Asset = assetComponent[scheme];

  return (
    <SingleMediaAsset
      title={assetTitle(additional, locale) || name}
      asset={
        <CantoFigure
          downloadUrl={directUrlOriginal}
          asset={<Asset {...{ asset, locale }} />}
          {...{ locale, additional, width, height, location, name }}
        />
      }
      metadataBlocks={
        <AssetMetadata size={parseInt(size)} {...{ scheme, width, height }} />
      }
      metadataLinks={links[scheme]}
    />
  );
};

export default GalleryAsset;
