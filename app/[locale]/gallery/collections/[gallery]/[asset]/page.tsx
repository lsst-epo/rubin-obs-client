import { ComponentType, FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAssetFromGallery } from "@/lib/api/galleries/asset";
import { assetTitle, assetToPageMetadata } from "@/lib/api/canto/metadata";
import { SupportedCantoAssetScheme } from "@/lib/api/galleries/schema";
import { isMainGallery } from "@/lib/api/galleries";
import { getMediaPolicyPage } from "@/lib/api/galleries/media-policy";
import { buildParentPath } from "@/lib/helpers/gallery";
import CantoFigure from "@/components/organisms/gallery/CantoFigure";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import ImageSizes from "@/components/organisms/gallery/metadata/Sizes";
import AssetTags from "@/components/organisms/gallery/metadata/Tags";
import CantoImage from "@/components/organisms/gallery/CantoImage";
import CantoVideo from "@/components/organisms/gallery/CantoVideo";
import CantoDocument from "@/components/organisms/gallery/CantoDocument";
import AssetMetadata from "@/components/organisms/gallery/metadata/Asset";
import { addLocaleUriSegment } from "@/lib/i18n";

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
  document: CantoDocument,
};

const GalleryAsset: FunctionComponent<GalleryAssetProps> = async ({
  params: { locale, gallery, asset: id },
}) => {
  const asset = await getAssetFromGallery(gallery, id, locale);

  if (!asset) {
    notFound();
  }

  const parentUri = buildParentPath({
    locale,
    gallery,
    includeParentSlug: !(await isMainGallery(gallery, locale)),
  });

  const {
    name,
    width,
    height,
    url,
    scheme,
    tag,
    additional,
    size,
    default: { DateCreated },
  } = asset;

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
          {...{ width, height, directUrlPreview, directUrlOriginal }}
        />
        <AssetTags tags={validTagsOnly} parentUri={parentUri} />
      </>
    ),
    video: <AssetTags tags={validTagsOnly} parentUri={parentUri} />,
    document: (
      <>
        <AssetTags tags={validTagsOnly} parentUri={parentUri} />
      </>
    ),
  };

  const Asset = assetComponent[scheme];
  const dateCreated = new Date(DateCreated);
  const mediaPolicyPage = await getMediaPolicyPage(locale);
  const license = mediaPolicyPage
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${addLocaleUriSegment(
        locale,
        mediaPolicyPage.uri
      )}`
    : undefined;

  return (
    <SingleMediaAsset
      title={assetTitle(additional, locale) || name}
      asset={
        <CantoFigure
          downloadUrl={directUrlOriginal}
          asset={<Asset {...{ asset, locale, license }} />}
          {...{
            locale,
            additional,
            width,
            height,
            gallery,
            parentUri,
            id,
            name,
            scheme,
            dateCreated,
          }}
        />
      }
      metadataBlocks={
        <AssetMetadata
          size={parseInt(size)}
          {...{ scheme, width, height, dateCreated }}
        />
      }
      metadataLinks={links[scheme]}
    />
  );
};

export default GalleryAsset;
