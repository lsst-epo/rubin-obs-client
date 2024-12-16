import { FunctionComponent } from "react";
import { getAssetFromGallery } from "@/lib/api/galleries/asset";
import { generateAllPreviewSizes } from "@/lib/api/canto/resize";
import { notFound } from "next/navigation";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import CantoFigure from "@/components/organisms/gallery/CantoFigure";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import ImageMetadata from "@/components/organisms/gallery/metadata/Image";
import ImageSizes from "@/components/organisms/gallery/metadata/Sizes";

export async function generateMetadata({
  params: { locale, gallery, asset: id },
}: GalleryAssetProps) {
  const image = await getAssetFromGallery(`gallery/${gallery}`, id, locale);

  if (!image) {
    notFound();
  }

  const { name } = image;

  return {
    title: name,
  };
}

const GalleryAsset: FunctionComponent<GalleryAssetProps> = async ({
  params: { locale, gallery, asset: id },
}) => {
  const asset = await getAssetFromGallery(`gallery/${gallery}`, id, locale);

  if (!asset) {
    notFound();
  }

  const {
    name,
    width,
    height,
    url: { directUrlPreview },
  } = asset;

  const sizes = generateAllPreviewSizes(directUrlPreview, width, height);

  console.log({ sizes });

  return (
    <SingleMediaAsset
      title={name}
      asset={<CantoFigure {...{ locale, asset }} />}
      metadataBlocks={
        <>
          <ImageMetadata {...{ width, height }} />
        </>
      }
      metadataLinks={
        <>
          <ImageSizes {...{ directUrlPreview, width, height }} />
        </>
      }
    >
      <Buttonish url={`/gallery/${gallery}`} text="Back to images" isBlock />
    </SingleMediaAsset>
  );
};

export default GalleryAsset;
