"use client";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import internalLinkShape from "@/shapes/link";
import pageShape from "@/shapes/page";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import DynamicComponentFactory from "@/factories/DynamicComponentFactory";
import { Container } from "@rubin-epo/epo-react-lib";
import Breadcrumbs from "@/page/Breadcrumbs";
import FilterBar from "@/components/page/FilterBar";
import NavButtons from "@/components/layout/NavButtons";
import SubHero from "@/components/page/SubHero";
import AuthorizePage from "@/components/auth/AuthorizePage";
import InvestigationHero from "@/components/layout/InvestigationHero";
import ChildNavigation from "@/components/layout/ChildNavigation";
import GuideNavigation from "@/components/layout/GuideNavigation";
import SiblingNavigation from "@/components/layout/SiblingNavigation";
import NestedContext from "@/contexts/Nested";
import PageContent from "@/page/PageContent";
import MediaAside from "@/components/page/Aside/patterns/Media";
import { FilterParamsProvider } from "@/contexts/FilterParams";

export default function Page({
  data: {
    contentBlocks = [],
    dynamicComponent,
    eventFilter = [],
    hero,
    focalPointX,
    focalPointY,
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
    showSidebar,
    sidebarAssets = [],
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

  const pageLink = {
    id,
    uri,
    title,
  };

  // add FilterBar to dynamic pages
  const hasFilterbar =
    pageType === "dynamic" &&
    (dynamicComponent === "events" ||
      dynamicComponent === "videoGalleryItems" ||
      dynamicComponent === "jobs" ||
      dynamicComponent === "news" ||
      dynamicComponent === "slideshows" ||
      dynamicComponent === "staffProfiles" ||
      dynamicComponent === "scientificStaff" ||
      dynamicComponent === "nonScientificStaff");

  const isWideHeader =
    dynamicComponent === "slideshows" || dynamicComponent === "glossaryTerms";

  const isMediumPadding = dynamicComponent === "none";

  const isEventsPage = uri?.split("/").includes("calendar");

  const showSiblingNav = parent?.children && showGuideNav;
  const shouldOverlapHero = !!hero?.length && overlapHero;

  const serverParams = {
    filter: [...eventFilter.map(({ id }) => id)],
  };

  return (
    <AuthorizePage typeHandle={typeHandle}>
      {breadcrumbs && <Breadcrumbs breadcrumbs={[...breadcrumbs, pageLink]} />}
      {investigation && <InvestigationHero investigation={investigation} />}
      {showSiblingNav && (
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

      <FilterParamsProvider {...{ serverParams }}>
        {hasFilterbar && <FilterBar filterType={dynamicComponent} />}
        <PageContent
          heroImage={!showSiblingNav && hero}
          overlapHero={showSiblingNav ? false : shouldOverlapHero}
          sidebar={
            showSidebar && (
              <MediaAside
                manualAssets={sidebarAssets}
                contentBlockAssets={contentBlocks}
              />
            )
          }
          {...{ focalPointX, focalPointY }}
        >
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
      </FilterParamsProvider>
    </AuthorizePage>
  );
}

Page.displayName = "Template.Page";

Page.propTypes = {
  data: pageShape,
  breadcrumbs: PropTypes.arrayOf(internalLinkShape),
  children: PropTypes.node,
};
