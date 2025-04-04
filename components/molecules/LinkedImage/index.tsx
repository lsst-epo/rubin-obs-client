import { FC } from "react";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";
import { LinkProps } from "next/link";
import { type IconKey } from "@rubin-epo/epo-react-lib/IconComposer";
import MasonryImage from "@rubin-epo/epo-react-lib/MasonryImage";
import styles from "./styles.module.css";

interface LinkedImageProps {
  className?: string;
  title?: string;
  image: ImageProps;
  link: LinkProps;
  icon?: IconKey;
}

const LinkedImage: FC<LinkedImageProps> = ({
  title,
  image: { className: imageClassName, ...image },
  link,
  icon,
  className,
}) => {
  return (
    <MasonryImage
      icon={icon}
      linkProps={link}
      className={clsx(styles.tile, className)}
    >
      <Image {...image} className={clsx(styles.image, imageClassName)} />
      {title && <div className={styles.titleCard}>{title}</div>}
    </MasonryImage>
  );
};

LinkedImage.displayName = "Molecule.LinkedImage";

export default LinkedImage;
