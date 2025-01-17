import { FunctionComponent, PropsWithChildren } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import BackButton from "@/components/molecules/BackButton";
import { getAssetBreadcrumb, getRecentAssets } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import { isMainGallery } from "@/lib/api/galleries";

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

  const slugs = ["gallery"];

  if (hasParentSlug) {
    slugs.push(gallery);
  }

  const parentPath = addLocaleUriSegment(locale, slugs.join("/"));

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
        </Stack>
      </Container>
    </>
  );
};

export default AssetLayout;
