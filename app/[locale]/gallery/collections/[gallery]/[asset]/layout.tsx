import { FunctionComponent, PropsWithChildren } from "react";
import { Trans } from "react-i18next/TransWithoutContext";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { getAssetBreadcrumb, getRecentAssets } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import { isMainGallery } from "@/lib/api/galleries";
import { getMediaPolicyPage } from "@/lib/api/galleries/media-policy";
import { buildParentPath } from "@/lib/helpers/gallery";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import BackButton from "@/components/molecules/BackButton";
import Center from "@rubin-epo/epo-react-lib/Center";
import Link from "next/link";

export async function generateStaticParams({
  params: { locale, gallery },
}: GalleryProps) {
  return getRecentAssets(locale, gallery);
}

const AssetLayout: FunctionComponent<
  PropsWithChildren<GalleryAssetProps>
> = async ({ children, params: { locale, gallery, asset } }) => {
  const { t } = await useTranslation(locale);
  const hasParentSlug = !(await isMainGallery(gallery, locale));
  const breadcrumbs = await getAssetBreadcrumb({
    locale,
    gallery,
    asset,
    hasParentSlug,
  });

  const mediaPolicyPage = await getMediaPolicyPage(locale);

  const parentPath = buildParentPath({
    locale,
    gallery,
    includeParentSlug: hasParentSlug,
  });

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Container width="wide">
        <Stack>
          {children}
          <BackButton
            fallback={parentPath}
            matches={parentPath}
            data-cy="back-to-gallery"
          >
            {t("gallery.back-to-gallery")}
          </BackButton>
          <Center className="c-content-rte">
            <Trans t={t} i18nKey="gallery.media-policy">
              Information about
              {mediaPolicyPage && (
                <Link
                  href={addLocaleUriSegment(locale, mediaPolicyPage.uri)}
                  rel="license"
                  title={mediaPolicyPage.title}
                  prefetch={false}
                >
                  Usage of Rubin Observatory images, videos, web texts, and
                  music
                </Link>
              )}
            </Trans>
          </Center>
        </Stack>
      </Container>
    </>
  );
};

export default AssetLayout;
