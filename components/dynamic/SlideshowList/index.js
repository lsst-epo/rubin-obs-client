import PropTypes from "prop-types";
import styled from "styled-components";
import striptags from "striptags";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";
import { fluidScale } from "@/styles/globalStyles";
import Buttonish from "@/components/atomic/Buttonish";

const SlideshowList = ({
  button,
  excludeId = null,
  header,
  limit = 10,
  isWide = false,
  gridType = "slideshows",
}) => {
  const { t } = useTranslation();

  return (
    <DataList excludeId={excludeId} limit={limit} section="slideshows">
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid columns={1}>
                  {entries.map(
                    ({ id, description, featuredImage, title, uri }, i) => (
                      <Tile
                        key={id}
                        footer={
                          gridType === "darkSlide" || gridType === "slideshows"
                            ? { button: t(`gallery.start-slideshow`) }
                            : null
                        }
                        image={featuredImage?.[0]}
                        isFeature={true}
                        link={uri}
                        pretitle={
                          gridType === "darkSlide" || gridType === "slideshows"
                            ? t(`gallery.slideshow`)
                            : null
                        }
                        text={striptags(description)}
                        title={title}
                        type={gridType}
                      />
                    )
                  )}
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
  border-bottom: 10px solid var(--turquoise55);
`;

const Footer = styled.div`
  padding-top: 40px;
`;

SlideshowList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default SlideshowList;
