import { FunctionComponent, PropsWithChildren } from "react";
import { getAssetBreadcrumb, getRecentAssets } from "@/lib/api/galleries/asset";
import { addLocaleUriSegment, useTranslation } from "@/lib/i18n";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import Breadcrumbs from "@/components/page/Breadcrumbs";

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

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Container>
        <Stack>
          {children}
          <Buttonish
            data-cy="back-to-gallery"
            url={`${addLocaleUriSegment(locale)}/gallery/${gallery}`}
            text={t("gallery.back-to-gallery")}
          />
        </Stack>
      </Container>
    </>
  );
};

export default AssetLayout;
