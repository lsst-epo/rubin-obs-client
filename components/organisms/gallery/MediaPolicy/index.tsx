import { FC, Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { Trans } from "react-i18next/TransWithoutContext";
import { getMediaPolicyPage } from "@/lib/api/galleries/media-policy";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import styles from "./styles.module.css";
import clsx from "clsx";

const MediaPolicyContent: FC<{ locale: string }> = async ({ locale }) => {
  const { t } = await useTranslation(locale);
  const mediaPolicyPage = await getMediaPolicyPage(locale);

  if (!mediaPolicyPage) return null;

  return (
    <Trans t={t} i18nKey="gallery.media-policy">
      Information about
      <Link
        href={addLocaleUriSegment(locale, mediaPolicyPage.uri)}
        rel="license"
        title={mediaPolicyPage.title}
        prefetch={false}
      >
        Usage of Rubin Observatory images, videos, web texts, and music
      </Link>
    </Trans>
  );
};

const MediaPolicy: FC<{ locale: string }> = async (props) => {
  return (
    <div className={clsx(styles.textWrapper, "c-content-rte")}>
      <Suspense fallback={<Skeleton width={"min(100%,80ex)"} height="1lh" />}>
        <MediaPolicyContent {...props} />
      </Suspense>
    </div>
  );
};

MediaPolicy.displayName = "Organism.Gallery.MediaPolicy";

export default MediaPolicy;
