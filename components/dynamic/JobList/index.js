import PropTypes from "prop-types";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Container from "@/layout/Container";
import DataList from "@/dynamic/DataList";
import Grid from "@/layout/Grid";
import Tile from "@/atomic/Tile";
import Pagination from "@/page/Pagination";
import IconComposer from "@/svg/IconComposer";
import { checkIfBetweenDates, createLocationString } from "@/lib/utils";
import { fluidScale } from "@/styles/globalStyles";
import Buttonish from "@/components/atomic/Buttonish";

const JobList = ({
  button,
  excludeId = null,
  header,
  limit = 20,
  isWide = false,
  gridType = "jobs",
}) => {
  const { t } = useTranslation();
  const cols = limit === 20 ? 2 : 4;

  return (
    <DataList excludeId={excludeId} limit={limit} section="jobs">
      {({ entries, offset, page, total }) => (
        <>
          <Container width={isWide ? "regular" : "narrow"}>
            <div>
              {header && <Header>{header}</Header>}
              {entries?.length > 0 && (
                <Grid columns={cols}>
                  {entries.map(
                    (
                      {
                        closeDate,
                        id,
                        subLocation,
                        jobPosition,
                        openDate,
                        title,
                        externalUrl,
                      },
                      i
                    ) => {
                      // logic for displaying city/state in US, city/country outside
                      const Location = (
                        <LocationWrapper>
                          <IconComposer icon="Pin" />
                          <span>
                            {`${
                              subLocation?.[0].title
                            } | ${createLocationString(
                              subLocation?.[0].city,
                              subLocation?.[0].state,
                              subLocation?.[0].country
                            )}`}
                          </span>
                        </LocationWrapper>
                      );

                      // logic for open/closed
                      const checkOpen = checkIfBetweenDates(openDate, closeDate)
                        ? "open"
                        : "closed";
                      const lock =
                        checkOpen === "open" ? "LockOpen" : "LockClosed";

                      return (
                        <Tile
                          className={checkOpen === "closed" ? "closed" : null}
                          key={id}
                          footer={
                            checkOpen && {
                              sticker: (
                                <Sticker>
                                  <IconComposer icon={lock} />
                                  <span>{t(`jobs.${checkOpen}`)}</span>
                                </Sticker>
                              ),
                            }
                          }
                          link={externalUrl}
                          pretitle={
                            jobPosition?.[0]?.title ? jobPosition[0].title : " "
                          }
                          subtitle={Location}
                          title={title}
                          type={gridType}
                        />
                      );
                    }
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

const Sticker = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25em;

  > * + * {
    margin-left: 5px;
  }
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: baseline;
`;

JobList.propTypes = {
  excludeId: PropTypes.string,
  limit: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  header: PropTypes.string,
  button: PropTypes.object,
  isWide: PropTypes.bool,
  gridType: PropTypes.string,
};

export default JobList;
