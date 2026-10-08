"use client";
import { FC, useRef, useState, useEffect } from "react";
import styles from "./styles.module.css";

interface BannerProps {
  text: string;
  theme?: string;
}

const Banner: FC<BannerProps> = ({
  text,
  theme = "info"
}) => {
    const sentinelRef = useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
        ([entry]) => {
            setIsSticky(
            !entry.isIntersecting && entry.boundingClientRect.top < 0
            );
        },
        {
            threshold: 0,
        }
        );

        observer.observe(sentinel);

        return () => observer.disconnect();
    }, []);

  return (
    <>
        <div ref={sentinelRef} />
        <div className={`${styles.banner} ${isSticky ? styles.sticky : ""}`} data-color={theme}>
            {text}
        </div>
    </>
  );
};

Banner.displayName = "Atom.Banner";

export default Banner;
