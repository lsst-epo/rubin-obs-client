import clsx from "clsx";
import { FC, ReactNode } from "react";
import styles from "./styles.module.css";

interface FilmReelProps {
  items: Array<ReactNode>;
  className?: string;
}

const FilmReel: FC<FilmReelProps> = ({ items = [], className }) => {
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.head} />
      <div className={styles.reel} style={{ "--count-items": items.length }}>
        {items.map((item, i) => {
          return (
            <div key={i} className={styles.item}>
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

FilmReel.displayName = "Organism.FirstLookWidget.FilmReel";

export default FilmReel;
