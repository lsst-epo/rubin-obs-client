"use client";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface GallerySpotlightProps {
  images: any;
  randomizeImageOrder?: boolean;
  imageSwapInterval?: any;
  width?: number;
  height?: number;
}

const GallerySpotlight: FC<GallerySpotlightProps> = ({
  images,
  randomizeImageOrder,
  imageSwapInterval,
  width = 500,
  height = 500,
}) => {
  const wildlifeSpotlightImageUrls = images.map(
    (image) => image.url.directUrlOriginal
  );
  const wildlifeSpotlightIds = images.map((image) => image.id);

  const galleryStr = "/gallery/collections/wildlife-spotlight-test-gallery/";

  const galleryLink = wildlifeSpotlightIds
    ? galleryStr + wildlifeSpotlightIds[0]
    : "no-id";
  const testUrl = wildlifeSpotlightImageUrls
    ? wildlifeSpotlightImageUrls[0]
    : "no-url";

  return (
    <Link href={galleryLink}>
      <Image src={testUrl} width={width} height={width} alt="alt" />
    </Link>
  );
};

GallerySpotlight.displayName = "Molecule.Gallery.Spotlight";

export default GallerySpotlight;
