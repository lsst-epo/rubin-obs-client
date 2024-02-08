import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import internalLinkShape from "@/shapes/link";
import pageShape from "@/shapes/page";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import DynamicComponentFactory from "@/factories/DynamicComponentFactory";
import { Container } from "@rubin-epo/epo-react-lib";
import Breadcrumbs from "@/page/Breadcrumbs";
import FilterBar from "@/components/page/FilterBar/GalleryFilterBar";
import { usePathData } from "@/lib/utils";
import NestedContext from "@/contexts/Nested";
import PageContent from "@/page/PageContent";

export default function GalleryPage({
  data: {
    contentBlocks = [],
    description,
    dynamicComponent,
    featuredImage,
    hero,
    hideTitle,
    id,
    title,
    uri,
    typeHandle,
    overlapHero,
    subHeroHeader,
    subHeroText,
    subHeroColorScheme,
  },
  breadcrumbs,
}) {
  const { t } = useTranslation();
  const bodyProps = {
    description,
    featuredImage,
    title,
  };
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  const isGallerySearch = false;
  const { query } = usePathData();
  const categoryId = query.filter;

  const shouldOverlapHero = !!hero?.length && overlapHero;

  return (
    <Body {...bodyProps}>
      {breadcrumbs && <Breadcrumbs breadcrumbs={[...breadcrumbs, pageLink]} />}
      <PageContent heroImage={hero} overlapHero={shouldOverlapHero}>
        <NestedContext.Provider value={shouldOverlapHero}>
          {!hideTitle && (
            <Container
              bgColor="white"
              className="c-page-header"
              width="regular"
            >
              <h1>{title}</h1>
            </Container>
          )}
          {contentBlocks.length > 0 &&
            [...contentBlocks].map((block) => {
              if (!block.id || !block.typeHandle) return null;
              return (
                <ContentBlockFactory
                  key={block.id}
                  type={block.typeHandle}
                  data={block}
                  pageId={id}
                />
              );
            })}
          <FilterBar />
          <DynamicComponentFactory componentType="gallery" pageId={id} />
        </NestedContext.Provider>
      </PageContent>
    </Body>
  );
}

GalleryPage.displayName = "Template.GalleryPage";

GalleryPage.propTypes = {
  data: pageShape,
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  children: PropTypes.node,
};
