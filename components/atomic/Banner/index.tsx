"use client";
import { FC } from "react";
import styles from "./styles.module.css";

interface BannerProps {
  text: string;
  theme?: string;
  stickyPosition?: string;
}

const Banner: FC<BannerProps> = ({
  text,
  theme,
  stickyPosition = "top"
}) => {

  return (
      <div className={styles.banner} data-color={theme} data-sticky-position={stickyPosition}>
          {text}
      </div>
  );
};

Banner.displayName = "Atom.Banner";

export default Banner;
