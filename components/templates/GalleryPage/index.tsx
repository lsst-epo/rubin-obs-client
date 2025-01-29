import { FC } from "react";
import Container from "@rubin-epo/epo-react-lib/Container";
import { useTranslation } from "@/lib/i18n";
import { getGalleryMetadata } from "@/lib/api/galleries";
import FilterDropdownList, {
  Filter,
} from "@/components/molecules/FilterDropdownList";
import PreviewGrid from "@/components/organisms/gallery/PreviewGrid";
import Filters from "@/components/organisms/Filters";
import UniqueIconComposer from "@/components/svg/UniqueIconComposer";
import {
  GalleryFilterSchema,
  SupportedCantoScheme,
} from "@/lib/api/galleries/schema";
import GalleryList from "@/components/organisms/gallery/GalleryList";
import styles from "./styles.module.css";
import classNames from "classnames";

interface GalleryPageProps {
  gallery: string;
  locale: string;
}

const GalleryPage: FC<WithSearchParams<GalleryPageProps>> = async ({
  locale,
  gallery,
  searchParams = {},
}) => {
  const metadata = await getGalleryMetadata(gallery, locale);
  const { t } = await useTranslation(locale);
  const filters = GalleryFilterSchema.parse(searchParams);

  const filterOptions: Array<Filter> = [
    ...SupportedCantoScheme.options.map((value) => {
      return { name: t(`gallery.${value}_other`, {}), query: "type", value };
    }),
  ];

  const sortOptions: Array<Filter> = [
    {
      name: t("filters.age", { context: "desc" }),
      query: "sort",
      value: "desc",
      active: filters.sort === "desc",
    },
    {
      name: t("filters.age", { context: "asc" }),
      query: "sort",
      value: "asc",
      active: filters.sort === "asc",
    },
  ];

  return (
    <>
      <Filters width="wide">
        <FilterDropdownList
          name="Filter"
          filters={filterOptions}
          icon={<UniqueIconComposer icon="Filter" />}
        />
        <FilterDropdownList
          name="Sort by"
          filters={sortOptions}
          icon={<UniqueIconComposer icon="Sort" />}
          includeReset={false}
        />
      </Filters>
      <GalleryList currentGallery={gallery} />
      <Container width="wide">
        <h1 className={classNames("t-heading-secondary", styles.galleryTitle)}>
          {metadata?.title}
        </h1>
        <PreviewGrid {...{ locale, gallery, filters }} />
      </Container>
    </>
  );
};

GalleryPage.displayName = "Template.GalleryPage";

export default GalleryPage;
