import clsx from "clsx";
import { ComponentProps, FC, Fragment } from "react";
import { CantoVideoMetadata } from "@/lib/api/galleries/schema";
import styles from "./styles.module.css";
import StructuredData from "@/components/atomic/StructuredData";
import { VideoObject } from "schema-dts";
import { assetCaption, assetTitle } from "@/lib/api/canto/metadata";

interface CantoPlayerProps {
  videos: Array<{
    orientation: "portrait" | "landscape";
    asset: CantoVideoMetadata;
  }>;
  locale?: string;
  playerProps?: Omit<ComponentProps<"video">, "className">;
  className?: string;
}

const CantoPlayer: FC<CantoPlayerProps> = ({
  videos,
  playerProps,
  locale,
  className,
}) => {
  const { asset: primary } =
    videos.find(({ orientation }) => orientation === "landscape") || videos[0];

  const metadata: VideoObject = {
    "@type": "VideoObject",
    name: assetTitle(primary.additional, locale),
    description: assetCaption(primary.additional, locale),
    contentUrl: primary.url.directUrlOriginal,
    width: `${primary.width}px`,
    height: `${primary.height}px`,
    encodingFormat: primary.metadata.MIMEType,
    thumbnailUrl: primary.url.directUrlPreview,
  };

  return (
    <>
      <StructuredData jsonLd={metadata} />
      <video
        className={clsx(styles.video, className)}
        controls
        {...playerProps}
      >
        {videos.map(
          ({
            orientation,
            asset: {
              id,
              url: { directUrlOriginal, directUrlPreviewPlay },
              metadata,
              width,
              height,
            },
          }) => {
            return (
              <Fragment key={id}>
                {directUrlPreviewPlay && (
                  <source
                    src={directUrlPreviewPlay}
                    media={`(orientation: ${orientation}) and (max-width: ${
                      orientation === "portrait" ? "720px" : "1280px"
                    })`}
                    type={metadata.MIMEType}
                    {...{ width, height }}
                  />
                )}
                <source
                  src={directUrlOriginal}
                  media={`(orientation: ${orientation})`}
                  type={metadata.MIMEType}
                  {...{ width, height }}
                />
              </Fragment>
            );
          }
        )}
      </video>
    </>
  );
};

CantoPlayer.displayName = "Molecule.Player.Canto";

export default CantoPlayer;
