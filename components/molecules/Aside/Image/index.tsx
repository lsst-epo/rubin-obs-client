import { FC } from "react";
import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { type ImageShape } from "@rubin-epo/epo-react-lib/Image";
import ResponsiveImage from "@rubin-epo/epo-react-lib/ResponsiveImage";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import styles from "./styles.module.css";

interface AsideImageProps {
  link?: LinkProps;
  image: ImageShape;
  caption?: string;
  className?: string;
}

const AsideImage: FC<AsideImageProps> = ({
  link,
  image,
  caption,
  className,
}) => {
  return (
    <Figure
      className={classNames(styles.figure, className)}
      caption={
        caption &&
        (link ? (
          <Link
            prefetch={false}
            {...link}
            className={styles.captionLink}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        ) : (
          <div
            className={styles.caption}
            dangerouslySetInnerHTML={{ __html: caption }}
          />
        ))
      }
    >
      <ResponsiveImage
        className={styles.image}
        image={image}
        aspectRatio="8:5"
      />
    </Figure>
  );
};

AsideImage.displayName = "Molecule.Aside.Image";

export default AsideImage;
