import Body from "@/global/Body";
import Breadcrumbs from "@/page/Breadcrumbs";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Container from "@/components/layout/Container";
import { Share } from "@/content-blocks";
import Buttonish from "@/atomic/Buttonish";
import ResponsiveImage from "@/atomic/ResponsiveImage";
import { useTranslation } from "react-i18next";
import { useDamAssetAsImage } from "@/lib/utils";

export default function GlossaryPage({ data }) {
  const { t } = useTranslation();

  const { entry } = data;

  const { id, title, description, uri, text, damAsset, caption } = entry;

  const customBreadcrumbs = useCustomBreadcrumbs("Glossary");

  const glossaryCrumb = customBreadcrumbs.find((b) =>
    b.uri.includes("glossary")
  );

  const image = useDamAssetAsImage(damAsset);

  const bodyProps = {
    description,
    featuredImage: image,
    title,
  };

  const pageLink = {
    id,
    uri,
    title,
    active: true,
  };

  return (
    <Body {...bodyProps}>
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
    </Body>
  );
}
