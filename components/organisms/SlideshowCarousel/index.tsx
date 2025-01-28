"use client";

import { FC } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import Frame from "@rubin-epo/epo-react-lib/Frame";
import CarouselLayout from "@rubin-epo/epo-react-lib/CarouselLayout";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import styles from "./styles.module.scss";
import { addLocaleUriSegment } from "@/lib/i18n";

interface SlideshowCarouselProps {
  slideshows: Array<{
    id: string | null;
    title: string | null;
    uri: string | null;
    richTextDescription: string | null;
    image?: {
      url: string;
      width: number;
      height: number;
      altText: string | null;
    };
  }>;
  slideshowsUri?: string;
}

const SlideshowCarousel: FC<SlideshowCarouselProps> = ({
  slideshows,
  slideshowsUri,
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  return (
    <Container
      width="wide"
      paddingSize="medium"
      bgColor="color-background-page-invert"
    >
      <Stack className={styles.slideshowCarousel}>
        <header className={styles.carouselHeader}>
          <h2>{t("gallery.curated-slideshows")}</h2>
          {slideshowsUri && (
            <Link
              className={styles.slideshowsLink}
              href={addLocaleUriSegment(language, slideshowsUri)}
            >
              {t("gallery.see-all")}
            </Link>
          )}
        </header>
        <CarouselLayout className={styles.carouselWrapper}>
          {slideshows.map(
            ({ title, uri, id, richTextDescription, image }, i) => {
              return uri ? (
                <div className={styles.carouselSlide} key={id}>
                  <Frame className={styles.previewImage} aspectRatio="5 / 8">
                    {image && (
                      <Image
                        src={image.url}
                        width={image.width}
                        height={image.height}
                        alt={image.altText || ""}
                      />
                    )}
                  </Frame>
                  <Stack space="var(--size-spacing-2xs)">
                    <div>
                      <span>{t("gallery.slideshow")}</span>
                      <h3>
                        <Link
                          href={uri}
                          className={styles.slideLink}
                          prefetch={i === 0}
                        >
                          {title}
                        </Link>
                      </h3>
                    </div>
                    {richTextDescription && (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: richTextDescription,
                        }}
                      />
                    )}
                  </Stack>
                </div>
              ) : null;
            }
          )}
        </CarouselLayout>
      </Stack>
    </Container>
  );
};

SlideshowCarousel.displayName = "Organism.SlideshowCarousel";

export default SlideshowCarousel;
