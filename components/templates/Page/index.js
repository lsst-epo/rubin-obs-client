import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import internalLinkShape from "@/shapes/link";
import pageShape from "@/shapes/page";
import Body from "@/global/Body";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import DynamicComponentFactory from "@/factories/DynamicComponentFactory";
import Container from "@/layout/Container";
import Breadcrumbs from "@/page/Breadcrumbs";
import FilterBar from "@/components/page/FilterBar";
import SlideBlock from "@/components/content-blocks/SlideBlock";
import { getCategoryObject, useGlobalData, usePathData } from "@/lib/utils";
import NavButtons from "@/components/layout/NavButtons";
import SubHero from "@/components/page/SubHero";
import AuthorizePage from "@/components/auth/AuthorizePage";
import InvestigationHero from "@/components/layout/InvestigationHero";
import ChildNavigation from "@/components/layout/ChildNavigation";
import GuideNavigation from "@/components/layout/GuideNavigation";
import SiblingNavigation from "@/components/layout/SiblingNavigation";
import NestedContext from "@/contexts/Nested";
import PageContent from "@/page/PageContent";

export default function Page({
  data: {
    contentBlocks = [],
    description,
    dynamicComponent,
    featuredImage,
    hero,
    hideTitle,
    id,
    pageType = "standard",
    title,
    uri,
    typeHandle,
    overlapHero,
    subHeroHeader,
    subHeroText,
    subHeroColorScheme,
    parent,
    showGuideNav,
    investigation,
    siblings,
    childNavigation,
    childNavigationTitle,
    childNavigationDescription,
  },
  breadcrumbs,
  children,
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

  // add FilterBar to dynamic pages
  const hasFilterbar =
    pageType === "dynamic" &&
    (dynamicComponent === "events" ||
      dynamicComponent === "galleryItems" ||
      dynamicComponent === "imageGalleryItems" ||
      dynamicComponent === "videoGalleryItems" ||
      dynamicComponent === "jobs" ||
      dynamicComponent === "news" ||
      dynamicComponent === "slideshows" ||
      dynamicComponent === "staffProfiles" ||
      dynamicComponent === "scientificStaff" ||
      dynamicComponent === "nonScientificStaff");

  const isWideHeader =
    dynamicComponent === "galleryItems" ||
    dynamicComponent === "slideshows" ||
    dynamicComponent === "glossaryTerms";

  const isMediumPadding = dynamicComponent === "none";

  const isGalleryHome = uri === "gallery";
  const isEventsPage = uri?.split("/").includes("calendar");

  // custom page name for gallery search
  const isGallerySearch = uri === "gallery/gallery-search";
  const { query } = usePathData();
  const categoryId = query.filter;
  const categories = useGlobalData("categories");
  let categoryObj;
  if (isGallerySearch && categories && categoryId) {
    categoryObj = getCategoryObject(categories, categoryId);

    pageLink.title = t(`gallery.plural-${categoryObj.slug}`);
    title = t(`gallery.plural-${categoryObj.slug}`);
  }

  const isInvestigationChild = investigation?.landingPage?.[0]?.uri !== uri;
  const showGuideNavigation = showGuideNav && parent?.children;
  const showSiblingNav = investigation && siblings && isInvestigationChild;
  const shouldOverlapHero = !!hero?.length && overlapHero;

  return (
    <Body {...bodyProps}>
      <AuthorizePage typeHandle={typeHandle}>
        {breadcrumbs && (
          <Breadcrumbs breadcrumbs={[...breadcrumbs, pageLink]} />
        )}
        {investigation && <InvestigationHero investigation={investigation} />}
        {showGuideNavigation && (
          <GuideNavigation
            title={parent.title}
            pages={parent.children}
            currentUri={uri}
          />
        )}
        <ChildNavigation
          title={childNavigationTitle}
          description={childNavigationDescription}
          pages={childNavigation}
        />
        {isGalleryHome && (
          <SlideBlock
            section="slideshows"
            header={t(`gallery.curated-slideshows`)}
            mixedLink={{
              url: "/gallery/slideshows",
              text: t(`gallery.see-all`),
            }}
            truncate={50}
          />
        )}
        {hasFilterbar && <FilterBar filterType={dynamicComponent} />}
        <PageContent heroImage={hero} overlapHero={shouldOverlapHero}>
          <SubHero
            type={typeHandle}
            header={subHeroHeader}
            text={subHeroText}
            colorScheme={subHeroColorScheme}
            nested={shouldOverlapHero}
          />
          <NestedContext.Provider value={shouldOverlapHero}>
            {!hideTitle && (
              <Container
                bgColor="white"
                className="c-page-header"
                width={isWideHeader ? "regular" : "narrow"}
                paddingSize={isMediumPadding ? "medium" : undefined}
              >
                <h1>{title}</h1>
                {isEventsPage && (
                  <NavButtons
                    linkLeft="upcoming"
                    linkRight="past"
                    textLeft={t(`events.upcoming`)}
                    textRight={t(`events.past`)}
                  />
                )}
              </Container>
            )}
            {[...contentBlocks].map((block) => {
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
            {pageType === "dynamic" && dynamicComponent && (
              <DynamicComponentFactory
                componentType={dynamicComponent}
                pageId={id}
              />
            )}
            {children}
            {showSiblingNav && (
              <SiblingNavigation
                siblings={siblings}
                parent={investigation ? investigation.landingPage?.[0] : parent}
              />
            )}
          </NestedContext.Provider>
        </PageContent>
      </AuthorizePage>
    </Body>
  );
}

Page.displayName = "Template.Page";

Page.propTypes = {
  data: pageShape,
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  children: PropTypes.node,
};
