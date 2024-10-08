"use client";
import PropTypes from "prop-types";
import Breadcrumbs from "@/page/Breadcrumbs";
import { useCustomBreadcrumbs, imageShaper } from "@/lib/utils";
import {
  Container,
  ResponsiveImage,
  Buttonish,
} from "@rubin-epo/epo-react-lib";
import { Share } from "@/content-blocks";
import { useTranslation } from "react-i18next";

export default function GlossaryPage({ data }) {
  const { t } = useTranslation();

  const { id, title, uri, text, cantoAssetSingle } = data;

  const customBreadcrumbs = useCustomBreadcrumbs("Glossary");

  const glossaryCrumb = customBreadcrumbs.find((b) =>
    b.uri.includes("glossary")
  );

  const image = imageShaper("EN", cantoAssetSingle[0]);

  const pageLink = {
    id,
    uri,
    title,
  };

  return (
    <>
      <Breadcrumbs breadcrumbs={[...customBreadcrumbs, pageLink]} />
      <Container width="narrow">
        <h1>{title}</h1>
      </Container>
      <Share />
      <Container width="narrow">
        <div
          className="c-content-rte"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {image && <ResponsiveImage image={image} />}
        {glossaryCrumb && (
          <Buttonish
            url={glossaryCrumb.uri}
            text={t("glossary.back_button")}
            isBlock
          />
        )}
      </Container>
    </>
  );
}

GlossaryPage.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    uri: PropTypes.string,
    text: PropTypes.node,
    cantoAssetSingle: PropTypes.array,
    caption: PropTypes.string,
  }),
};
