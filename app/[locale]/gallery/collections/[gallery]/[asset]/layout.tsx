import { FunctionComponent, PropsWithChildren } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { getAssetBreadcrumb, getRecentAssets } from "@/lib/api/galleries/asset";
import { useTranslation } from "@/lib/i18n";
import { isMainGallery } from "@/lib/api/galleries";
import { buildParentPath } from "@/lib/helpers/gallery";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import BackButton from "@/components/molecules/BackButton";
import MediaPolicy from "@/components/organisms/gallery/MediaPolicy";

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
          <MediaPolicy {...{ locale }} />
        </Stack>
      </Container>
    </>
  );
};

export default AssetLayout;
