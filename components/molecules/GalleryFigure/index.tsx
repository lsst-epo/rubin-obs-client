import { FC, PropsWithChildren, ReactNode } from "react";
import Figure from "@rubin-epo/epo-react-lib/Figure";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import styles from "./styles.module.css";

export interface GalleryFigureProps {
  caption: ReactNode;
  credit?: string;
  actions?: ReactNode;
  width: number;
  height: number;
  className?: string;
}

const GalleryFigure: FC<PropsWithChildren<GalleryFigureProps>> = ({
  caption,
  credit,
  actions,
  width,
  height,
  children,
  className,
}) => {
  const aspectRatio = width / height;
  const shortestSide = Math.min(width, height);
  const useHorizontalLayout = aspectRatio < 1 || shortestSide < 720;

  return (
    <Figure
      className={className}
      caption={
        <Stack space="var(--size-spacing-xs)">
          {caption}
          {credit && <div className={styles.credit}>{credit}</div>}
          {actions && <div className={styles.actionsRow}>{actions}</div>}
        </Stack>
      }
      layout={useHorizontalLayout ? "horizontal" : "vertical"}
      withBackground
    >
      <div
        className={styles.imageWrapper}
        style={{
          "--w": `${width}px`,
          "--h": `${height}px`,
        }}
      >
        {children}
      </div>
    </Figure>
  );
};

GalleryFigure.displayName = "Molecule.GalleryFigure";

export default GalleryFigure;
