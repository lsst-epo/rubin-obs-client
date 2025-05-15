import { FC } from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

interface SizeComparisonProps {
  className?: string;
  locale?: string;
}

const SizeComparison: FC<SizeComparisonProps> = ({ className, locale }) => {
  const screens = new Array(400).fill(null);

  return (
    <div className={clsx(styles.layout, className)}>
      <svg
        className={styles.frame}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 381.9 381.9"
      >
        <g fill="rgba(255,226,102,0.6)">
          <path d="M304 380.4H78V355H52.4v-25.5H27v-25.4H1.6V77.9H27V52.4h25.4V27H78V1.6H304V27h25.5v25.4H355V78h25.5V304H355v25.5h-25.5V355h-25.4v25.5Z" />
          <path
            fill="#ffe266"
            d="M79.4 3v25.5H53.9v25.4H28.5v25.5H3v223.2h25.5V328h25.4v25.5h25.5v25.4h223.2v-25.4H328V328h25.5v-25.4h25.4V79.4h-25.4V53.9H328V28.5h-25.4V3H79.4m-3-3h229.2v25.5H331v25.4h25.5v25.5h25.4v229.2h-25.4V331H331v25.5h-25.4v25.4H76.4v-25.4H50.9V331H25.5v-25.4H0V76.4h25.5V50.9h25.4V25.5h25.5V0Z"
          />
        </g>
        <text className={styles.textOverlay} x="50%" y="50%">
          <tspan>{Number(1).toLocaleString(locale)}</tspan>
        </text>
      </svg>
      <svg
        className={styles.equals}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 85 51"
      >
        <path d="M0 0h85v18H0z" />
        <path d="M0 33h85v18H0z" />
      </svg>
      <div className={styles.screenGrid}>
        {screens.map((screen, i) => {
          return (
            <svg
              key={i}
              className={styles.screen}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 8"
            >
              <g stroke="#ffe266">
                <g fill="rgba(255,226,102,0.6)">
                  <path stroke="none" d="M0 0h10v6H0z" />
                  <path fill="none" d="M.5.5h9v5h-9z" />
                </g>
                <path fill="none" d="M5 7V6" />
                <path fill="none" d="M.5 7.5h9" />
              </g>
            </svg>
          );
        })}
        <svg
          className={styles.screenOverlay}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 390 350"
        >
          <text className={styles.textOverlay} x="50%" y="50%">
            <tspan>{Number(400).toLocaleString(locale)}</tspan>
          </text>
        </svg>
      </div>
    </div>
  );
};

SizeComparison.displayName = "Organism.FirstLookWidget.SizeComparison";

export default SizeComparison;
