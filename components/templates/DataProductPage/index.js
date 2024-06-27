import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Container } from "@rubin-epo/epo-react-lib";
import { useCustomBreadcrumbs } from "@/lib/utils";
import Body from "@/global/Body";
import PageContent from "@/page/PageContent";
import MediaAside from "@/components/page/Aside/patterns/Media";
import ContentBlockFactory from "@/factories/ContentBlockFactory";
import DataProductsList from "@/components/dynamic/DataProductsList";
import Breadcrumbs from "@/page/Breadcrumbs";

const DataProductPage = ({
  data: {
    id,
    uri,
    title,
    description,
    featuredImage = [],
    sidebarAssets = [],
    contentBlocks = [],
  },
}) => {
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
  };
  const breadcrumbs = useCustomBreadcrumbs("For Scientists");
  const backPage = breadcrumbs[breadcrumbs.length - 1];

  return (
    <Body {...bodyProps}>
      <Breadcrumbs breadcrumbs={[...breadcrumbs, pageLink]} />
      <PageContent
        sidebar={
          <MediaAside
            manualAssets={sidebarAssets}
            contentBlockAssets={contentBlocks}
          />
        }
        footer={
          <DataProductsList
            excludeId={id}
            header={t(`related-content`)}
            limit={3}
            button={{
              text: t(`back`),
              uri: backPage?.uri,
            }}
            isWide
            isRelatedList
          />
        }
      >
        <Container bgColor="white" className="c-page-header" width="narrow">
          <h1>{title}</h1>
        </Container>
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
      </PageContent>
    </Body>
  );
};

DataProductPage.displayName = "Template.DataProductPage";

DataProductPage.propTypes = {
  data: PropTypes.object,
};

export default DataProductPage;
