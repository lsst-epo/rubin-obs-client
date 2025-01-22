import { FunctionComponent } from "react";
import { redirect } from "next/navigation";
import Container from "@rubin-epo/epo-react-lib/Container";
import Stack from "@rubin-epo/epo-react-lib/Stack";
import { useTranslation } from "@/lib/i18n";
import { getGalleryMetadata } from "@/lib/api/galleries";
import {
  GalleryFilterSchema,
  SupportedCantoScheme,
} from "@/lib/api/galleries/schema";
import FilterDropdownList from "@/components/molecules/FilterDropdownList";
import PreviewGrid from "@/components/organisms/gallery/PreviewGrid";
import Filters from "@/components/organisms/Filters";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";

const Gallery: FunctionComponent<WithSearchParams<GalleryProps>> = async ({
  params: { locale, gallery },
  searchParams = {},
}) => {
  const metadata = await getGalleryMetadata(gallery, locale);
  const { t } = await useTranslation(locale);

  // while the main gallery is at a different route, it is still rendered through
  // this page. To avoid confusion and duplication, it's "true" path is redirected back to the main
  // gallery page. So that it doesn't get stuck in a loop, the main gallery page injects
  // a hidden query param that skips the redirect.
  if (metadata?.isMainGallery && searchParams?.renderedFrom !== "mainGallery") {
    redirect("/gallery");
  }

  const filters = GalleryFilterSchema.parse(searchParams);

  const filterOptions = [
    ...SupportedCantoScheme.options.map((value) => {
      return { name: t(`gallery.filters.${value}`), query: "type", value };
    }),
  ];

  return (
    <>
      <Filters width="wide">
        <FilterDropdownList
          name="Filter"
          filters={filterOptions}
          icon={<UniqueIconComposer icon="Filter" />}
        />
      </Filters>
      <Container width="wide">
        <Stack space="var(--size-spacing-s)">
          <h1>{metadata?.title}</h1>
          <PreviewGrid {...{ locale, gallery, filters }} />
        </Stack>
      </Container>
    </>
  );
};

export default Gallery;
