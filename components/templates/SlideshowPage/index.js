import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Body from "@/global/Body";
import Breadcrumbs from "@/page/Breadcrumbs";
import Container from "@/layout/Container";
import Slider from "@/layout/Slider";
import ResponsiveImage from "@/atomic/ResponsiveImage";
import Buttonish from "@/components/atomic/Buttonish";
import { containerFull, respond } from "@/styles/globalStyles";

export default function SlideshowPage({
  data: {
    entry: { featuredImage, id, description, title, uri, items },
  },
}) {
  const { t } = useTranslation();
  const bodyProps = {
    description: striptags(description),
    featuredImage,
    title,
  };

  const customBreadcrumbs = useCustomBreadcrumbs("Slideshows");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  // prepend main slide to content slides
  const allItems = [
    {
      id: id,
      title: title,
      description: description,
      image: featuredImage,
    },
    ...items,
  ];

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Modalish>
        <Slider>
          {allItems.map((item, i) => (
            <div key={i}>
              <SlideshowGrid>
                <SlideshowMain>
                  {i === 0 ? (
                    <>
                      <h1>{title}</h1>
                      <div>{`${i + 1} of ${allItems.length}`}</div>
                    </>
                  ) : (
                    <div>
                      <h1>{title}</h1>
                      <div>{`${i + 1} of ${allItems.length}`}</div>
                      <h2>{item.title}</h2>
                    </div>
                  )}
                  <div
                    className="c-content-rte"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </SlideshowMain>
                <SlideshowFooter>
                  <Buttonish
                    url={item.image?.[0]?.url}
                    text={t(`gallery.download-image`)}
                  />
                </SlideshowFooter>
                {item.image?.[0] && (
                  <StyledResponsiveImage image={item.image[0]} ratio="4:3" />
                )}
              </SlideshowGrid>
            </div>
          ))}
        </Slider>
      </Modalish>
      <Container width="regular">
        <Buttonish
          url={`/${rootHomeLink?.uri}`}
          text={t(`gallery.back-to-slideshows`)}
          isBlock={true}
        />
      </Container>
    </Body>
  );
}

const Modalish = styled.div`
  ${containerFull()}
  overflow-x: hidden;
  background-color: var(--black);
  padding: 20px;

  > div {
    margin: 0 38px;
  }
  ${respond(`
    padding: 0;
    overflow: hidden;

    > div {
      margin: 0;
    }
    .slick-list {
      margin-bottom: 35px;
    }
    `)}
`;

const SlideshowGrid = styled.div`
  background-color: var(--black);
  padding: 40px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-areas:
    "main image"
    "footer image";
  grid-gap: 20px;

  ${respond(
    `      grid-template-columns: 1fr;
      grid-template-areas:
        "image"
        "main"
        "footer";
      padding: 20px;
`,
    "900px",
    "max"
  )}
`;

const SlideshowMain = styled.div`
  grid-area: main;
  color: var(--white);
  font-size: 16px;

  h1 {
    margin-bottom: 1rem;
  }
`;

const SlideshowFooter = styled.div`
  grid-area: footer;
`;

const StyledResponsiveImage = styled(ResponsiveImage)`
  grid-area: image;
`;
SlideshowPage.displayName = "Template.SlideshowPage";

SlideshowPage.propTypes = {
  data: PropTypes.object,
};
