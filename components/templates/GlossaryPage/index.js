import PropTypes from "prop-types";
import getRootPages from "@/services/craft/globals/rootPages";
import { getCustomBreadcrumbs } from "@/lib/helpers/breadcrumbs";
import Breadcrumbs from "@/components/molecules/Breadcrumbs";
import Container from "@rubin-epo/epo-react-lib/Container";
import ResponsiveImage from "@rubin-epo/epo-react-lib/ResponsiveImage";
import Buttonish from "@rubin-epo/epo-react-lib/Buttonish";
import ShareContentBlock from "@/components/content-blocks/ShareBlock";
import { useTranslation } from "@/lib/i18n";
import { cantoToImageShape } from "@/lib/api/canto";

export default async function GlossaryPage({ data, locale }) {
  const { t } = await useTranslation(locale);

  const { id, title, uri, text, cantoAssetSingle } = data;

  const rootPages = await getRootPages();
  const customBreadcrumbs = getCustomBreadcrumbs({
    rootPages,
    header: "Glossary",
  });

  const glossaryCrumb = customBreadcrumbs.find((b) =>
    b.uri.includes("glossary")
  );

  const image = cantoToImageShape(cantoAssetSingle[0]);

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
      <Container width="narrow">
        <h1>{title}</h1>
      </Container>
      <ShareContentBlock />
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
  locale: PropTypes.string,
};
