import { FC } from "react";
import { serialize } from "tinyduration";
import { notFound } from "next/navigation";
import { VideoObject } from "schema-dts";
import sanitize from "sanitize-html";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import { MediaService } from "@/services/noirlab";
import { type Locale } from "@/lib/i18n/settings";
import { isRubinAsset } from "@/helpers/noirlab";
import { useTranslation } from "@/lib/i18n";
import SingleMediaAsset from "@/components/templates/SingleMediaAsset";
import GalleryVideo from "@/components/molecules/GalleryVideo";
import AssetMetadata from "@/components/organisms/gallery/metadata/Asset";
import GalleryYoutubeVideo from "@/components/molecules/GalleryYoutubeVideo";
import SharePopup from "@/components/molecules/SharePopup";

const NOIRLabVideoAsset: FC<NOIRLabAssetProps<Locale>> = async ({
  params: { locale, asset },
}) => {
  const { t } = await useTranslation(locale);
  const { data, error } = await MediaService.mediaVideosRetrieve({
    path: { id: asset },
    query: { lang: locale, translation_mode: "fallback" },
  });

  if (error || !data || !isRubinAsset(data.categories)) {
    notFound();
  }

  const {
    title,
    description,
    formats: { hd_1080_screen: hd1080Screen, thumb350x, videoframe },
    release_date: dateCreated,
    use_youtube: useYoutube = false,
    youtube_video_id: youtubeVideoId,
  } = data;

  const credit = data.credit
    ? sanitize(data.credit, { allowedTags: [], allowedAttributes: {} })
    : undefined;
  const durationAsNumber = data.duration ? parseInt(data.duration) : undefined;
  const duration = serialize({ seconds: durationAsNumber });

  const url =
    useYoutube && youtubeVideoId
      ? new URL(
          `https://www.youtube.com/watch?${new URLSearchParams({
            v: youtubeVideoId,
          }).toString()}`
        ).href
      : hd1080Screen;

  if (!videoframe || !url) {
    notFound();
  }

  const caption = sanitize(description || "");

  const width = 1920;
  const height = 1080;

  const metadata: VideoObject = {
    "@type": "VideoObject",
    name: title,
    caption,
    contentUrl: url,
    creditText: credit,
    duration,
    uploadDate: dateCreated,
    width: `${width}px`,
    height: `${height}px`,
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
          {hd1080Screen && (
            <Buttonish url={hd1080Screen} rel="alternate" download>
              {t("gallery.download-video")}
            </Buttonish>
          )}
          <SharePopup
            title={title}
            url={`gallery/collections/news-videos/${asset}`}
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
        useYoutube ? (
          <GalleryYoutubeVideo {...{ url, width, height, metadata }} />
        ) : (
          <GalleryVideo
            {...{ metadata, width, height }}
            url={url}
            thumbnail={videoframe}
          />
        )
      }
      metadataBlocks={
        <AssetMetadata
          scheme="video"
          dateCreated={new Date(dateCreated)}
          duration={durationAsNumber}
          {...{ width, height }}
        />
      }
    />
  );
};

export default NOIRLabVideoAsset;
