import clsx from "clsx";
import { FC } from "react";
import { CantoAssetMetadata } from "@/lib/api/galleries/schema";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import LinkedImageListItem from "@/components/molecules/LinkedImageListItem";
import ScrollCarousel from "@/components/molecules/ScrollCarousel";
import styles from "./styles.module.css";

interface LinkedImage {
  id: string;
  image?: CantoAssetMetadata;
  link: {
    customText?: string;
    text?: string;
    target?: string;
    url: string;
  };
}

interface LinkedImageListProps {
  title?: string;
  description?: string;
  list: Array<LinkedImage>;
  className?: string;
}

const FlexibleLinkedImageList: FC<LinkedImageListProps> = ({
  title,
  description,
  list,
  className,
}) => {
  const hasHeader = !!title || !!description;
  const count = list.length;

  return (
    <div className={clsx(styles.container, className)}>
      {hasHeader && (
        <header className={styles.header}>
          <Stack space="var(--size-spacing-2xs)">
            {title && <h2>{title}</h2>}
            {description && <div>{description}</div>}
          </Stack>
        </header>
      )}
      <ScrollCarousel
        as="ol"
        className={styles.list}
        style={{ "--grow-size": count - 1 }}
      >
        {list.map(
          ({ id, image, link: { url, target, customText, text } }, i) => {
            return (
              <LinkedImageListItem
                key={id}
                className={styles.item}
                href={url}
                target={target}
                text={customText || text}
                count={i + 1}
                image={
                  image && {
                    width: image.width,
                    height: image.height,
                    src: image.url.directUrlPreview,
                    alt: "",
                    role: "presentation",
                  }
                }
              />
            );
          }
        )}
      </ScrollCarousel>
    </div>
  );
};

FlexibleLinkedImageList.displayName = "Organism.LinkedImageList.Flexible";

export default FlexibleLinkedImageList;
