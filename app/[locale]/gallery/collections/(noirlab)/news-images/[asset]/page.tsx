import { FC } from "react";
import sanitize from "sanitize-html";
import { notFound } from "next/navigation";
import { ImageObject } from "schema-dts";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { isRubinAsset } from "@/helpers/noirlab";
import { useTranslation } from "@/lib/i18n";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import AssetMetadata from "@/components/organisms/gallery/metadata/Asset";
import NOIRLabImageSizes from "@/components/organisms/gallery/NOIRLabImageSizes";
import GalleryImage from "@/components/molecules/GalleryImage";
import SharePopup from "@/components/molecules/SharePopup";

const NOIRLabImageAsset: FC<NOIRLabAssetProps<Locale>> = async ({
  params: { locale, asset },
}) => {
  const { t } = await useTranslation(locale);
  const { data, error } = await MediaService.mediaImagesRetrieve({
    path: { id: asset },
    query: { lang: locale, translation_mode: "fallback" },
    cache: "force-cache",
  });

  if (error || !data || !isRubinAsset(data.categories)) {
    notFound();
  }

  const {
    title,
    width,
    height,
    description,
    formats: { original, thumb350x, screen },
    release_date: dateCreated,
    resources,
    formats,
  } = data;

  if (!width || !height || !screen || !original) {
    notFound();
  }

  const { FileSize } = resources[0];
  const caption = sanitize(description || "");
  const credit = data.credit
    ? sanitize(data.credit, { allowedTags: [], allowedAttributes: {} })
    : undefined;

  const metadata: ImageObject = {
    "@type": "ImageObject",
    name: title,
    caption,
    contentUrl: screen,
    creditText: credit,
    height: `${width}px`,
    width: `${height}px`,
    dateCreated,
    thumbnailUrl: thumb350x || undefined,
  };

  return (
    <SingleMediaAsset
      caption={
        <div
          className="c-content-rte"
          dangerouslySetInnerHTML={{ __html: caption }}
        />
      }
      actions={
        <>
          <Buttonish url={original} rel="alternate" download>
            {t("gallery.download-image")}
          </Buttonish>
          <SharePopup
            title={title}
            url={`gallery/collections/news-images/${asset}`}
          />
        </>
      }
      credit={
        credit &&
        t("gallery.credit", {
          credit,
        })
      }
      {...{ width, height, title }}
      asset={
        <GalleryImage
          {...{ metadata, width, height, title }}
          src={screen}
          alt={caption}
        />
      }
      metadataBlocks={
        <AssetMetadata
          scheme="image"
          size={FileSize || undefined}
          dateCreated={new Date(dateCreated)}
          {...{ width, height }}
        />
      }
      metadataLinks={<NOIRLabImageSizes {...{ resources, formats, locale }} />}
    />
  );
};

export default NOIRLabImageAsset;
