import { FC } from "react";
import sanitize from "sanitize-html";
import clsx from "clsx";
import { ImageProps } from "next/image";
import { LinkProps } from "next/link";
import Frame from "@rubin-epo/epo-react-lib/Frame";
import LinkedImage from "@/components/molecules/LinkedImage";
import styles from "./styles.module.css";

export interface AsideImageProps {
  link?: LinkProps;
  image: ImageProps;
  title?: string;
  className?: string;
}

const AsideImage: FC<AsideImageProps> = ({
  link = { href: "" },
  image,
  title,
  className,
}) => {
  return (
    <Frame aspectRatio="8:5">
      <LinkedImage
        className={clsx(styles.image, className)}
        title={
          title
            ? sanitize(title, { allowedTags: [], allowedAttributes: {} })
            : undefined
        }
        image={{
          ...image,
          sizes: "270px",
        }}
        link={{ prefetch: null, ...link }}
      />
    </Frame>
  );
};

AsideImage.displayName = "Molecule.Aside.Image";

export default AsideImage;
