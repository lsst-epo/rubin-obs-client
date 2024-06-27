import PropTypes from "prop-types";
import * as Styled from "./styles";

function PageContent({
  innerHero,
  heroImage,
  focalPointX,
  focalPointY,
  children,
  sidebar,
  footer,
  overlapHero,
}) {
  const hasHero = !!heroImage?.length;
  const hasSidebar = !!sidebar;

  if (!overlapHero) {
    return (
      <>
        {hasHero && (
          <Styled.Hero data={heroImage} {...{ focalPointX, focalPointY }}>
            {innerHero}
          </Styled.Hero>
        )}
        <Styled.FullLayout data-sidebar={hasSidebar}>
          <div>{children}</div>
          {sidebar}
        </Styled.FullLayout>
        {footer}
      </>
    );
  }

  return (
    <>
      {hasHero && (
        <Styled.Hero data={heroImage} {...{ focalPointX, focalPointY }}>
          {innerHero}
        </Styled.Hero>
      )}
      <Styled.OverlapLayout data-sidebar={hasSidebar}>
        <Styled.Main>{children}</Styled.Main>
        {sidebar}
      </Styled.OverlapLayout>
      {footer}
    </>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  innerHero: PropTypes.node,
  heroImage: PropTypes.array,
  sidebar: PropTypes.node,
  footer: PropTypes.node,
  overlapHero: PropTypes.bool,
  focalPointX: PropTypes.number,
  focalPointY: PropTypes.number,
};

export default PageContent;
