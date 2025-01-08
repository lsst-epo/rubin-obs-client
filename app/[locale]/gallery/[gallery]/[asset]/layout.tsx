import { FunctionComponent, PropsWithChildren } from "react";
import { getAssetBreadcrumb, getRecentAssets } from "@/lib/api/galleries/asset";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import Breadcrumbs from "@/components/page/Breadcrumbs";
import BackButton from "@/components/molecules/BackButton";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";

export async function generateStaticParams({
  params: { locale, gallery },
}: GalleryProps) {
  return getRecentAssets(locale, gallery);
}

const AssetLayout: FunctionComponent<
  PropsWithChildren<GalleryAssetProps>
> = async ({ children, params: { locale, gallery, asset } }) => {
  const { t } = await useTranslation(locale);
  const breadcrumbs = await getAssetBreadcrumb({ locale, gallery, asset });

  const parentPath = addLocaleUriSegment(locale, `/gallery/${gallery}`);

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
