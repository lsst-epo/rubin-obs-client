"use client";

import ResponsiveImage from "@rubin-epo/epo-react-lib/ResponsiveImage";
import * as Styled from "./styles";
import { useCarouselContext } from "../../context";

interface Props {
  image?: {
    altText?: string | null;
    width?: number | null;
    height?: number | null;
    url?: string | null;
  } | null;
  index: number;
}

export default function Slide({ index, image }: Props) {
  const { slideProps, slideIds } = useCarouselContext();
  const id = slideIds.at(index);
  const responsiveImg = image?.url
    ? {
        url: image.url,
        altText: image.altText || undefined,
        width: image.width || 1280,
        height: image.height || 720,
      }
    : null;

  return (
    <Styled.Slide
      id={id}
      aria-describedby={`${id}_description`}
      {...slideProps}
    >
      {responsiveImg?.url && <ResponsiveImage image={responsiveImg} />}
    </Styled.Slide>
  );
}
