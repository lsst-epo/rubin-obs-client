import PropTypes from "prop-types";
import styled from "styled-components";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/primitives/Tile";
import Pagination from "@/page/Pagination";
import { fluidScale } from "@/styles/globalStyles";
import Buttonish from "@/components/primitives/Buttonish";

const StaffList = ({
  component,
  excludeId = null,
  header,
  limit = 15,
  button,
  isWide = false,
}) => {
  const cols = limit === 4 ? 4 : 3;

  return (
    <DataList
      component={component}
      excludeId={excludeId}
      limit={limit}
      section="staffProfiles"
    >
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid columns={cols}>
                  {entries.map(({ id, plainText, image, title, uri }) => (
                    <Tile
                      key={id}
                      title={title}
                      text={plainText}
                      image={image?.[0]}
                      link={uri}
                      type={"staffProfiles"}
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
          {limit >= 15 && (
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

StaffList.propTypes = {
  component: PropTypes.string,
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
};

export default StaffList;
