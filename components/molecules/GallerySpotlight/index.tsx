"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface GallerySpotlightProps {
  gallerySlug: string;
  images: any;
  randomizeImageOrder?: boolean;
  imageSwapInterval?: any;
  width?: number;
  height?: number;
}

const GallerySpotlight: FC<GallerySpotlightProps> = ({
  gallerySlug,
  images,
  randomizeImageOrder,
  imageSwapInterval,
  width = 500,
  height = 500,
}) => {
  images = [
    {
      additional: {
        AltTextEN:
          "An image of an axolotl underwater, among seagrass, with a decidedly scheme-y facial expression.",
        CaptionEN:
          "A suspicious axolotl we found in an underground river 20 meters below the observatory.",
        Credit: null,
      },
      url: {
        directUrlOriginal:
          "https://Rubin.canto.com/direct/image/3677hkr83h2hj0t2opiqu3210d/4B8aKICkQwZ3Y34gOkzccrR1dlg/original?content-type=image%2Fjpeg&name=scheming-axolotl.jpg",
      },
      id: "3677hkr83h2hj0t2opiqu3210d",
    },
    {
      additional: {
        AltTextEN: "tortoise",
        CaptionEN: null,
        Credit: null,
      },
      url: {
        directUrlOriginal:
          "https://Rubin.canto.com/direct/image/nnqt1ev1315kt9nd0r49pins1d/2p83x8JRak9PWrjjdjhKjwz3HN8/original?content-type=image%2Fjpeg&name=whimsical-tortoise-frog.jpeg",
      },
      id: "nnqt1ev1315kt9nd0r49pins1d",
    },
    {
      additional: {
        AltTextEN: "bird",
        CaptionEN: null,
        Credit: null,
      },
      url: {
        directUrlOriginal:
          "https://Rubin.canto.com/direct/image/apfirrhpsh5bta0gkesgoeta2i/3-83Rw0uDb5fbUdU7s9_N_vc08c/original?content-type=image%2Fwebp&name=splashy-bird.webp",
      },
      id: "apfirrhpsh5bta0gkesgoeta2i",
    },
  ];

  const galleryStr = "/gallery/collections/" + gallerySlug;
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageIndex((prevIndex) =>
        prevIndex < images.length - 1 ? prevIndex + 1 : 0
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [images, imageIndex]);

  const currentImage = images[imageIndex];
  const {
    additional: { AltTextEN: altTextEn, CaptionEN: captionEn, Credit: credit },
    url: { directUrlOriginal: imageUrl },
    id: cantoImageId,
  } = currentImage;

  const galleryLink = galleryStr + cantoImageId;

  return (
    <Link href={galleryLink}>
      <Image src={imageUrl} width={width} height={height} alt={altTextEn} />
    </Link>
    // <>
    //   <p>{imageIndex}</p>
    //   <p>{galleryLink}</p>
    // </>
  );
};

GallerySpotlight.displayName = "Molecule.Gallery.Spotlight";

export default GallerySpotlight;
