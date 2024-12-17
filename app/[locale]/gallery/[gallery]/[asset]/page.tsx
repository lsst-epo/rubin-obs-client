import { FunctionComponent } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAssetFromGallery,
  getAssetGalleryTitle,
} from "@/lib/api/galleries/asset";
import { assetToPageMetadata } from "@/lib/api/canto/metadata";
import CantoFigure from "@/components/organisms/gallery/CantoFigure";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import ImageMetadata from "@/components/organisms/gallery/metadata/Image";
import ImageSizes from "@/components/organisms/gallery/metadata/Sizes";
import AssetTags from "@/components/organisms/gallery/metadata/Tags";
import { addLocaleUriSegment } from "@/lib/i18n";
import { CantoAssetScheme } from "@/lib/api/galleries/schema";
import CantoImage from "@/components/organisms/gallery/CantoImage";
import CantoVideo from "@/components/organisms/gallery/CantoVideo";

export async function generateMetadata({
  params: { locale, gallery, asset: id },
}: GalleryAssetProps): Promise<Metadata> {
  const image = await getAssetFromGallery(gallery, id, locale);

  if (!image) {
    notFound();
  }

  return assetToPageMetadata(image, locale);
}

const GalleryAsset: FunctionComponent<GalleryAssetProps> = async ({
  params: { locale, gallery, asset: id },
}) => {
  const asset = await getAssetFromGallery(gallery, id, locale);
  const parentGalleryTitle = await getAssetGalleryTitle(gallery, locale);

  if (!asset || !parentGalleryTitle) {
    notFound();
  }

  const { name, width, height, url, scheme, tag, additional } = asset;

  const { directUrlPreview, directUrlPreviewPlay, directUrlOriginal } = url;

  const validTagsOnly =
    tag?.filter((maybeTag): maybeTag is string => {
      if (typeof maybeTag === "string") {
        return maybeTag.toLowerCase() !== "untagged";
      }
      return false;
    }) || [];

  const metadata: Record<CantoAssetScheme, JSX.Element> = {
    image: (
      <>
        <ImageMetadata {...{ width, height }} />
      </>
    ),
    video: (
      <>
        <ImageMetadata {...{ width, height }} />
      </>
    ),
    audio: <></>,
    document: <></>,
    presentation: <></>,
    other: <></>,
  };

  const links: Record<CantoAssetScheme, JSX.Element> = {
    image: (
      <>
        <ImageSizes {...{ directUrlPreview, width, height }} />
        <AssetTags tags={validTagsOnly} parentUri={`/gallery/${gallery}`} />
      </>
    ),
    video: <AssetTags tags={validTagsOnly} parentUri={`/gallery/${gallery}`} />,
    audio: <></>,
    document: <></>,
    presentation: <></>,
    other: <></>,
  };

  const assetComponent: Record<CantoAssetScheme, JSX.Element> = {
    image: <CantoImage {...{ locale, asset }} />,
    video: <CantoVideo {...{ locale, asset }} />,
    audio: <></>,
    document: <></>,
    presentation: <></>,
    other: <></>,
  };

  const location = `${process.env.NEXT_PUBLIC_BASE_URL}${addLocaleUriSegment(
    locale
  )}/gallery/${gallery}/${id}`;

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            uri: `${addLocaleUriSegment(locale, {
              includeLeadingSlash: false,
              includeTrailingSlash: true,
            })}gallery/${gallery}`,
            title: parentGalleryTitle,
            id: "gallery",
          },
          {
            uri: `${addLocaleUriSegment(locale, {
              includeLeadingSlash: false,
              includeTrailingSlash: true,
            })}gallery/${gallery}/${id}`,
            title: name,
            id: "asset",
          },
        ]}
      />
      <SingleMediaAsset
        title={name}
        asset={
          <CantoFigure
            downloadUrl={directUrlOriginal}
            asset={assetComponent[scheme]}
            {...{ locale, additional, width, height, location, name }}
          />
        }
        metadataBlocks={metadata[scheme]}
        metadataLinks={links[scheme]}
      />
    </>
  );
};

export default GalleryAsset;
