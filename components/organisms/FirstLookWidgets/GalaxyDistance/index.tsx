import { FC } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const GalaxyDistance: FC<{ className?: string }> = ({ className }) => {
  const items = new Array(6).fill(null);

  items[0] = "Farther away from us";
  items[5] = "Closer to us";
  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.galaxies}>
        {items.map((item, i) => {
          return (
            <div className={styles.item} key={i}>
              <svg
                className={styles.galaxy}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 79.8 104.8"
              >
                <path d="M65 13.9A4.8 4.8 0 1 1 60.4 9a4.8 4.8 0 0 1 4.8 4.8" />
                <path d="M35.2 25.3s1-15 25-20.8c5.2-1.2 5.5-5.2.3-4.4-28.7 4.2-53 26.7-46.4 54.8.8 3.3-1.8 2.7-3 1.2-8.8-10.4-2.4-30.9 1-36.6.7-1.3-1.2-3.3-2.6-1.3-25.7 37.2 5.6 74.5 35 57 1.1-.8 2-.7 1.2 1.2C40.4 91 24.1 100.1 6 100.7c-2.6 0-3.2 3.3 1 3.7 46.4 4.8 80-43.9 49.7-68.6 28.8 9.5 14 50 14 50-.8 2.7 1.7 3.4 2.7 1C92.6 35.7 65 16 35.2 25.2m8.8 28c-1.8 4-6 6-9.4 4.5s-4.5-6-2.7-10 6-6 9.4-4.5 4.6 6 2.7 10" />
              </svg>
              {item !== null && <div className={styles.label}>{item}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

GalaxyDistance.displayName = "Organism.FirstLookWidget.GalaxyDistance";

export default GalaxyDistance;
