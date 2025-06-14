import { FunctionComponent } from "react";
import clsx from "clsx";
import Link from "next/link";
import styles from "./styles.module.css";

export type Tag = {
  name: string;
  destination?: string;
};
interface TagListProps {
  tags: Array<Tag>;
  showPound?: boolean;
  withLinebreaks?: boolean;
  className?: string;
}

const TagList: FunctionComponent<TagListProps> = ({
  tags = [],
  showPound = true,
  withLinebreaks = false,
  className,
}) => {
  return (
    <ul
      data-no-break={!withLinebreaks}
      className={clsx(styles.tagList, className)}
    >
      {tags.map(({ name, destination }) => {
        const tagName = showPound ? `#${name}` : name;

        return (
          <li className={styles.tag} data-no-break={!withLinebreaks} key={name}>
            {destination ? (
              <Link href={destination} prefetch={false}>
                {tagName}
              </Link>
            ) : (
              tagName
            )}
          </li>
        );
      })}
    </ul>
  );
};

TagList.displayName = "Molecule.TagList";

export default TagList;
