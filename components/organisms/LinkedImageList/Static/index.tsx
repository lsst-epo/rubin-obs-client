"use client";
import { FC } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { LinkedImage } from "../Flexible";
import LinkedImageListItem from "@/components/molecules/LinkedImageListItem";
import styles from "./styles.module.css";

interface StaticLinkedImageListProps {
  list: Array<LinkedImage>;
  className?: string;
}

const StaticLinkedImageList: FC<StaticLinkedImageListProps> = ({
  list,
  className,
}) => {
  const pathname = usePathname() || "";

  return (
    <ol className={clsx(styles.list, className)}>
      {list.map(({ id, image, link: { url, target, customText, text } }, i) => {
        return (
          <LinkedImageListItem
            key={id}
            href={url}
            target={target}
            text={customText || text}
            count={i + 1}
            className={styles.item}
            active={url.includes(pathname)}
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
      })}
    </ol>
  );
};

StaticLinkedImageList.displayName = "Organism.LinkedImageList.Static";

export default StaticLinkedImageList;
