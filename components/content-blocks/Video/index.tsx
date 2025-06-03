import { z } from "zod";
import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { FragmentType, useFragment } from "@/gql";
import { VideoBlockFragmentDoc } from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import { MetadataVideoSchema } from "@/lib/api/galleries/schema";
import FeaturedVideoDialog from "@/components/molecules/FeaturedVideoDialog";
import YouTubePlayer from "@/components/molecules/players/YouTube";
import CantoPlayer from "@/components/molecules/players/Canto";
import styles from "./styles.module.css";

const VideoBaseSchema = z.object({
  id: z.string(),
  typeHandle: z.string(),
  fullWidth: z.boolean().catch(false),
  backgroundColor: z
    .string()
    .nullable()
    .catch(null)
    .transform((output) => output ?? undefined),
  caption: z
    .string()
    .nullable()
    .transform((output) => output ?? undefined),
});

const YouTubeVideoSchema = VideoBaseSchema.extend({
  url: z.string().url(),
  fullscreenVideo: z.literal(false).optional().catch(false).default(false),
  cantoAsset: z.literal(false).optional().default(false),
});

const CantoVideoSchema = VideoBaseSchema.extend({
  cantoAssets: z
    .array(
      z.object({
        orientation: z
          .enum(["portrait", "landscape"])
          .default("landscape")
          .catch("landscape"),
        asset: z
          .array(MetadataVideoSchema)
          .min(1)
          .max(1)
          .transform((output) => output[0]),
      })
    )
    .min(1)
    .max(2),
  cantoAsset: z.literal(true),
  fullscreenVideo: z.boolean(),
  url: z.string().nullable(),
});

const VideoSchema = z.discriminatedUnion("cantoAsset", [
  YouTubeVideoSchema,
  CantoVideoSchema,
]);

interface VideoBlockProps extends FragmentType<typeof VideoBlockFragmentDoc> {
  locale: string;
}

const VideoBlock: FC<VideoBlockProps> = ({ locale, ...props }) => {
  const data = useFragment(VideoBlockFragmentDoc, props);

  const { data: video } = VideoSchema.safeParse(data);

  if (!video) return null;

  const { fullscreenVideo, fullWidth, caption, id } = video;

  if (fullscreenVideo) {
    return (
      <FeaturedVideoDialog videos={video.cantoAssets} {...{ id, caption }} />
    );
  }

  const { backgroundColor, cantoAsset, url } = video;
  const darkMode = isDarkMode(backgroundColor);

  const player = cantoAsset ? (
    <CantoPlayer videos={video.cantoAssets} locale={locale} />
  ) : (
    <YouTubePlayer url={url} />
  );

  const figure = (
    <Figure caption={caption} withBackground={!fullWidth}>
      {player}
    </Figure>
  );

  return fullWidth ? (
    <section
      className={styles.container}
      data-dark-mode={darkMode}
      style={{
        backgroundColor: backgroundColor && `var(--${backgroundColor})`,
      }}
    >
      {figure}
    </section>
  ) : (
    <Container
      darkMode={darkMode}
      bgColor={backgroundColor || undefined}
      paddingSize="medium"
    >
      {figure}
    </Container>
  );
};

VideoBlock.displayName = "ContentBlock.Video";

export default VideoBlock;
