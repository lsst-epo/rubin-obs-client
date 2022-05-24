import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import striptags from "striptags";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";
import { fluidScale } from "@/styles/globalStyles";
import Buttonish from "@/components/atomic/Buttonish";

const RelatedList = ({
  button,
  excludeId = null,
  header,
  limit = 3,
  isWide = true,
  gridType = "pages",
}) => {
  const { t } = useTranslation();
  const cols = limit === 4 ? 4 : 3;

  return (
    <DataList excludeId={excludeId} limit={limit} section="pages">
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {<Header>{header || t(`related-content`)}</Header>}
              {entries?.length > 0 && (
                <Grid columns={cols}>
                  {entries.map(({ id, description, image, title, uri }, i) => (
                    <Tile
                      key={id}
                      image={image?.[0]}
                      link={uri}
                      text={striptags(description)}
                      title={title}
                      titleTag={"h2"}
                      type={gridType}
                    />
                  ))}
                </Grid>
              )}
              {button && (
                <Footer>
                  <Buttonish
                    isBlock={true}
                    text={button.text}
                    url={`/${button.uri}`}
                  />
                </Footer>
              )}
            </div>
          </Container>
          {limit >= 10 && (
            <Pagination
              limit={limit}
              offset={offset}
              page={page}
              total={total}
            />
          )}
        </>
      )}
    </DataList>
  );
};

const Header = styled.h2`
  margin-bottom: ${fluidScale("40px", "20px")};
  padding-bottom: 10px;
  border-bottom: 10px solid var(--turquoise85);
`;

const Footer = styled.div`
  padding-top: 40px;
`;

RelatedList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default RelatedList;
