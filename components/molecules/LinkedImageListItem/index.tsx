import { FC } from "react";
import clsx from "clsx";
import Link, { LinkProps } from "next/link";
import Image, { ImageProps } from "next/image";
import styles from "./styles.module.css";

interface LinkedImageListItemProps extends LinkProps {
  className?: string;
  target?: string;
  count: number;
  text?: string;
  image?: ImageProps;
}

const LinkedImageListItem: FC<LinkedImageListItemProps> = ({
  image,
  className,
  text,
  target,
  count,
  ...props
}) => {
  return (
    <li value={count} className={clsx(styles.item, className)}>
      <Link className={styles.link} target={target} {...props}>
        {image && (
          <Image {...image} className={clsx(styles.image, image.className)} />
        )}
        <span data-count={count} className={styles.text}>
          {text}
        </span>
      </Link>
    </li>
  );
};

LinkedImageListItem.displayName = "Molecule.LinkedImageList.Item";

export default LinkedImageListItem;
