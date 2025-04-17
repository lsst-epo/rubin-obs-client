import { FC } from "react";
import { z } from "zod";
import Container from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import { FragmentType, useFragment } from "@/gql";
import { ImageComparisonBlockFragmentDoc } from "@/gql/graphql";
import { isDarkMode } from "@/helpers/styles";
import { MetadataAssetSchema } from "@/lib/api/galleries/schema";
import { ImageProps } from "next/image";
import { assetAlt } from "@/lib/api/canto/metadata";
import { resizeCantoImage } from "@/lib/api/canto/resize";
import ImageComparison from "@/components/molecules/ImageComparison";
import styles from "./styles.module.css";

interface ImageComparisonBlockProps
  extends FragmentType<typeof ImageComparisonBlockFragmentDoc> {
  locale: string;
}

const ImageComparisonBlock: FC<ImageComparisonBlockProps> = ({
  locale,
  ...props
}) => {
  const { caption, images, backgroundColor } = useFragment(
    ImageComparisonBlockFragmentDoc,
    props
  );

  const { data: comparisonImages } = z
    .array(
      MetadataAssetSchema.transform(
        ({ width, height, additional, url }): ImageProps => {
          return {
            width,
            height,
            alt: assetAlt(additional, locale),
            src: resizeCantoImage(url.directUrlPreview, 2050),
          };
        }
      )
    )
    .min(2)
    .safeParse(images);

  if (!comparisonImages) return null;

  return (
    <Container
      darkMode={isDarkMode(backgroundColor)}
      bgColor={backgroundColor || undefined}
    >
      <Figure
        className={styles.figure}
        layout="vertical"
        caption={caption}
        withBackground
      >
        <ImageComparison images={comparisonImages} />
      </Figure>
    </Container>
  );
};

ImageComparisonBlock.displayName = "ContentBlock.ImageComparison";

export default ImageComparisonBlock;
