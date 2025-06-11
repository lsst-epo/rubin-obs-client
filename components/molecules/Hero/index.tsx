import { FunctionComponent, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Image from "next/image";

interface HeroProps {
  data: Array<any>;
  focalPointX?: number;
  focalPointY?: number;
  className?: string;
}
const Hero: FunctionComponent<PropsWithChildren<HeroProps>> = ({
  data,
  focalPointX = 50,
  focalPointY = 50,
  className,
  children,
}) => {
  const imageData = data && data[0];

  if (!imageData?.url) return null;

  const { width, height, url: src, altText: alt = "" } = imageData;

  return (
    <div data-cy="hero" className={clsx(styles.heroContainer, className)}>
      <Image
        className={styles.heroImage}
        {...{ width, height, src, alt }}
        style={{
          "--Hero-object-position": `${focalPointX || 50}% ${
            focalPointY || 50
          }%`,
        }}
        sizes={`(max-width: 2000px) 100vw, 2000px`}
        priority
        fetchPriority="high"
        quality={90}
      />
      {children}
    </div>
  );
};

Hero.displayName = "Molecule.Hero";

export default Hero;
