import { FC } from "react";
import { z } from "zod";
import { FragmentType, useFragment } from "@/gql";
import { ImageBlockFragmentDoc } from "@/gql/graphql";
import Container from "@rubin-epo/epo-react-lib/Container";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import Image from "@rubin-epo/epo-react-lib/Image";
import { DetailedAssetSchema } from "@/lib/api/galleries/schema";
import InlineCantoImage from "@/components/organisms/InlineCantoImage";
import { isDarkMode } from "@/helpers/styles";
import styles from "./styles.module.css";

interface ImageContentBlockProps
  extends FragmentType<typeof ImageBlockFragmentDoc> {
  locale: string;
}

const ImageContentBlock: FC<ImageContentBlockProps> = ({
  locale,
  ...props
}) => {
  const {
    caption,
    backgroundColor,
    floatDirection,
    image: [image],
    cantoImage,
  } = useFragment(ImageBlockFragmentDoc, props);

  const { data: cantoAsset } = z
    .array(DetailedAssetSchema)
    .transform((output) => output[0])
    .safeParse(cantoImage);

  if (!image && !cantoAsset) return null;

  const renderedImage = cantoAsset ? (
    <InlineCantoImage asset={cantoAsset} locale={locale} />
  ) : (
    <Image image={image} />
  );

  const hasFloat = floatDirection === "right" || floatDirection === "left";
  const darkMode = isDarkMode(backgroundColor);

  const figure = (
    <Figure
      className={styles.figure}
      withBackground={!hasFloat && darkMode}
      caption={caption}
    >
      {renderedImage}
    </Figure>
  );

  return hasFloat ? (
    <section
      data-float={hasFloat}
      data-float-direction={floatDirection}
      data-dark-mode={darkMode}
      style={{
        "--direction-float": floatDirection,
        backgroundColor: backgroundColor && `var(--${backgroundColor})`,
      }}
      className={styles.container}
    >
      {figure}
    </section>
  ) : (
    <Container darkMode={darkMode} bgColor={backgroundColor || undefined}>
      {figure}
    </Container>
  );
};

ImageContentBlock.displayName = "ContentBlock.Image";

export default ImageContentBlock;
