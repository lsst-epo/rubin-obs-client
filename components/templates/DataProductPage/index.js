import PropTypes from "prop-types";
import { Container } from "@rubin-epo/epo-react-lib";
import Body from "@/global/Body";
import PageContent from "@/page/PageContent";
import MediaAside from "@/components/layout/MediaAside";
import ContentBlockFactory from "@/factories/ContentBlockFactory";

const DataProductPage = ({
  data: {
    id,
    title,
    description,
    typeHandle,
    siteHandle,
    featuredImage = [],
    sidebarAssets = [],
    contentBlocks = [],
  },
}) => {
  const bodyProps = {
    description,
    featuredImage,
    title,
  };
  return (
    <Body {...bodyProps}>
      <PageContent
        sidebar={
          <MediaAside
            manualAssets={sidebarAssets}
            contentBlockAssets={contentBlocks}
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
