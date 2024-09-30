"use client";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Breadcrumbs from "@/page/Breadcrumbs";
import {
  CarouselLayout as Carousel,
  Container,
  ResponsiveImage,
  Buttonish,
} from "@rubin-epo/epo-react-lib";
import { containerFull, respond } from "@/styles/globalStyles";

export default function SlideshowPage({
  data: {
    entry: { openGraphImage, id, description, title, uri, items },
  },
}) {
  const { t } = useTranslation();

  const customBreadcrumbs = useCustomBreadcrumbs("Slideshows");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
  };

  // prepend main slide to content slides
  const allItems = [
    {
      id,
      title,
      description,
      image: openGraphImage,
    },
    ...items,
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <h1 className="a-hidden">{title}</h1>
      <Modalish>
        <Carousel>
          {allItems.map((item, i) => (
            <SlideshowGrid key={i}>
              <SlideshowMain>
                <h2 className="t-heading-primary">{item.title}</h2>
                <div>{`${i + 1} ${t("pagination.of")} ${allItems.length}`}</div>
                <div
                  className="c-content-rte"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </SlideshowMain>
              <SlideshowFooter>
                <Buttonish
                  url={item.image?.[0]?.url}
                  download
                  text={t(`gallery.download-image`)}
                />
              </SlideshowFooter>
              {item.image?.[0] && (
                <StyledResponsiveImage image={item.image[0]} ratio="4:3" />
              )}
            </SlideshowGrid>
          ))}
        </Carousel>
      </Modalish>
      <Container width="regular">
        <Buttonish
          url={`/${rootHomeLink?.uri}`}
          text={t(`gallery.back-to-slideshows`)}
          isBlock={true}
        />
      </Container>
    </>
  );
}

const Modalish = styled.div`
  --PrevButton-right: calc(100% - 10px);
  --NextButton-left: calc(100% - 10px);

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
  width: 100%;
  background-color: var(--black);
  padding: 40px;
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-areas:
    "main image"
    "footer image";
  grid-gap: 20px;

  ${respond(
    ` grid-template-columns: 1fr;
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

  h2 {
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
