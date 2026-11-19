"use client";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import { Container, Buttonish } from "@rubin-epo/epo-react-lib";
import InlineSlideshow from "@/components/molecules//InlineSlideshow";

export default function SlideshowPage({ data: { entry } }) {
  const { id, title, uri } = entry;
  const {
    t,
    i18n: { language: locale },
  } = useTranslation();

  const customBreadcrumbs = useCustomBreadcrumbs("Slideshows");
  const rootHomeLink = customBreadcrumbs.slice(-1)[0];
  const pageLink = {
    id,
    uri,
    title,
  };

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[...customBreadcrumbs, pageLink]}
        locale={locale}
      />
      <h1 className="a-hidden">{title}</h1>
      <InlineSlideshow slideshow={entry} />
      <Container width="regular" bgColor={"black"}>
        <Buttonish
          url={`/${rootHomeLink?.uri}`}
          text={t(`gallery.back-to-slideshows`)}
          isBlock={true}
        />
      </Container>
    </>
  );
}

SlideshowPage.displayName = "Template.SlideshowPage";

SlideshowPage.propTypes = {
  data: PropTypes.object,
};
